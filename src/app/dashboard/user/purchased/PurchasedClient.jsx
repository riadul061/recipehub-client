"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function PurchasedClient({ purchases }) {
  if (purchases.length === 0) return <div className="text-center py-10"><ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" /><p className="text-slate-500">No purchased recipes yet.</p></div>;

  return (
    <div><h1 className="text-2xl font-bold mb-6">Purchased Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchases.map(p => p.recipeId && (
          <div key={p.transactionId} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 flex gap-4 items-center">
            <img src={p.recipeId.recipeImage} alt={p.recipeId.recipeName} className="w-16 h-16 rounded object-cover" />
            <div className="flex-1">
              <h3 className="font-bold text-sm truncate">{p.recipeId.recipeName}</h3>
              <p className="text-xs text-green-500 font-medium">Paid ${p.amount}</p>
              <Link href={`/recipes/${p.recipeId._id}`} className="text-xs text-primary-500 hover:underline mt-1 inline-block">View Recipe</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}