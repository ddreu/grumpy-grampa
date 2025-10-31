"use client";

import { X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileMenu({
  navItems,
  dropdownGroups,
  isOpen,
  onClose,
}) {
  const [shopOpen, setShopOpen] = useState(false);

  // 🔒 Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up just in case
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-neutral-100 shadow-xl p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <img
            src="/Black_Wordmark.svg"
            alt="Grumpy Grampa Logo"
            className="h-7"
          />
          <button onClick={onClose} className="text-neutral-900">
            <X size={24} />
          </button>
        </div>

        {/* Menu Links */}
        <ul className="flex flex-col gap-3 text-lg font-medium text-neutral-950">
          {navItems.map((item) => (
            <li key={item.title}>
              {!item.dropdown ? (
                <Link
                  href={item.url}
                  onClick={onClose}
                  className="block px-2 py-2 rounded-md hover:bg-neutral-200 transition"
                >
                  {item.title}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => setShopOpen(!shopOpen)}
                    className="w-full flex justify-between items-center px-2 py-2 rounded-md hover:bg-neutral-200 transition"
                  >
                    {item.title}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        shopOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {shopOpen && (
                    <ul className="pl-4 mt-1 flex flex-col gap-2">
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
                            className="block text-sm px-2 py-1 text-neutral-700 hover:bg-neutral-300 rounded transition"
                            onClick={onClose}
                          >
                            {group.icon}
                            {group.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}

          <li className="mt-4">
            <Link
              href="/Sign-in"
              className="block text-center w-full bg-neutral-950 text-white rounded-full py-2 hover:bg-neutral-800 transition"
              onClick={onClose}
            >
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
