import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import FriendRequestList from "./FriendRequestList";
import { getFriendRequestsByUserId } from "@/helpers/friends";

const FriendRequest = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const friendrequests = await getFriendRequestsByUserId(session.user.id);

  return (
    <div className=" flex h-full w-96 flex-col gap-3 rounded-lg border-2 p-4 shadow-md">
      <span className="text-center text-2xl font-extrabold">
        Friend Requests
      </span>
      <FriendRequestList
        sessionId={session.user.id}
        friendrequests={friendrequests}
      />
    </div>
  );
};
export default FriendRequest;
