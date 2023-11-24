import { getServerSession } from "next-auth";
import { FriendRequestSchema } from "@/lib/schema";
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
    const { id } = parse(FriendRequestSchema, body);

    const result = await fetchRedis("get", `user:${id}`);

    if (!result) {
      return new Response("User does not exist.", { status: 400 });
    }
    const friend = JSON.parse(result) as User;

    if (friend.id === session.user.id) {
      return new Response("You cannot add yourself as a friend", {
        status: 400,
      });
    }

    const hasRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      friend.id,
    );
    if (!hasRequest) {
      return new Response("Friend Request not sent", {
        status: 400,
      });
    }

    const isFriend = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      friend.id,
    );
    if (isFriend) {
      return new Response("Already a friend", {
        status: 400,
      });
    }

    pusherServer.trigger(
      toPusherKey(`user:${session.user.id}:friend_requests`),
      "remove",
      {
        id: friend.id,
        email: null,
      },
    );

    await Promise.all([
      pusherServer.trigger(
        toPusherKey(`user:${session.user.id}:friends`),
        "friends",
        friend,
      ),
      pusherServer.trigger(
        toPusherKey(`user:${friend.id}:friends`),
        "friends",
        session.user,
      ),
      pusherServer.trigger(
        toPusherKey(`user:${session.user.id}:friend_requests`),
        "remove",
        null,
      ),
      await redis.sadd(`user:${session.user.id}:friends`, friend.id),
      await redis.sadd(`user:${friend.id}:friends`, session.user.id),
      await redis.srem(
        `user:${session.user.id}:incoming_friend_requests`,
        friend.id,
      ),
    ]);

    return new Response("Friend added.", {
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
