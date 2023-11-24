import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-16 p-10">
      <div className=" flex h-full w-96 flex-col gap-6 rounded-lg border-2 p-4 shadow-md">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
      <div className=" flex h-full w-96 flex-col gap-6 rounded-lg border-2 p-4 shadow-md">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    </div>
  );
};
export default Loading;
