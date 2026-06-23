"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboard, UtensilsCrossed, PlusCircle, Heart, ShoppingBag, User, Users, FileText, Flag, LogOut, Menu, Crown } from "lucide-react";
import { useState } from "react";

export default function DashboardSidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isAdminPage = pathname.startsWith("/dashboard/admin");

  const links = isAdminPage
    ? [
        { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/admin/users", label: "Users", icon: Users },
        { href: "/dashboard/admin/recipes", label: "Recipes", icon: FileText },
        { href: "/dashboard/admin/reports", label: "Reports", icon: Flag },
        { href: "/dashboard/admin/transactions", label: "Transactions", icon: ShoppingBag },
      ]
    : [
        { href: "/dashboard/user", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/user/my-recipes", label: "My Recipes", icon: UtensilsCrossed },
        { href: "/dashboard/user/add-recipe", label: "Add Recipe", icon: PlusCircle },
        { href: "/dashboard/user/favorites", label: "Favorites", icon: Heart },
        { href: "/dashboard/user/purchased", label: "Purchased", icon: ShoppingBag },
        { href: "/dashboard/user/profile", label: "Profile", icon: User },
      ];

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 w-64 h-screen bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 transform transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="font-bold text-lg">{isAdminPage ? "Admin" : "User"} Dashboard</h2>
          <p className="text-sm text-slate-400 truncate">{user.name}</p>
          {user.isPremium && (
            <span className="flex items-center gap-1 text-xs text-yellow-500 font-medium mt-1">
              <Crown className="w-3 h-3" />Premium
            </span>
          )}
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-8rem)]">
          {links.map(l => {
            const Icon = l.icon;
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${active ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600" : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"}`}
              >
                <Icon className="w-5 h-5" />{l.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-slate-700">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
          >
            <LogOut className="w-5 h-5" />Sign Out
          </button>
        </div>
      </aside>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}