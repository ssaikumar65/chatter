import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import LogoutButton from "./LogoutButton";
type Props = {
  session: Session;
};
const Profile = ({ session }: Props) => {
  const fullName = session?.user.name?.split(" ") || "Chatter App";
  const name = fullName[0].charAt(0) + fullName[1].charAt(0);

  return (
    <div className=" flex h-16 w-full items-center justify-between rounded-lg border-2 p-4 shadow-md ">
      <Link href="/dashboard/profile">
        <Avatar>
          <AvatarImage src={session?.user.image || ""} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </Link>
      <div className=" flex flex-grow flex-col px-4">
        <span className=" font-bold">
          {session?.user.name || "Unauthorized"}
        </span>
        <span className=" text-sm text-neutral-400">{session?.user.email}</span>
      </div>
      <LogoutButton />
    </div>
  );
};
export default Profile;
