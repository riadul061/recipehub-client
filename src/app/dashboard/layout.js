import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardSidebar from "./DashboardSidebar";

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?callbackUrl=/dashboard");
  if (session.user.isBlocked) redirect("/");
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      <DashboardSidebar user={session.user} />
      <div className="flex-1 p-4 md:p-8 overflow-auto">{children}</div>
    </div>
  );
}