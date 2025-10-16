"use client";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar() {
  return (
    <section className="relative mt-8 max-w-7xl mx-auto bg-black text-white rounded-3xl overflow-hidden flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/lines.svg')] bg-cover bg-center opacity-20 pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Top Badge */}
      <div className="relative z-10 border border-neutral-200 rounded-full px-4 py-1 text-sm mb-4">
        Shop
      </div>

      {/* Heading */}
      <h2 className="relative z-10 text-3xl md:text-5xl font-extrabold mb-3">
        Shop Like a Grampa, Gift Like a Legend
      </h2>

      {/* Subtext */}
      <p className="relative z-10 text-sm md:text-base text-gray-300 mb-8">
        Bold, cozy, and just the right amount of cranky.
      </p>

      {/* Search Input */}
      <div className="relative z-10 flex items-center bg-white text-gray-700 rounded-full shadow-lg w-full max-w-lg px-5 py-3">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search product here..."
          className="flex-1 bg-transparent outline-none placeholder-gray-400 text-base"
        />
        <button className="text-gray-500 hover:text-black transition">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
