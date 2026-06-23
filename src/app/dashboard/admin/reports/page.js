import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenServer";
import AdminReportsClient from "./AdminReportsClient";

export default async function AdminReportsPage() {
  const token = await getTokenServer();
  let reports = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/reports`, { headers: { authorization: `Bearer ${token}` } });
    const data = await res.json();
    reports = data.reports || [];
  } catch {}
  return <AdminReportsClient reports={reports} />;
}