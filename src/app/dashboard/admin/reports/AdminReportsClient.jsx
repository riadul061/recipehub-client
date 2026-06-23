"use client";
import { useState } from "react";
import { AlertTriangle, CheckCircle, Trash2, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminReportsClient({ reports: initial }) {
  const [reports, setReports] = useState(initial);

  const getToken = async () => {
    const res = await fetch("/api/auth/token", { credentials: "include" });
    const data = await res.json();
    return data?.token || null;
  };

  const handleAction = async (id, action) => {
    const token = await getToken();
    if (!token) return toast.error("Session expired");
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ action }),
    });
    if (res.ok) { toast.success("Done!"); setReports(reports.filter(r => r._id !== id)); }
    else toast.error("Failed");
  };

  if (reports.length === 0) return (
    <div className="text-center py-10">
      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
      <p className="text-slate-500">No pending reports!</p>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Recipe Reports</h1>
      <div className="space-y-4">
        {reports.map(r => (
          <div key={r._id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${r.reason === "Spam" ? "bg-yellow-50" : r.reason === "Offensive Content" ? "bg-red-50" : "bg-orange-50"}`}>
                <AlertTriangle className={`w-6 h-6 ${r.reason === "Spam" ? "text-yellow-500" : r.reason === "Offensive Content" ? "text-red-500" : "text-orange-500"}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">
                  {r.reason}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 ${r.status === "pending" ? "bg-yellow-100 text-yellow-600" : r.status === "dismissed" ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-600"}`}>
                    {r.status}
                  </span>
                </h3>
                <p className="text-sm text-slate-500">Reported by: {r.reporterEmail}</p>
                {r.recipeId && <p className="text-sm text-slate-500 mb-3">Recipe: <span className="font-medium">{r.recipeId.recipeName}</span></p>}
                {r.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handleAction(r._id, "dismiss")} className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100">
                      <XCircle className="w-4 h-4" />Dismiss
                    </button>
                    <button onClick={() => handleAction(r._id, "remove_recipe")} className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600">
                      <Trash2 className="w-4 h-4" />Remove Recipe
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}