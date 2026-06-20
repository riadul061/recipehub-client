"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Globe, ChefHat, Heart, Star } from "lucide-react";

export default function RecipeCard({ recipe, index = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 group">
      <Link href={`/recipes/${recipe._id}`}>
        <div className="relative overflow-hidden h-48">
          <img src={recipe.recipeImage} alt={recipe.recipeName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          {recipe.isFeatured && <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3" /> Featured</div>}
          <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-800/90 rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-500" /><span>{recipe.likesCount || 0}</span></div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-100 group-hover:text-primary-500 transition-colors line-clamp-1">{recipe.recipeName}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-600 px-2 py-1 rounded-full"><ChefHat className="w-3 h-3" />{recipe.category}</span>
            <span className="inline-flex items-center gap-1 text-xs bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 px-2 py-1 rounded-full"><Globe className="w-3 h-3" />{recipe.cuisineType}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{recipe.preparationTime}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${recipe.difficultyLevel === "Easy" ? "bg-green-100 text-green-700" : recipe.difficultyLevel === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{recipe.difficultyLevel}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}