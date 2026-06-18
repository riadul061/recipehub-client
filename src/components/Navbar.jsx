"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { Sun, Moon, ChefHat, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (pathname.includes("/dashboard")) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-primary-500" />
          <span className="text-xl font-bold text-primary-600">RecipeHub</span>
        </Link>
        <ul className="hidden md:flex items-center gap-6">
          <li><Link href="/" className={`font-medium ${pathname === "/" ? "text-primary-500" : "text-slate-600 dark:text-slate-300"}`}>Home</Link></li>
          <li><Link href="/recipes" className={`font-medium ${pathname === "/recipes" ? "text-primary-500" : "text-slate-600 dark:text-slate-300"}`}>Browse Recipes</Link></li>
          {mounted && <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700">{theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>}
          {user ? (
            <Dropdown>
              <Dropdown.Trigger className="rounded-full"><Avatar size="sm"><Avatar.Image referrerPolicy="no-referrer" alt={user.name} src={user.image} /><Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback></Avatar></Dropdown.Trigger>
              <Dropdown.Popover>
                <div className="px-3 pt-3 pb-1"><p className="text-sm font-medium">{user.name}</p><p className="text-xs text-slate-400">{user.email}</p></div>
                <Dropdown.Menu onAction={async (key) => { if (key === "logout") await authClient.signOut(); }}>
                  <Dropdown.Item id="dashboard" textValue="Dashboard"><Link href={`/dashboard/${user.role === "admin" ? "admin" : "user"}`}><Label>Dashboard</Label></Link></Dropdown.Item>
                  <Dropdown.Item id="logout" textValue="Logout" variant="danger"><Label>Logout</Label></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-primary-500">Login</Link>
              <Link href="/register"><Button size="sm" color="primary">Sign Up</Button></Link>
            </div>
          )}
        </ul>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 md:hidden">
          <ul className="flex flex-col p-4 gap-3">
            <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link href="/recipes" onClick={() => setMenuOpen(false)}>Browse Recipes</Link></li>
            {user ? (
              <><li><Link href={`/dashboard/${user.role === "admin" ? "admin" : "user"}`} onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
              <li><button onClick={() => authClient.signOut()} className="text-red-500 text-left">Logout</button></li></>
            ) : (
              <><li><Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link href="/register" onClick={() => setMenuOpen(false)}>Sign Up</Link></li></>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}