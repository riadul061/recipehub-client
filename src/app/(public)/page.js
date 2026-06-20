import { getRecipes, getPopularRecipes } from "@/lib/api/recipes";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const [featuredRes, popularRes] = await Promise.all([
    getRecipes({ featured: "true", limit: "4" }),
    getPopularRecipes(),
  ]);
  return <HomeClient featured={featuredRes.recipes || []} popular={popularRes.recipes || []} />;
}