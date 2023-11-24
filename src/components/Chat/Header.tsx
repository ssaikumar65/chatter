import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
type Props = {
  chatPartner: User;
};
const Header = ({ chatPartner }: Props) => {
  return (
    <div className=" flex h-16 w-full items-center justify-between border-b-2 px-8 py-2 shadow">
      <Avatar>
        <AvatarImage src={chatPartner.image} />
        <AvatarFallback>{chatPartner.name.charAt(0) ?? "CR"}</AvatarFallback>
      </Avatar>
      <div className=" flex flex-grow flex-col px-4">
        <span className=" font-bold">{chatPartner.name}</span>
      </div>
      <Button size={"icon"} variant={"outline"}>
        <Trash />
      </Button>
    </div>
  );
};
export default Header;
