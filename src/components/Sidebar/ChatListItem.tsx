import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getChatId } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "../ui/badge";
type Props = {
  friend: User;
  sessionId: string;
  unseenMessages: number;
};
const ChatListItem = ({ friend, sessionId, unseenMessages }: Props) => {
  return (
    <Card>
      <Link
        className=" relative"
        href={`/dashboard/chat/${getChatId(friend.id, sessionId)}`}
      >
        <CardContent className="flex flex-row items-center gap-2 px-4 py-2">
          <Avatar>
            <AvatarImage src={friend.image || ""} />
            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className=" flex flex-grow flex-col px-4">
            <span className=" flex gap-2 font-bold">
              {friend.name}
              {unseenMessages > 0 ? (
                <Badge variant={"secondary"}>{unseenMessages}</Badge>
              ) : null}
            </span>
            <span className=" text-sm text-neutral-400">{friend.email}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
export default ChatListItem;
