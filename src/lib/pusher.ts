import PusherServer from "pusher";
import PusherClient from "pusher-js";
import { pusherCredentials } from "./credentials";

export const pusherServer = new PusherServer({
  appId: pusherCredentials().appId,
  key: pusherCredentials().key,
  secret: pusherCredentials().secret,
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: "ap2",
  },
);
