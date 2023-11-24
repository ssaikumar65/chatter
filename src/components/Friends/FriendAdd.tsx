"use client";
import { AddFriendSchema, TAddFriend } from "@/lib/schema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import axios, { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { ValiError } from "valibot";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const FriendAdd = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TAddFriend>({
    resolver: valibotResolver(AddFriendSchema),
  });

  const onSubmit: SubmitHandler<TAddFriend> = async ({ email }) => {
    try {
      await axios.post("/api/friends/add", { email });
      toast.success("Friend request sent");
    } catch (error) {
      console.log(error);
      if (error instanceof ValiError) {
        setError("email", { message: error.message });
        return;
      }
      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }
      setError("email", { message: "Soemthing went wrong" });
    }
  };
  return (
    <div className=" flex h-full w-96 flex-col gap-6 rounded-lg border-2 p-4 shadow-md">
      <span className="text-center text-2xl font-extrabold">Add a Friend</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex items-center gap-2 rounded-lg"
      >
        <Input
          {...register("email")}
          placeholder="name@example.com"
          type="email"
          className=" rounded-lg"
        />
        <Button className=" w-24" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Search"}
        </Button>
      </form>
      <span className=" text-md h-6 overflow-hidden text-center ">
        {isSubmitSuccessful ? (
          <span className="text-green-500">Friend request sent</span>
        ) : null}
        {errors.email ? (
          <span className="text-red-500">{errors.email.message}</span>
        ) : null}
      </span>
    </div>
  );
};
export default FriendAdd;
