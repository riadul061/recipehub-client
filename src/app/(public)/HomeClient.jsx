"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import RecipeCard from "@/components/RecipeCard";
import { ArrowRight, ChefHat, Heart, Search, Users, Sparkles, BookOpen, Share2 } from "lucide-react";

export default function HomeClient({ featured, popular }) {
  return (
    <div>
      {/* HERO */}
      <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden relative">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/50 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200/50 dark:bg-secondary-900/20 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="inline-block mb-6">
            <ChefHat className="w-20 h-20 text-primary-500 mx-auto" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 bg-clip-text text-transparent">Discover & Share</span>
            <br /><span className="text-slate-800 dark:text-white">Amazing Recipes</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">Join our community! Create, share, and explore thousands of delicious recipes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recipes" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-2 hover:from-primary-600 hover:to-primary-700 shadow-lg">
              <Search className="w-5 h-5" />Explore Recipes<ArrowRight className="w-5 h-5" /></Link>
            <Link href="/register" className="border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-2 hover:bg-primary-50">
              <Users className="w-5 h-5" />Join Now</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[{icon:BookOpen,label:"Recipes",value:"10,000+"},{icon:Users,label:"Users",value:"5,000+"},{icon:Heart,label:"Likes",value:"50,000+"},{icon:Share2,label:"Shares",value:"1,000+"}].map((s,i)=>(
              <motion.div key={s.label} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1+i*0.1}} className="text-center p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <s.icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FEATURED */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-12">
            <Sparkles className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <h2 className="text-3xl md:text-4xl font-bold">Featured Recipes</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((r,i)=><RecipeCard key={r._id} recipe={r} index={i} />)}
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-12">
            <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <h2 className="text-3xl md:text-4xl font-bold">Most Popular Recipes</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popular.map((r,i)=><RecipeCard key={r._id} recipe={r} index={i} />)}
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 1: Why Choose Us */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose RecipeHub?</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{icon:"🎨",title:"Create & Share",desc:"Share your culinary creations with the world."},{icon:"🔍",title:"Discover Flavors",desc:"Browse thousands of recipes from around the globe."},{icon:"⭐",title:"Premium Features",desc:"Unlock unlimited recipes & exclusive content."}].map((item,i)=>(
              <motion.div key={item.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.15}} whileHover={{y:-5}} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 text-center border border-gray-100 dark:border-slate-700">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 2: CTA */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-600">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="relative z-10 max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Culinary Journey?</h2>
          <p className="text-lg text-white/80 mb-8">Join thousands of food lovers sharing amazing recipes daily.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-primary-50">Get Started Free</Link>
            <Link href="/recipes" className="border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10">Browse Recipes</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}