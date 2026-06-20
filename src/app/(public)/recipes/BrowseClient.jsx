"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RecipeCard from "@/components/RecipeCard";
import Pagination from "@/components/Pagination";
import { Search, SlidersHorizontal } from "lucide-react";

const categories = ["All","Breakfast","Lunch","Dinner","Dessert","Appetizer","Snack","Soup","Salad","Beverage","Bread","Pasta"];

export default function BrowseClient({ recipes, pagination }) {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => { e.preventDefault(); router.push(`/recipes?search=${searchInput}`); };
  const handleCategory = (cat) => { setCategory(cat); router.push(`/recipes${cat && cat !== "All" ? `?category=${cat}` : ""}`); };
  const handlePage = (p) => router.push(`/recipes?page=${p}${category && category !== "All" ? `&category=${category}` : ""}${searchInput ? `&search=${searchInput}` : ""}`);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Browse Recipes</h1>
        <p className="text-white/80">Discover delicious recipes from our community</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input value={searchInput} onChange={e=>setSearchInput(e.target.value)} placeholder="Search recipes..." className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </form>
            <button onClick={()=>setShowFilters(!showFilters)} className="border-2 border-primary-500 text-primary-600 px-4 py-3 rounded-lg font-medium flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" />Filters</button>
          </div>
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-2">
                {categories.map(cat=>(
                  <button key={cat} onClick={()=>handleCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium ${(cat==="All" && !category)||category===cat ? "bg-primary-500 text-white shadow-md" : "bg-gray-100 dark:bg-slate-700 text-slate-600 hover:bg-gray-200"}`}>{cat}</button>
                ))}
              </div>
            </div>
          )}
        </div>
        {recipes.length > 0 ? (
          <><p className="text-sm text-slate-500 mb-6">Showing {recipes.length} of {pagination?.total} recipes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{recipes.map((r,i)=><RecipeCard key={r._id} recipe={r} index={i} />)}</div>
          <Pagination pagination={pagination} onPageChange={handlePage} /></>
        ) : (
          <div className="text-center py-20"><div className="text-6xl mb-4">🔍</div><h3 className="text-xl font-semibold mb-2">No recipes found</h3></div>
        )}
      </div>
    </div>
  );
}