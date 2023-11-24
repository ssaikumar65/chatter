"use client";
import { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { usePathname } from "next/navigation";
type Props = {
  friends: User[];
  sessionId: string;
};
const Chatlist = ({ friends, sessionId }: Props) => {
  const [friendList, setfriendList] = useState<User[]>(friends);
  const [unseenMessages, setUnseenMessages] = useState<ExtendedMessage[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const friendRequestHandler = (data: User) => {
      setfriendList((prev) => [...prev, data]);
    };
    const messageHandler = (data: ExtendedMessage) => {
      if (!pathname.includes("chat")) {
        setUnseenMessages((prev) => [...prev, data]);
      }
    };
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
    pusherClient.bind("friends", friendRequestHandler);
    pusherClient.bind("new_message", messageHandler);
    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unbind("friends", friendRequestHandler);
      pusherClient.unbind("new_message", messageHandler);
    };
  }, [sessionId, pusherClient, pathname]);

  useEffect(() => {
    if (pathname.includes("chat")) {
      setUnseenMessages((prev) =>
        prev.filter((message) => !pathname.includes(message.senderId)),
      );
    }
  }, [pathname]);

  return (
    <>
      {friendList && friendList.length > 0 ? (
        <div className=" flex flex-col gap-2 overflow-y-scroll">
          {friendList.map((friend) => (
            <ChatListItem
              key={friend.id}
              sessionId={sessionId}
              friend={friend}
              unseenMessages={
                unseenMessages.filter(
                  (message) => message.senderId === friend.id,
                ).length
              }
            />
          ))}
        </div>
      ) : (
        <div className=" flex h-full items-center justify-center ">
          <span className="text-center text-slate-500">Start chatting!!!</span>
        </div>
      )}
    </>
  );
};
export default Chatlist;
