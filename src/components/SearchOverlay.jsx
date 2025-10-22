"use client";

import { X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewsletterSection from "./home-layout/Newsletter";
import Footer from "./Footer/Footer";
import { useRouter } from "next/navigation";
import { Product } from "./Products/Product-List";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/Products?query=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-neutral-50 overflow-y-auto"
        >
          {/* Search box */}
          <motion.div
            key="search-box"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-6xl mt-6 px-4"
          >
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-neutral-300 bg-white rounded-4xl py-2 pl-12 pr-12 text-lg text-neutral-950 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-800 transition-all"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-700 hover:text-neutral-500 transition"
              >
                <X size={22} />
              </button>
            </form>

            {/* Default suggestions if no input */}
            {query.trim().length === 0 && (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.25 }}
                className="mt-3 rounded-2xl border border-neutral-200 bg-white px-6 py-5 text-neutral-900 shadow-sm"
              >
                <ul className="space-y-3 text-[15px]">
                  {[
                    "Best Gifts for Grumpy Grandpas",
                    "Funny Mugs for Opinionated Elders",
                    "Rocking Chairs That Don’t Rock (Much)",
                    "T-Shirts That Say “Back in My Day...”",
                    "Cozy Cardigans for Cold Living Rooms",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 6 }}
                      className="flex items-center gap-2 cursor-pointer text-neutral-800 hover:text-neutral-600 transition"
                    >
                      <Search size={15} className="text-neutral-500" /> {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>

          {/* Live product results appear instantly when typing */}
          {query.trim().length > 0 && (
            <div className="w-full max-w-7xl">
              <Product query={query} />
            </div>
          )}

          {/* Footer section */}
          <motion.div
            key="newsletter-footer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full mt-100 flex flex-col gap-16"
          >
            <NewsletterSection />
            <Footer />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
