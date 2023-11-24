import Profile from "./Profile";
import Header from "./Header";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import Chat from "./Chat";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  return (
    <div className=" flex h-full min-w-[350px] flex-col gap-2 rounded-lg">
      <Header sessionId={session.user.id} />
      <Chat session={session} />
      <Profile session={session} />
    </div>
  );
};
export default Sidebar;
