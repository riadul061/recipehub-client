"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ReportModal from "@/components/ReportModal";
import toast from "react-hot-toast";
import { Heart, ShoppingCart, Bookmark, Clock, ChefHat, Globe, ArrowLeft, CheckCircle, Flag } from "lucide-react";

export default function RecipeDetailClient({ recipe, user }) {
  const router = useRouter();
  const [likes, setLikes] = useState(recipe.likesCount);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const hasPurchased = recipe.purchasedBy?.includes(user?.sub) || false;

  useEffect(() => {
    if (user && recipe.likedBy?.includes(user.sub)) setLiked(true);
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites`, { headers: { authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.favorites?.some(f => f.recipeId?._id === recipe._id)) setFavorited(true);
    } catch {}
  };

  const getToken = async () => {
    const { data } = await fetch("/api/auth/get-session", { credentials: "include" }).then(r=>r.json());
    return data?.session?.token || null;
  };

  const handleLike = async () => {
    if (!user) return toast.error("Login to like");
    const token = await getToken();
    if (!token) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/${recipe._id}/like`, { method: "POST", headers: { authorization: `Bearer ${token}` } });
    const d = await res.json();
    setLiked(d.liked); setLikes(d.likesCount);
  };

  const handleFavorite = async () => {
    if (!user) return toast.error("Login to favorite");
    const token = await getToken();
    if (!token) return;
    if (favorited) {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites/${recipe._id}`, { method: "DELETE", headers: { authorization: `Bearer ${token}` } });
      setFavorited(false); toast.success("Removed");
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites`, { method: "POST", headers: { "Content-Type":"application/json", authorization: `Bearer ${token}` }, body: JSON.stringify({ recipeId: recipe._id }) });
      setFavorited(true); toast.success("Saved!");
    }
  };

  const handlePurchase = async () => {
    if (!user) return toast.error("Login to purchase");
    setPurchasing(true);
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-checkout-session`, { method: "POST", headers: { "Content-Type":"application/json", authorization: `Bearer ${token}` }, body: JSON.stringify({ recipeId: recipe._id }) });
    const d = await res.json();
    if (d.url) window.location.href = d.url;
    setPurchasing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={recipe.recipeImage} alt={recipe.recipeName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="max-w-4xl mx-auto">
            <button onClick={()=>router.back()} className="text-white/80 hover:text-white mb-4 flex items-center gap-2"><ArrowLeft className="w-5 h-5" />Back</button>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{recipe.recipeName}</h1>
            <div className="flex flex-wrap gap-3 text-white/80">
              <span><ChefHat className="w-4 h-4 inline" /> {recipe.category}</span>
              <span><Globe className="w-4 h-4 inline" /> {recipe.cuisineType}</span>
              <span><Clock className="w-4 h-4 inline" /> {recipe.preparationTime}</span>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          <motion.button whileTap={{scale:0.95}} onClick={handleLike} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${liked ? "bg-red-50 text-red-500 border-2 border-red-200" : "bg-white text-slate-600 border-2 border-gray-200 dark:bg-slate-800 dark:border-slate-700"}`}>
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />{likes}</motion.button>
          <motion.button whileTap={{scale:0.95}} onClick={handleFavorite} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${favorited ? "bg-yellow-50 text-yellow-500 border-2 border-yellow-200" : "bg-white text-slate-600 border-2 border-gray-200 dark:bg-slate-800"}`}>
            <Bookmark className={`w-5 h-5 ${favorited ? "fill-current" : ""}`} />{favorited ? "Saved" : "Save"}</motion.button>
          {!hasPurchased ? (
            <motion.button whileTap={{scale:0.95}} onClick={handlePurchase} disabled={purchasing} className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50">
              <ShoppingCart className="w-5 h-5" />{purchasing ? "Processing..." : `Purchase - $${recipe.price>0 ? recipe.price : "4.99"}`}</motion.button>
          ) : (
            <span className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-50 text-green-600 font-medium border-2 border-green-200"><CheckCircle className="w-5 h-5" />Purchased</span>
          )}
          <motion.button whileTap={{scale:0.95}} onClick={()=>setShowReport(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white text-slate-600 border-2 border-gray-200 dark:bg-slate-800 hover:border-red-200 hover:text-red-500">
            <Flag className="w-5 h-5" />Report</motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">🥘 Ingredients</h2>
              <ul className="space-y-2">{recipe.ingredients?.map((ing,i)=><li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><span className="w-2 h-2 bg-primary-500 rounded-full" />{ing}</li>)}</ul>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">📝 Instructions</h2>
              <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">{recipe.instructions}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 h-fit">
            <h3 className="font-semibold mb-4">Quick Info</h3>
            {[{label:"Difficulty",value:recipe.difficultyLevel,icon:"🔥"},{label:"Category",value:recipe.category,icon:"📂"},{label:"Cuisine",value:recipe.cuisineType,icon:"🌍"},{label:"Time",value:recipe.preparationTime,icon:"⏱️"}].map(item=>(
              <div key={item.label} className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700 last:border-0">
                <span className="text-sm text-slate-500">{item.icon} {item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReportModal isOpen={showReport} onClose={()=>setShowReport(false)} recipeId={recipe._id} />
    </div>
  );
}