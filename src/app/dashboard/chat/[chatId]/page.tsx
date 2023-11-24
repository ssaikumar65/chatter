import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import ChatInput from "@/components/Chat/ChatInput";
import ChatSection from "@/components/Chat/ChatSection";
import Header from "@/components/Chat/Header";
import { getMessages } from "@/helpers/chat";
import { fetchRedis } from "@/helpers/redis";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};
const ChatPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const { chatId } = params;
  const { user } = session;
  const [userId1, userId2] = chatId.split("--");
  if (user.id !== userId1 && user.id !== userId2) {
    notFound();
  }
  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = JSON.parse(
    await fetchRedis("get", `user:${chatPartnerId}`),
  ) as User;
  const initialMessages = await getMessages(chatId);

  return (
    <div className=" flex h-full w-full flex-col overflow-hidden">
      <Header chatPartner={chatPartner} />
      <ChatSection
        chatId={chatId}
        sessionId={session.user.id}
        initialMessages={initialMessages}
      />
      <ChatInput chatId={chatId} />
    </div>
  );
};
export default ChatPage;
