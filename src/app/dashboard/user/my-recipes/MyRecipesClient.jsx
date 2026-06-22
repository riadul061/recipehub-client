"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, Trash2, Pencil } from "lucide-react";
import { deleteRecipe } from "@/lib/action/recipes";
import toast from "react-hot-toast";

export default function MyRecipesClient({ recipes: initial }) {
  const [recipes, setRecipes] = useState(initial);

  const handleDelete = async (id) => {
    if (!confirm("Delete this recipe?")) return;
    const res = await deleteRecipe(id);
    if (res.success) { setRecipes(recipes.filter(r => r._id !== id)); toast.success("Deleted"); }
    else toast.error("Failed");
  };

  if (recipes.length === 0) return (
    <div className="text-center py-10">
      <div className="text-6xl mb-4">🍳</div>
      <p className="text-slate-500 mb-4">No recipes yet.</p>
      <Link href="/dashboard/user/add-recipe" className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold">
        Add Recipe
      </Link>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.map(r => (
          <div key={r._id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="h-40 overflow-hidden relative">
              <img src={r.recipeImage} alt={r.recipeName} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                ❤️ {r.likesCount} Likes
              </div>
              <div className="absolute top-2 left-2">
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  r.status === "active" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                }`}>
                  {r.status === "active" ? "Active" : r.status}
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold mb-1 truncate">{r.recipeName}</h3>
              <p className="text-sm text-slate-500 mb-1">{r.category} • {r.cuisineType}</p>
              <p className="text-sm text-slate-400 mb-4">{r.difficultyLevel} • {r.preparationTime}</p>
              <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
                {/* View Button */}
                <Link
                  href={`/recipes/${r._id}`}
                  className="flex-1 border-2 border-primary-500 text-primary-600 text-sm py-2 rounded-lg font-medium text-center flex items-center justify-center gap-1 hover:bg-primary-50"
                >
                  <Eye className="w-4 h-4" />View
                </Link>
                {/* Edit Button */}
                <Link
                  href={`/dashboard/user/my-recipes/${r._id}/edit`}
                  className="flex-1 border-2 border-blue-500 text-blue-600 text-sm py-2 rounded-lg font-medium text-center flex items-center justify-center gap-1 hover:bg-blue-50"
                >
                  <Pencil className="w-4 h-4" />Edit
                </Link>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(r._id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}