import Sidebar from "@/components/Sidebar";
import "../globals.css";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex h-screen gap-4 overflow-x-scroll p-4">
      <Sidebar />
      <div className="w-full min-w-[700px] overflow-hidden rounded-lg border-2 shadow-md">
        {children}
      </div>
    </div>
  );
}
