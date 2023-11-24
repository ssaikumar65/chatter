import { fetchRedis } from "./redis";

export const getFriendsByUserId = async (userId: string) => {
  const requests = (await fetchRedis(
    "smembers",
    `user:${userId}:friends`,
  )) as string[];
  const friends = await Promise.all(
    requests.map(async (item) => {
      const res = await fetchRedis("get", `user:${item}`);
      const sender = JSON.parse(res) as User;
      return sender;
    }),
  );
  return friends;
};
export const getFriendRequestsByUserId = async (userId: string) => {
  const requests = (await fetchRedis(
    "smembers",
    `user:${userId}:incoming_friend_requests`,
  )) as string[];

  const friendrequests = await Promise.all(
    requests.map(async (item) => {
      const res = await fetchRedis("get", `user:${item}`);
      const sender = JSON.parse(res) as User;
      return { id: sender.id, email: sender.email };
    }),
  );
  return friendrequests;
};
