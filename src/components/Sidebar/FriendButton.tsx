"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserPlus2 } from "lucide-react";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

const FriendButton = ({ sessionId }: { sessionId: string }) => {
  const [friendRequests, setFriendRequests] = useState(0);
  useEffect(() => {
    const addRequestHandler = () => {
      setFriendRequests((prev) => prev + 1);
    };
    const removeRequestHandler = () => {
      setFriendRequests((prev) => (prev > 0 ? prev - 1 : 0));
    };
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friend_requests`));
    pusherClient.bind("add_friend_requests", addRequestHandler);
    pusherClient.bind("remove", removeRequestHandler);
    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:friend_requests`),
      );
      pusherClient.unbind("add_friend_requests", addRequestHandler);
      pusherClient.unbind("remove", removeRequestHandler);
    };
  }, [sessionId]);
  return (
    <Link className=" relative" href="/dashboard/friends">
      <Button size={"icon"} variant={"outline"}>
        <UserPlus2 />
      </Button>
      {friendRequests > 0 ? (
        <div className=" absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-red-600 text-[10px] text-white">
          {friendRequests}
        </div>
      ) : null}
    </Link>
  );
};
export default FriendButton;
