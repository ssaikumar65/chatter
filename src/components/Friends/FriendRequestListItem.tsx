import { Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
type Props = {
  processFriendRequest: (id: string, endpoint: "accept" | "decline") => void;
  user: IncomingFriendRequest;
};
const FriendRequestListItem = ({ user, processFriendRequest }: Props) => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-2">
        <span className="text-sm">{user.email}</span>
        <div className=" flex gap-2">
          <Button
            onClick={() => processFriendRequest(user.id, "accept")}
            size={"icon"}
            variant={"outline"}
          >
            <Check />
          </Button>
          <Button
            onClick={() => processFriendRequest(user.id, "decline")}
            size={"icon"}
            variant={"outline"}
          >
            <X />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default FriendRequestListItem;
