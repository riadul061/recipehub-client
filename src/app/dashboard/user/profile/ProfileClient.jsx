"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User, Mail, Crown, Camera } from "lucide-react";

export default function ProfileClient({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await authClient.updateUser({ name, image });
      toast.success("Profile updated!");
      router.refresh();
    } catch { toast.error("Failed"); }
    setUpdating(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <img src={image || `https://ui-avatars.com/api/?name=${user.name}&background=ec4899&color=fff&size=100`} alt={user.name} className="w-20 h-20 rounded-full object-cover border-4 border-primary-200" />
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-slate-500">{user.email}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block mt-1 ${user.isPremium ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600"}`}>{user.isPremium ? <><Crown className="w-3 h-3 inline" /> Premium</> : "Free"}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Name</label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input type="text" value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700" /></div></div>
          <div><label className="block text-sm font-medium mb-1">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input type="email" value={user.email} disabled className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 opacity-60 cursor-not-allowed" /></div></div>
          <div><label className="block text-sm font-medium mb-1">Profile Image URL</label><input type="text" value={image} onChange={e=>setImage(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700" placeholder="https://example.com/avatar.jpg" /></div>
          <button type="submit" disabled={updating} className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50">{updating?"Saving...":"Update Profile"}</button>
        </form>
      </div>
    </div>
  );
}