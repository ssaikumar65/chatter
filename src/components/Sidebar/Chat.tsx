import { Session } from "next-auth";
import { getFriendsByUserId } from "@/helpers/friends";
import Chatlist from "./Chatlist";
type Props = {
  session: Session;
};
const Chat = async ({ session }: Props) => {
  const friends = await getFriendsByUserId(session.user.id);
  return (
    <div className=" flex h-[calc(100%-128px)] w-full flex-col gap-2 rounded-lg border-2 p-4 shadow-md">
      <span className=" font-semibold text-slate-400">Friends</span>
      <Chatlist friends={friends} sessionId={session.user.id} />
    </div>
  );
};
export default Chat;
