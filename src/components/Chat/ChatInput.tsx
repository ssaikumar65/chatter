"use client";
import { Loader2, SendHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const ChatInput = ({ chatId }: { chatId: string }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSendMessage = async () => {
    if (input.length <= 0) {
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`/api/message/send`, { text: input, chatId });
      setIsLoading(false);
      setInput("");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      inputRef.current?.focus();
    }
  };
  return (
    <div className=" flex h-16 w-full items-center justify-between gap-8 border-t-2 px-32 py-2 shadow">
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="shadow"
        placeholder="Type a message ..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
          }
        }}
      />
      <Button
        disabled={isLoading}
        onClick={onSendMessage}
        className=" shadow"
        size={"icon"}
        variant={"outline"}
      >
        {isLoading ? <Loader2 className=" animate-spin" /> : <SendHorizontal />}
      </Button>
    </div>
  );
};
export default ChatInput;
