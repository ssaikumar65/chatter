import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import FriendButton from "./FriendButton";
const Header = ({ sessionId }: { sessionId: string }) => {
  return (
    <div className=" flex h-16 w-full items-center justify-between rounded-lg border-2 p-4 shadow-md">
      <span className=" text-2xl font-bold">Chatter</span>
      <div className=" flex items-center gap-2">
        <Link href="/dashboard">
          <Button size={"icon"} variant={"outline"}>
            <Home />
          </Button>
        </Link>
        <FriendButton sessionId={sessionId} />
      </div>
    </div>
  );
};
export default Header;
