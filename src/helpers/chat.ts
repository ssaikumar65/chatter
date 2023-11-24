import { MessageArraySchema } from "@/lib/schema";
import { parse } from "valibot";
import { fetchRedis } from "./redis";

export const getMessages = async (chatId: string) => {
  try {
    const res: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1,
    );
    const reversedMessages = res
      .map((message) => JSON.parse(message) as Message)
      .reverse();
    const messages = parse(MessageArraySchema, reversedMessages);

    return messages;
  } catch (error) {
    throw new Error("Error retrieving messages");
  }
};
