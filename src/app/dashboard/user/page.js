import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenServer";
import UserDashboardClient from "./UserDashboardClient";

export default async function UserDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  let stats = { totalRecipes: 0, totalFavorites: 0, totalLikes: 0 };
  try {
    const token = await getTokenServer();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/stats`, {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    stats = await res.json();
  } catch (err) {
    console.error("Failed to load stats:", err);
  }
  return <UserDashboardClient user={session.user} stats={stats} />;
}