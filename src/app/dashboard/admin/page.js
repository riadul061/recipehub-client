import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenServer";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const token = await getTokenServer();
  let stats = { totalUsers: 0, totalRecipes: 0, premiumUsers: 0, totalReports: 0 };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/dashboard`, { headers: { authorization: `Bearer ${token}` } });
    stats = await res.json();
  } catch {}
  return <AdminDashboardClient stats={stats} />;
}