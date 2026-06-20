import { getRecipeById } from "@/lib/api/recipes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import RecipeDetailClient from "./RecipeDetailClient";

export default async function RecipeDetailPage({ params }) {
  const { id } = await params;
  const res = await getRecipeById(id);
  if (!res.recipe) return notFound();
  const session = await auth.api.getSession({ headers: await headers() });
  return <RecipeDetailClient recipe={res.recipe} user={session?.user || null} />;
}