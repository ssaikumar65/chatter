import { Bot } from "lucide-react";
const Dashboard = () => {
  return (
    <div className=" flex h-full w-full flex-col items-center justify-center gap-8">
      <span className=" flex items-center gap-4 text-4xl font-bold tracking-wide">
        Chatters
        <Bot size={40} className="text-orange-400" />
      </span>
      <span className=" px-20 py-4 text-center text-slate-500">
        Your go-to chat app for seamless one-on-one and group messaging,
        connecting you with friends and colleagues effortlessly.
      </span>
    </div>
  );
};
export default Dashboard;
