import { getTokenServer } from "@/lib/getTokenServer";
import PurchasedClient from "./PurchasedClient";

export default async function PurchasedPage() {
  let purchases = [];
  try {
    const token = await getTokenServer();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/purchases`, {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    purchases = data.purchases || [];
  } catch (err) {
    console.error("Failed to load purchases:", err);
  }
  return <PurchasedClient purchases={purchases} />;
}