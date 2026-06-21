"use client";
import Link from "next/link";
import { UtensilsCrossed, Heart, ThumbsUp, Crown, ArrowRight, User as UserIcon } from "lucide-react";
// import { createCheckoutSession } from "@/lib/action/payments";

export default function UserDashboardClient({ user, stats }) {
  const handlePremium = async () => {
    const res = await createCheckoutSession({ type: "premium" });
    if (res.url) window.location.href = res.url;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1><p className="text-slate-400 mt-1">Welcome back, {user.name}!</p></div>
        {user.isPremium && <span className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full font-medium text-sm"><Crown className="w-4 h-4" />Premium</span>}
      </div>
      {!user.isPremium && (
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div><h3 className="text-xl font-bold flex items-center gap-2"><Crown className="w-6 h-6" />Upgrade to Premium</h3><p className="text-white/80 text-sm">Unlock unlimited recipes & premium badge!</p></div>
            <button onClick={handlePremium} className="bg-white text-primary-600 px-8 py-3 rounded-xl font-bold hover:bg-primary-50">Get Premium - $9.99</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[{label:"Total Recipes",value:stats.totalRecipes,icon:UtensilsCrossed},{label:"Favorites",value:stats.totalFavorites,icon:Heart},{label:"Likes",value:stats.totalLikes,icon:ThumbsUp}].map(s=>(
          <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold mb-1">{s.value}</div><div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{href:"/dashboard/user/add-recipe",label:"Add Recipe",icon:UtensilsCrossed},{href:"/dashboard/user/my-recipes",label:"My Recipes",icon:UtensilsCrossed},{href:"/dashboard/user/favorites",label:"Favorites",icon:Heart},{href:"/dashboard/user/profile",label:"Profile",icon:UserIcon}].map(a=>(
          <Link key={a.href} href={a.href} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 flex items-center justify-between group border border-gray-100 dark:border-slate-700 hover:border-primary-300">
            <div className="flex items-center gap-3"><a.icon className="w-5 h-5 text-primary-500" /><span className="font-medium">{a.label}</span></div><ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-500" />
          </Link>
        ))}
      </div>
    </div>
  );
}