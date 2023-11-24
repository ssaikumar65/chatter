"use client";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import logo from "../assets/google.png";
import { Button } from "./ui/button";

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" flex w-60 flex-col items-center gap-6">
      <span className=" text-6xl font-bold">Chatter</span>
      <span className=" font-bold text-gray-500">Sign in to your account</span>
      <Button
        disabled={isLoading}
        onClick={loginHandler}
        className=" flex w-32 items-center justify-center gap-2"
      >
        {isLoading ? (
          <Loader2 size={30} className="animate-spin" />
        ) : (
          <Image src={logo} alt="Logo" width={30} height={30} priority />
        )}
        <span className=" text-lg font-bold">Google</span>
      </Button>
    </div>
  );
};
export default LoginButton;
