"use client";
import { useState } from "react";
import { Crown, Ban, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminUsersClient({ users: initial }) {
  const [users, setUsers] = useState(initial);

  const handleToggle = async (id, blocked) => {
    const token = await getTokenClient();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${id}/toggle-block`, { method: "PUT", headers: { "Content-Type":"application/json", authorization: `Bearer ${token}` }, body: JSON.stringify({ isBlocked: !blocked }) });
    if (res.ok) { setUsers(users.map(u => u._id === id ? { ...u, isBlocked: !blocked } : u)); toast.success(blocked ? "Unblocked" : "Blocked"); }
    else toast.error("Failed");
  };

  const getTokenClient = async () => {
    const { data } = await fetch("/api/auth/get-session", { credentials: "include" }).then(r=>r.json());
    return data?.session?.token;
  };

  return (
    <div><h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-md">
          <thead className="bg-gray-50 dark:bg-slate-700"><tr><th className="text-left p-4 font-semibold text-sm">User</th><th className="text-left p-4 font-semibold text-sm">Email</th><th className="text-left p-4 font-semibold text-sm">Role</th><th className="text-left p-4 font-semibold text-sm">Status</th><th className="text-left p-4 font-semibold text-sm">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {users.map(u => (
              <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="p-4"><div className="flex items-center gap-3"><img src={u.image || `https://ui-avatars.com/api/?name=${u.name}&background=ec4899&color=fff&size=40`} className="w-10 h-10 rounded-full" /><span className="font-medium">{u.name}</span>{u.isPremium && <Crown className="w-4 h-4 text-yellow-500" />}</div></td>
                <td className="p-4 text-sm text-slate-500">{u.email}</td>
                <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${u.role === "admin" ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-600"}`}>{u.role}</span></td>
                <td className="p-4"><span className={`flex items-center gap-1 text-xs font-medium ${u.isBlocked ? "text-red-500" : "text-green-500"}`}>{u.isBlocked ? <><Ban className="w-3 h-3" />Blocked</> : <><CheckCircle className="w-3 h-3" />Active</>}</span></td>
                <td className="p-4"><button onClick={()=>handleToggle(u._id, u.isBlocked)} className={`text-sm px-3 py-1.5 rounded-lg font-medium ${u.isBlocked ? "bg-green-100 text-green-600 hover:bg-green-200" : "bg-red-100 text-red-600 hover:bg-red-200"}`}>{u.isBlocked ? "Unblock" : "Block"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}