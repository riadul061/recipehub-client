import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/getTokenServer";
import AddRecipeClient from "./AddRecipeClient";

export default async function AddRecipePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session.user;
  let recipeCount = 0;
  if (!user.isPremium) {
    const token = await getTokenServer();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/my-recipes`, { headers: { authorization: `Bearer ${token}` } });
      const data = await res.json();
      recipeCount = data.pagination?.total || 0;
    } catch {}
  }
  return <AddRecipeClient user={user} recipeCount={recipeCount} />;
}