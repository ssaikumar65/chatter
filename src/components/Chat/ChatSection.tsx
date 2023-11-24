import { TMessage } from "@/lib/schema";
import MessageList from "./MessageList";

type Props = {
  initialMessages: TMessage[];
  sessionId: string;
  chatId: string;
};
const ChatSection = async ({ initialMessages, sessionId, chatId }: Props) => {
  return (
    <div className=" flex h-[calc(100%-128px)] w-full flex-col gap-2 px-24 py-4 ">
      {initialMessages && initialMessages.length > 0 ? (
        <MessageList
          chatId={chatId}
          sessionId={sessionId}
          initialMessages={initialMessages}
        />
      ) : (
        <div className=" flex h-full items-center justify-center ">
          <span className="text-center text-slate-500">
            No messages to display
          </span>
        </div>
      )}
    </div>
  );
};
export default ChatSection;
