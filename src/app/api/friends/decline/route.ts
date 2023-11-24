import { getServerSession } from "next-auth";
import { FriendRequestSchema } from "@/lib/schema";
import { parse, ValiError } from "valibot";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import redis from "@/lib/redis";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { id } = parse(FriendRequestSchema, body);

    pusherServer.trigger(
      toPusherKey(`user:${session.user.id}:friend_requests`),
      "remove",
      null,
    );

    await redis.srem(`user:${session.user.id}:incoming_friend_requests`, id);

    return new Response("Friend request declined.", {
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
