"use client";
import Link from "next/link";

export default function ShopDropdown({
  dropdownGroups,
  shopOpen,
  setShopOpen,
}) {
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 top-[100%] mt-6 w-[1100px] bg-white shadow-2xl px-12 py-10 transition-all duration-300 ${
        shopOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-3"
      }`}
      style={{ position: "fixed", top: "80px", zIndex: 30 }}
      onMouseEnter={() => setShopOpen(true)}
      onMouseLeave={() => setShopOpen(false)}
    >
      <div className="grid grid-cols-5 gap-10 max-w-[1100px] mx-auto">
        {dropdownGroups.map((group) => (
          <div key={group.title} className="flex flex-col space-y-5">
            <Link
              href={`/Shop/${encodeURIComponent(
                group.title
              )}?title=${encodeURIComponent(
                group.title
              )}&collection=${encodeURIComponent(group.tabs[0])}`}
              className="block text-lg font-semibold text-neutral-900 hover:text-neutral-700 transition"
            >
              {group.title}
            </Link>
            <ul className="space-y-2">
              {group.tabs.map((category) => (
                <li key={category}>
                  <Link
                    href={`/Shop/${encodeURIComponent(
                      group.title
                    )}?title=${encodeURIComponent(
                      group.title
                    )}&collection=${encodeURIComponent(
                      category
                    )}&tabs=${encodeURIComponent(group.tabs.join(","))}`}
                    className="text-[15px] text-neutral-700 hover:text-neutral-950 transition"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
