import { getServerSession } from "next-auth";
import { SendMessageSchema, TMessage } from "@/lib/schema";
import { parse, ValiError } from "valibot";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import redis from "@/lib/redis";
import { fetchRedis } from "@/helpers/redis";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { chatId, text } = parse(SendMessageSchema, body);

    const [userId1, userId2] = chatId.split("--");

    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return new Response("Unauthorized", { status: 401 });
    }

    const friendId = session.user.id === userId1 ? userId2 : userId1;
    const friendList = (await fetchRedis(
      "smembers",
      `user:${session.user.id}:friends`,
    )) as string[];
    const isFriend = friendList.includes(friendId);
    if (!isFriend) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    const rawSender = (await fetchRedis(
      "get",
      `user:${session.user.id}`,
    )) as string;
    const sender = JSON.parse(rawSender) as User;

    const message: TMessage = {
      id: crypto.randomUUID(),
      senderId: session.user.id,
      text,
      timestamp: Date.now(),
    };

    const extendedMessage: ExtendedMessage = {
      ...message,
      senderImg: sender.image,
      senderName: sender.name,
    };

    await Promise.all([
      pusherServer.trigger(
        toPusherKey(`chat:${chatId}`),
        "incoming_message",
        message,
      ),
      pusherServer.trigger(
        toPusherKey(`user:${friendId}:chats`),
        "new_message",
        extendedMessage,
      ),
      await redis.zadd(`chat:${chatId}:messages`, {
        score: message.timestamp,
        member: JSON.stringify(message),
      }),
    ]);

    return new Response("Friend request sent.", {
      status: 200,
    });
  } catch (error) {
    if (error instanceof ValiError) {
      return new Response("Invalid request", {
        status: 422,
      });
    }
    return new Response("Invalid request", {
      status: 400,
    });
  }
}
