"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Clock, ChefHat, ArrowRight } from "lucide-react";

export default function RecipeCard({ recipe, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-700"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {recipe.isFeatured && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}
        <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 text-xs font-semibold px-3 py-1 rounded-full text-primary-600">
          {recipe.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1">
          {recipe.recipeName}
        </h3>

        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            {recipe.difficultyLevel}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {recipe.preparationTime}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {recipe.likesCount || 0}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            By {recipe.authorName || "Unknown"}
          </span>
          <Link
            href={`/recipes/${recipe._id}`}
            className="flex items-center gap-1 text-primary-600 font-semibold text-sm hover:gap-2 transition-all"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}