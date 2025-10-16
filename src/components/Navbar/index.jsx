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
import Link from "next/link";

export function Navbar() {
  const pathname = usePathname();
  const [shopOpen, setShopOpen] = useState(false);

  function isNavItemActive(item, pathname) {
    if (item.url === "/") return pathname === "/";
    if (item.title === "Shop") {
      return pathname.startsWith("/Shop") || pathname.startsWith("/Product");
    }
    return pathname.startsWith(item.url);
  }

  const dropdownCategories = [
    {
      title: "Grandparents",
      icon: <Shirt className="w-4 h-4" />,
      tabs: ["Grampa", "Gramma"],
    },
    {
      title: "Theme",
      icon: <Palette className="w-4 h-4" />,
      tabs: ["Typography", "Graphical", "Minimalistic"],
    },
    {
      title: "Accessories",
      icon: <Watch className="w-4 h-4" />,
      tabs: ["Socks", "Hats", "Bags"],
    },
    {
      title: "Home & Living",
      icon: <Armchair className="w-4 h-4" />,
      tabs: ["Mugs", "Postcards", "Journals"],
    },
    {
      title: "Featured",
      icon: <Star className="w-4 h-4" />,
      tabs: ["New Arrivals", "Best Sellers", "Sales"],
    },
  ];

  return (
    <header className="py-3">
      <div className="container mx-auto z-20 flex items-center justify-between px-8 lg:py-4 lg:px-22">
        {/* Logo */}
        <div>
          <img
            src="/Black_Wordmark.svg"
            alt="Grumpy Grampa Logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="bg-neutral-200 rounded-full px-5 py-3 shadow-sm">
          <ul className="flex items-center gap-3 text-sm font-medium text-neutral-950">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item, pathname);
              return (
                <li key={item.title} className="relative group">
                  <Link
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
                  </Link>

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
                      {dropdownCategories.map((category) => (
                        <li key={category.title}>
                          <Link
                            href={`/Shop/${encodeURIComponent(
                              category.title
                            )}?title=${encodeURIComponent(
                              category.title
                            )}&tabs=${encodeURIComponent(
                              category.tabs.join(",")
                            )}`}
                            className="flex items-center gap-3 px-5 py-2 text-sm text-neutral-900 hover:bg-neutral-900 hover:text-white transition"
                          >
                            {category.icon}
                            {category.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-5 text-sm font-medium">
          <button className="hover:text-neutral-900 cursor-pointer text-neutral-950 transition">
            <Search size={18} />
          </button>
          <button className="relative hover:text-neutral-950 transition">
            <CartIcon size={20} />
            <span className="absolute -top-2 -right-2 bg-neutral-950 text-neutral-50 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
              4
            </span>
          </button>
          <Link
            href="/account"
            className="text-neutral-950 transition hover:text-neutral-900"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
