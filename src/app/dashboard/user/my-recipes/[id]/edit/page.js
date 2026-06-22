import { getTokenServer } from "@/lib/getTokenServer";
import { notFound } from "next/navigation";
import EditRecipeClient from "./EditRecipeClient";

export default async function EditRecipePage({ params }) {
  const { id } = await params;
  let recipe = null;
  try {
    const token = await getTokenServer();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/${id}`, {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    recipe = data.recipe || null;
  } catch {}
  if (!recipe) return notFound();
  return <EditRecipeClient recipe={recipe} />;
}