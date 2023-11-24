"use client";
import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import { TMessage } from "@/lib/schema";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { usePathname } from "next/navigation";
type Props = {
  initialMessages: TMessage[];
  sessionId: string;
  chatId: string;
};
const MessageList = ({ initialMessages, sessionId, chatId }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<TMessage[]>(initialMessages);
  const pathname = usePathname();
  useEffect(() => {
    const messageHandler = (data: TMessage) => {
      setMessages((prev) => [data, ...prev]);
    };
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`));
    pusherClient.bind("incoming_message", messageHandler);
    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, [chatId, pusherClient, pathname, initialMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className=" flex flex-col-reverse gap-1 overflow-y-scroll px-4"
    >
      {messages.map((message) => (
        <MessageItem key={message.id} sessionId={sessionId} message={message} />
      ))}
    </div>
  );
};
export default MessageList;
