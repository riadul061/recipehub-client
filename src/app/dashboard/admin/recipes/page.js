import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenServer";
import AdminRecipesClient from "./AdminRecipesClient";

export default async function AdminRecipesPage() {
  const token = await getTokenServer();
  let recipes = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/recipes`, { headers: { authorization: `Bearer ${token}` } });
    const data = await res.json();
    recipes = data.recipes || [];
  } catch {}
  return <AdminRecipesClient recipes={recipes} />;
}