import { TMessage } from "@/lib/schema";
import { cn } from "@/lib/utils";
import moment from "moment";

type Props = {
  message: TMessage;
  sessionId: string;
};
const MessageItem = ({ message, sessionId }: Props) => {
  return (
    <div
      className={cn(
        "flex",
        message.senderId === sessionId ? " justify-end" : " justify-start",
      )}
    >
      <div
        className={cn(
          " relative min-h-[50px] min-w-[100px] max-w-[300px] rounded-md p-2",
          message.senderId === sessionId
            ? " border-2 bg-background"
            : " bg-foreground text-background",
        )}
      >
        <span>{message.text}</span>
        <span className=" absolute bottom-0 right-1 text-[8px]">
          {moment(message.timestamp).format("LT")}
        </span>
      </div>
    </div>
  );
};
export default MessageItem;
