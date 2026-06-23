"use client";
import { useState } from "react";
import Link from "next/link";
import { Star, StarOff, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminRecipesClient({ recipes: initial }) {
  const [recipes, setRecipes] = useState(initial);

  const getToken = async () => {
    const res = await fetch("/api/auth/token", { credentials: "include" });
    const data = await res.json();
    return data?.token || null;
  };

  const handleFeature = async (id, featured) => {
    const token = await getToken();
    if (!token) return toast.error("Session expired");
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/recipes/${id}/feature`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ isFeatured: !featured }),
    });
    if (res.ok) {
      setRecipes(recipes.map(r => r._id === id ? { ...r, isFeatured: !featured } : r));
      toast.success(featured ? "Unfeatured" : "Featured");
    } else {
      toast.error("Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this recipe?")) return;
    const token = await getToken();
    if (!token) return toast.error("Session expired");
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setRecipes(recipes.filter(r => r._id !== id));
      toast.success("Deleted");
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Recipes</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-md">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="text-left p-4 font-semibold text-sm">Recipe</th>
              <th className="text-left p-4 font-semibold text-sm">Author</th>
              <th className="text-left p-4 font-semibold text-sm">Likes</th>
              <th className="text-left p-4 font-semibold text-sm">Featured</th>
              <th className="text-left p-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {recipes.map(r => (
              <tr key={r._id} className="hover:bg-gray-50 dark:hover:bg-slate.700">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={r.recipeImage} className="w-10 h-10 rounded object-cover" alt={r.recipeName} />
                    <span className="font-medium text-sm truncate max-w-[200px]">{r.recipeName}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-500">{r.authorName}</td>
                <td className="p-4 text-sm">{r.likesCount}</td>
                <td className="p-4">
                  <button onClick={() => handleFeature(r._id, r.isFeatured)} className={`p-1.5 rounded-lg ${r.isFeatured ? "text-yellow-500 bg-yellow-50" : "text-slate-400 hover:text-yellow-500"}`}>
                    {r.isFeatured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/recipes/${r._id}`} className="p-1.5 text-primary-500 hover:bg-primary-50 rounded-lg"><Eye className="w-4 h-4" /></Link>
                    <button onClick={() => handleDelete(r._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}