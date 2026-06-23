"use client";
import { Users, FileText, Crown, AlertTriangle } from "lucide-react";

export default function AdminDashboardClient({ stats }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[{label:"Total Users",value:stats.totalUsers,icon:Users,color:"blue"},{label:"Total Recipes",value:stats.totalRecipes,icon:FileText,color:"green"},{label:"Premium Members",value:stats.premiumUsers,icon:Crown,color:"yellow"},{label:"Pending Reports",value:stats.totalReports,icon:AlertTriangle,color:"red"}].map(s=>(
          <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-l-4" style={{borderColor:s.color}}>
            <div className="text-3xl font-bold mb-1">{s.value}</div><div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}