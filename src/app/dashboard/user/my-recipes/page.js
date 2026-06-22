import { getTokenServer } from "@/lib/getTokenServer";
import MyRecipesClient from "./MyRecipesClient";

export default async function MyRecipesPage() {
  let recipes = [];
  try {
    const token = await getTokenServer();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/my-recipes`, {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    recipes = data.recipes || [];
  } catch (err) {
    console.error("Failed to load recipes:", err);
  }
  return <MyRecipesClient recipes={recipes} />;
}