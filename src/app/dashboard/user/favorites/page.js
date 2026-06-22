import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenServer";
import FavoritesClient from "./FavoritesClient";

export default async function FavoritesPage() {
  const token = await getTokenServer();
  let favorites = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites`, { headers: { authorization: `Bearer ${token}` } });
    const data = await res.json();
    favorites = data.favorites || [];
  } catch {}
  return <FavoritesClient favorites={favorites} />;
}