import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenServer";
import AdminUsersClient from "./AdminUsersClient";

export default async function AdminUsersPage() {
  const token = await getTokenServer();
  let users = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users`, { headers: { authorization: `Bearer ${token}` } });
    const data = await res.json();
    users = data.users || [];
  } catch {}
  return <AdminUsersClient users={users} />;
}