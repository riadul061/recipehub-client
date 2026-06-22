"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, Trash2, Eye } from "lucide-react";
import { removeFavorite } from "@/lib/action/favorites";
import toast from "react-hot-toast";

export default function FavoritesClient({ favorites: initial }) {
  const [favorites, setFavorites] = useState(initial);

  const handleRemove = async (recipeId) => {
    const res = await removeFavorite(recipeId);
    if (res.success) { setFavorites(favorites.filter(f => f.recipeId?._id !== recipeId)); toast.success("Removed"); }
    else toast.error("Failed");
  };

  if (favorites.length === 0) return <div className="text-center py-10"><Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500">No favorites yet.</p><Link href="/recipes" className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold mt-4 inline-block">Browse Recipes</Link></div>;

  return (
    <div><h1 className="text-2xl font-bold mb-6">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(fav => {
          const recipe = fav.recipeId;
          if (!recipe) return null;
          return (
            <div key={fav._id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden relative">
                <img src={recipe.recipeImage} alt={recipe.recipeName} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full"><Heart className="w-4 h-4 fill-current" /></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold truncate">{recipe.recipeName}</h3>
                <p className="text-sm text-slate-500 mb-3">{recipe.category} • {recipe.cuisineType}</p>
                <div className="flex gap-2">
                  <Link href={`/recipes/${recipe._id}`} className="flex-1 border-2 border-primary-500 text-primary-600 text-sm py-2 rounded-lg font-medium text-center flex items-center justify-center gap-1"><Eye className="w-4 h-4" />View</Link>
                  <button onClick={()=>handleRemove(recipe._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-gray-200"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}