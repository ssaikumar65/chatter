import { Redis } from "@upstash/redis";
import { redisCredentials } from "./credentials";

const redis = new Redis({
  url: redisCredentials().url,
  token: redisCredentials().token,
});

export default redis;
