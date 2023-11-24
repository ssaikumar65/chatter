import { getServerSession } from "next-auth";
import { AddFriendSchema } from "@/lib/schema";
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
    const { email } = parse(AddFriendSchema, body);

    const result = (await fetchRedis("get", `user:email:${email}`)) as string;

    if (!result) {
      return new Response("User does not exist.", { status: 400 });
    }
    if (result === session.user.id) {
      return new Response("You cannot add yourself as a friend", {
        status: 400,
      });
    }

    const isAdded = (await fetchRedis(
      "sismember",
      `user:${result}:incoming_friend_requests`,
      session.user.id,
    )) as boolean;
    if (isAdded) {
      return new Response("Request already sent", {
        status: 400,
      });
    }
    const isFriend = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      result,
    )) as boolean;
    if (isFriend) {
      return new Response("Already added the user", {
        status: 400,
      });
    }
    pusherServer.trigger(
      toPusherKey(`user:${result}:friend_requests`),
      "add_friend_requests",
      null,
    );

    redis.sadd(`user:${result}:incoming_friend_requests`, session.user.id);

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
