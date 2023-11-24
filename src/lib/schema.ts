import { type Output, email, object, string, number, array } from "valibot";
export const AddFriendSchema = object({
  email: string([email("Email is required")]),
});
export const FriendRequestSchema = object({
  id: string("Id is required"),
});
const MessageSchema = object({
  id: string("Id is required"),
  senderId: string("Sender Id is required"),
  text: string("Message is required"),
  timestamp: number(),
});
export const SendMessageSchema = object({
  chatId: string("Chat Id is required"),
  text: string("Message is required"),
});
export const MessageArraySchema = array(MessageSchema);
export type TAddFriend = Output<typeof AddFriendSchema>;
export type TFriendRequest = Output<typeof FriendRequestSchema>;
export type TMessage = Output<typeof MessageSchema>;
export type TSendMessageSchema = Output<typeof SendMessageSchema>;
