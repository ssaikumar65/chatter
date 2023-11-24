type User = {
  name: string;
  email: string;
  image: string;
  id: string;
};
type Chat = {
  id: string;
  messages: Message[];
};
type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
};
type FriendRequest = {
  id: string;
  senderId: string;
  receiverId: string;
};
type ExtendedMessage = {
  senderImg: string;
  senderName: string;
  text: string;
  id: string;
  senderId: string;
  timestamp: number;
};
