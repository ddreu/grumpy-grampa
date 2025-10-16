"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  ChevronDown,
  Shirt,
  Palette,
  Watch,
  Armchair,
  Star,
} from "lucide-react";
import { navItems } from "@/data/NavItems";
import CartIcon from "@/components/icons/Cart";

export function Navbar() {
  const pathname = usePathname();
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="py-3">
      <div className="container mx-auto z-20 flex items-center justify-between px-8 lg:py-4 lg:px-22">
        {/* Left: Logo */}
        <div>
          <img
            src="/Black_Wordmark.svg"
            alt="Grumpy Grampa Logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Center: Navigation Menu */}
        <nav className="bg-neutral-200 rounded-full px-5 py-3 shadow-sm">
          <ul className="flex items-center gap-3 text-sm font-medium text-neutral-950">
            {navItems.map((item) => {
              const isActive =
                pathname === item.url ||
                (pathname.startsWith(item.url) && item.url !== "/");

              return (
                <li key={item.title} className="relative group">
                  <a
                    href={item.url}
                    className={`px-3 py-2 rounded-full flex items-center gap-1 transition-all duration-200 ${
                      isActive
                        ? "bg-neutral-950 text-neutral-50"
                        : "hover:bg-neutral-900 hover:text-white"
                    }`}
                    onMouseEnter={() => item.dropdown && setShopOpen(true)}
                    onMouseLeave={() => item.dropdown && setShopOpen(false)}
                  >
                    {item.title}
                    {item.dropdown && (
                      <ChevronDown size={14} className="ml-1" />
                    )}
                  </a>

                  {/* Shop Dropdown */}
                  {item.dropdown && (
                    <ul
                      className={`absolute z-20 left-1/2 w-50 -translate-x-1/2 top-full mt-2 bg-neutral-50 shadow-md rounded-xl overflow-hidden transition-all duration-300 ${
                        shopOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible translate-y-2"
                      }`}
                      onMouseEnter={() => setShopOpen(true)}
                      onMouseLeave={() => setShopOpen(false)}
                    >
                      <li>
                        <a
                          href="/Shop/"
                          className="flex items-center gap-3 px-5 py-2 text-sm text-neutral-900 hover:bg-neutral-900 hover:text-white transition"
                        >
                          <Shirt className="w-4 h-4" />
                          Grandparents
                        </a>
                      </li>
                      <li>
                        <a
                          href="/shop/Theme"
                          className="flex items-center gap-3 px-5 py-2 text-sm text-neutral-900 hover:bg-neutral-900 hover:text-white transition"
                        >
                          <Palette className="w-4 h-4" />
                          Theme
                        </a>
                      </li>
                      <li>
                        <a
                          href="/shop/accessories"
                          className="flex items-center gap-3 px-5 py-2 text-sm text-neutral-900 hover:bg-neutral-900 hover:text-white transition"
                        >
                          <Watch className="w-4 h-4" />
                          Accessories
                        </a>
                      </li>
                      <li>
                        <a
                          href="/shop/Home&Living"
                          className="flex items-center gap-3 px-5 py-2 text-sm text-neutral-900 hover:bg-neutral-900 hover:text-white transition"
                        >
                          <Armchair className="w-4 h-4" />
                          Home & Living
                        </a>
                      </li>
                      <li>
                        <a
                          href="/shop/Featured"
                          className="flex items-center gap-3 px-5 py-2 text-sm text-neutral-900 hover:bg-neutral-900 hover:text-white transition"
                        >
                          <Star className="w-4 h-4" />
                          Featured
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center gap-5 text-sm font-medium">
          <button className="hover:text-neutral-900 cursor-pointer text-neutral-950 transition">
            <Search size={18} />
          </button>

          <button className="relative hover:text-neutral-950 transition">
            {/* Gradient cart icon */}
            <CartIcon size={20} />

            <span className="absolute -top-2 -right-2 bg-neutral-950 text-neutral-50 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
              4
            </span>
          </button>

          <a
            href="/account"
            className="text-neutral-950 transition hover:text-neutral-900"
          >
            Sign In
          </a>
        </div>
      </div>
    </header>
  );
}
