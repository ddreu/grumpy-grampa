"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  ChevronDown,
  Star,
  Shirt,
  Palette,
  Watch,
  Armchair,
} from "lucide-react";

import { navItems } from "@/data/NavItems";
import CartIcon from "@/components/icons/Cart";
import Link from "next/link";
import SearchOverlay from "@/components/SearchOverlay";
import { useCart } from "@/context/CartContext";
import { fetchCollectionsByGroup } from "@/lib/shopify";

export function Navbar({ buttonLabel, buttonHref }) {
  const pathname = usePathname();
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownGroups, setDropdownGroups] = useState([]);

  const { cart } = useCart();
  const count =
    cart?.lines?.edges?.reduce((sum, line) => sum + line.node.quantity, 0) || 0;

  const groupIcons = {
    Grandparents: <Shirt className="w-4 h-4" />,
    Theme: <Palette className="w-4 h-4" />,
    Accessories: <Watch className="w-4 h-4" />,
    "Home & Living": <Armchair className="w-4 h-4" />,
    Featured: <Star className="w-4 h-4" />,
  };
  function isNavItemActive(item, pathname) {
    if (item.url === "/") return pathname === "/";
    if (item.title === "Shop") {
      return (
        pathname.startsWith("/Shop") ||
        pathname.startsWith("/Product") ||
        pathname.startsWith("/Cart") ||
        pathname.startsWith("/Checkout")
      );
    }
    return pathname.startsWith(item.url);
  }

  // Fetch Shopify groups dynamically
  useEffect(() => {
    async function loadGroups() {
      try {
        const groups = await fetchCollectionsByGroup();
        const formatted = Object.keys(groups).map((groupName) => ({
          title: groupName,
          tabs: groups[groupName].map((c) => c.title),
          icon: groupIcons[groupName] || null, // now works
        }));
        setDropdownGroups(formatted);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    }
    loadGroups();
  }, []);

  return (
    <header className="py-3 px-4">
      <div className="container mx-auto z-20 flex items-center justify-between px-8 lg:py-4 lg:px-22">
        {/* Logo */}
        <div>
          <img
            src="/Black_Wordmark.svg"
            alt="Grumpy Grampa Logo"
            className="h-9 w-auto object-contain"
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
                      {dropdownGroups.map((group) => (
                        <li key={group.title}>
                          <Link
                            href={`/Shop/${encodeURIComponent(
                              group.title
                            )}?title=${encodeURIComponent(
                              group.title
                            )}&tabs=${encodeURIComponent(
                              group.tabs.join(",")
                            )}`}
                            className="flex items-center gap-3 px-5 py-2 text-sm text-neutral-900 hover:bg-neutral-900 hover:text-white transition"
                          >
                            {group.icon}
                            {group.title}
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
        <div className="flex items-center gap-7 text-sm font-medium">
          <button
            className="hover:text-neutral-900 cursor-pointer text-neutral-950 transition"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={22} />
          </button>

          <Link
            href="/Cart"
            className="relative hover:text-neutral-950 transition"
          >
            <CartIcon size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-neutral-950 text-neutral-50 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* <Link
            href="/Sign-in"
            className="text-neutral-950 text-[1.1rem] font-medium transition hover:text-neutral-900"
          >
            Sign In
          </Link> */}
          {buttonLabel && buttonHref ? (
            <Link
              href={buttonHref}
              className="text-neutral-950 text-[1.1rem] font-medium transition hover:text-neutral-900"
            >
              {buttonLabel}
            </Link>
          ) : (
            <Link
              href="/Sign-in"
              className="text-neutral-950 text-[1.1rem] font-medium transition hover:text-neutral-900"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
