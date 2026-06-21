"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { imageUpload } from "@/lib/imgUpload";
import { addRecipe } from "@/lib/action/recipes";
import toast from "react-hot-toast";
import { Upload, Plus, X } from "lucide-react";

const categories = ["Breakfast","Lunch","Dinner","Dessert","Appetizer","Snack","Soup","Salad","Beverage","Bread","Pasta"];
const cuisines = ["Italian","Mexican","Chinese","Indian","Japanese","Thai","French","American","Mediterranean","Korean","Vietnamese","Middle Eastern"];
const difficulties = ["Easy","Medium","Hard"];

export default function AddRecipeClient({ user, recipeCount }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ recipeName:"", recipeImage:"", category:"", cuisineType:"", difficultyLevel:"", preparationTime:"", ingredients:[""], instructions:"", price:"0" });

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});
  const handleIng = (i, v) => { const u = [...form.ingredients]; u[i] = v; setForm({...form, ingredients: u}); };
  const addIng = () => setForm({...form, ingredients: [...form.ingredients, ""]});
  const remIng = (i) => { if (form.ingredients.length > 1) setForm({...form, ingredients: form.ingredients.filter((_,idx) => idx !== i)}); };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2*1024*1024) return toast.error("Image must be < 2MB");
    setUploading(true);
    const data = await imageUpload(file);
    if (data?.url) { setForm({...form, recipeImage: data.url}); toast.success("Image uploaded!"); }
    else toast.error("Upload failed");
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.recipeName || !form.category || !form.cuisineType || !form.difficultyLevel || !form.preparationTime || !form.instructions)
      return toast.error("Fill all required fields");
    if (!form.recipeImage) return toast.error("Upload an image");
    const valid = form.ingredients.filter(i => i.trim());
    if (valid.length === 0) return toast.error("Add at least one ingredient");
    setSubmitting(true);
    const res = await addRecipe({...form, ingredients: valid, price: parseFloat(form.price) || 0});
    if (res.error) toast.error(res.error);
    else { toast.success("Recipe created!"); router.push("/dashboard/user/my-recipes"); }
    setSubmitting(false);
  };

  if (!user.isPremium && recipeCount >= 2) {
    return <div className="text-center py-10"><div className="text-6xl mb-4">🔒</div><h2 className="text-xl font-bold mb-2">Limit Reached</h2><p className="text-slate-500 mb-4">Upgrade to premium for unlimited recipes</p><a href="/dashboard/user" className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold">Upgrade</a></div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Recipe Name</label><input type="text" name="recipeName" value={form.recipeName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700" placeholder="Recipe name" required /></div>
          <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Image</label>
            <div className="flex items-center gap-4">
              {form.recipeImage && <img src={form.recipeImage} className="w-24 h-24 object-cover rounded-lg" />}
              <label className={`flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 ${uploading?"opacity-50":""}`}>
                <Upload className="w-5 h-5 text-slate-400" /><span className="text-sm">{uploading?"Uploading...":"Upload Image"}</span>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" disabled={uploading} /></label></div></div>
          <div><label className="block text-sm font-medium mb-1">Category</label><select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"><option value="">Select</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div><label className="block text-sm font-medium mb-1">Cuisine</label><select name="cuisineType" value={form.cuisineType} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"><option value="">Select</option>{cuisines.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div><label className="block text-sm font-medium mb-1">Difficulty</label><select name="difficultyLevel" value={form.difficultyLevel} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"><option value="">Select</option>{difficulties.map(d=><option key={d} value={d}>{d}</option>)}</select></div>
          <div><label className="block text-sm font-medium mb-1">Prep Time</label><input type="text" name="preparationTime" value={form.preparationTime} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700" placeholder="45 minutes" required /></div>
        </div>
        <div><label className="block text-sm font-medium mb-2">Ingredients</label>
          {form.ingredients.map((ing,i)=>(
            <div key={i} className="flex items-center gap-2 mb-2">
              <input type="text" value={ing} onChange={e=>handleIng(i,e.target.value)} className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700" placeholder="2 cups flour" />
              <button type="button" onClick={()=>remIng(i)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
          ))}
          <button type="button" onClick={addIng} className="text-sm text-primary-500 font-medium flex items-center gap-1"><Plus className="w-4 h-4" />Add ingredient</button>
        </div>
        <div><label className="block text-sm font-medium mb-1">Instructions</label><textarea name="instructions" value={form.instructions} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[150px] resize-y" required /></div>
        <button type="submit" disabled={submitting||uploading} className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50">{submitting?"Publishing...":"Publish Recipe"}</button>
      </form>
    </div>
  );
}