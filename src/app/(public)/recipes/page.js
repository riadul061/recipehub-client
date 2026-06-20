import { getRecipes } from "@/lib/api/recipes";
import BrowseClient from "./BrowseClient";

export default async function BrowsePage({ searchParams }) {
  const s = await searchParams;
  const page = parseInt(s.page) || 1;
  const category = s.category || "";
  const search = s.search || "";
  const params = { page, limit: 12 };
  if (category) params.category = category;
  if (search) params.search = search;
  const data = await getRecipes(params);
  return <BrowseClient recipes={data.recipes || []} pagination={data.pagination} />;
}