"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ added
import { fetchMenu } from "../../../lib/shopify";
import { ShoppingCart, Search } from "lucide-react";

export function Navbar() {
  const [menuItems, setMenuItems] = useState([]);
  const pathname = usePathname(); // ✅ added

  useEffect(() => {
    async function getMenu() {
      const items = await fetchMenu();
      setMenuItems(items);
    }
    getMenu();
  }, []);

  return (
    <header className="bg-neutral-50 border-b py-3">
      <div className="container mx-auto flex items-center justify-between px-8 lg:py-4 lg:px-16">
        {/* Left: Logo */}
        <div>
          <img
            src="/Black_Wordmark.svg"
            alt="Grumpy Grampa Logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Center: Menu */}
        <nav className="bg-neutral-200 rounded-full px-4 py-3 shadow-sm">
          <ul className="flex items-center gap-6 text-sm font-medium text-neutral-950">
            {menuItems.map((item) => {
              // ✅ check if current path matches link
              const cleanUrl = item.url.replace(/^https?:\/\/[^/]+/, "");
              const isActive = pathname === cleanUrl;

              return (
                <li key={item.id}>
                  <a
                    href={item.url}
                    className={`px-3 py-1 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-neutral-950 text-neutral-50"
                        : "hover:bg-neutral-900 hover:text-white"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center gap-5 text-sm font-medium">
          <button className="hover:text-neutral-900 text-neutral-950 transition">
            <Search size={18} />
          </button>

          <button className="relative text-yellow-500 hover:text-neutral-950 transition">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-neutral-950 text-neutral-50 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
              4
            </span>
          </button>

          <a href="/account" className="text-neutral-950 transition">
            Sign In
          </a>
        </div>
      </div>
    </header>
  );
}
