import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenServer";
import AdminTransactionsClient from "./AdminTransactionsClient";

export default async function AdminTransactionsPage() {
  const token = await getTokenServer();
  let transactions = []; let pagination = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/transactions`, { headers: { authorization: `Bearer ${token}` } });
    const data = await res.json();
    transactions = data.transactions || [];
    pagination = data.pagination;
  } catch {}
  return <AdminTransactionsClient transactions={transactions} pagination={pagination} />;
}