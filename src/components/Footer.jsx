import Link from "next/link";
import { ChefHat, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold text-white">RecipeHub</span>
            </Link>
            <p className="text-sm text-slate-400">Discover, share, and savor the world&apos;s best recipes.</p>
            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-primary-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home",     href: "/" },
                { label: "Browse",   href: "/recipes" },
                { label: "Login",    href: "/login" },
                { label: "Register", href: "/register" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-primary-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">For Users</h3>
            <ul className="space-y-3">
              {[
                { label: "Dashboard",  href: "/dashboard/user" },
                { label: "Add Recipe", href: "/dashboard/user/add-recipe" },
                { label: "Favorites",  href: "/dashboard/user/favorites" },
                { label: "Premium",    href: "/dashboard/user/premium" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-primary-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary-400" />
                support@recipehub.com
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary-400" />
                123 Culinary St, Food City
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-500">© {year} RecipeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}