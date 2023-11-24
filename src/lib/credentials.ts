export const googleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (
    !clientId ||
    clientId.length <= 0 ||
    !clientSecret ||
    clientSecret.length <= 0
  )
    throw new Error("Invalid Google Credentials");
  return { clientId, clientSecret };
};

export const redisCredentials = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || url.length <= 0 || !token || token.length <= 0)
    throw new Error("Invalid Redis Credentials");
  return { url, token };
};

export const pusherCredentials = () => {
  const appId = process.env.PUSHER_APP_ID!;
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY!;
  const secret = process.env.PUSHER_SECRET!;

  return { appId, key, secret };
};
