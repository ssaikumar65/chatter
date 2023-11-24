import FriendRequest from "@/components/Friends/FriendRequest";
import FriendAdd from "@/components/Friends/FriendAdd";

const Friends = () => {
  return (
    <div className=" flex h-full w-full items-center justify-around p-10">
      <FriendAdd />
      <FriendRequest />
    </div>
  );
};
export default Friends;
