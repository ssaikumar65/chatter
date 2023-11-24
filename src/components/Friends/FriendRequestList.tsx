"use client";
import FriendRequestListItem from "./FriendRequestListItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
type Props = {
  friendrequests: IncomingFriendRequest[];
  sessionId: string;
};
const FriendRequestList = ({ friendrequests, sessionId }: Props) => {
  const [incomingRequests, setIncomingRequests] =
    useState<IncomingFriendRequest[]>(friendrequests);

  useEffect(() => {
    const friendRequestHandler = (data: IncomingFriendRequest) => {
      setIncomingRequests((prev) => [...prev, data]);
    };
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friend_requests`));
    pusherClient.bind("add_friend_requests", friendRequestHandler);
    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:friend_requests`),
      );
      pusherClient.unbind("add_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  const processFriendRequest = async (
    id: string,
    endpoint: "accept" | "decline",
  ) => {
    await axios.post(`/api/friends/${endpoint}`, { id });
    setIncomingRequests((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {incomingRequests && incomingRequests.length > 0 ? (
        <div className=" flex flex-col gap-2 overflow-y-scroll">
          {incomingRequests.map((item, index) => (
            <FriendRequestListItem
              processFriendRequest={processFriendRequest}
              user={item}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className=" flex h-full items-center justify-center p-4">
          <span className=" text-neutral-500">
            There are no requests to display.
          </span>
        </div>
      )}
    </>
  );
};
export default FriendRequestList;
