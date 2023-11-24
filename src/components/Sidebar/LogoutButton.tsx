"use client";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
      toast.success("Logged out successfully");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={logoutHandler}
      size={"icon"}
      variant={"outline"}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
    </Button>
  );
};
export default LogoutButton;
