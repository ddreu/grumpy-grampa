"use client";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { fetchCollectionsByGroup } from "@/lib/shopify";
import ShopFilterDropdown from "../Buttons/ShopFilterDropdown";

export default function SearchBar({ query, onQueryChange, onFiltersApply }) {
  // props from Shop
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [groupTabs, setGroupTabs] = useState([]);
  const [groupedCollections, setGroupedCollections] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    async function loadGroups() {
      try {
        const groups = await fetchCollectionsByGroup();
        setGroupedCollections(groups);
        const tabsArray = Object.keys(groups).map((groupName) => ({
          name: groupName,
          icon: null,
        }));
        setGroupTabs(tabsArray);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    }
    loadGroups();
  }, []);

  return (
    <section className="relative mt-6 mb-8 max-w-7xl mx-5 sm:mx-auto bg-black text-white rounded-4xl sm:rounded-3xl flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="absolute inset-0 bg-[url('/lines.svg')] bg-cover bg-center opacity-20 pointer-events-none" />

      <div className="relative z-10 border border-neutral-200 rounded-full px-4 py-1 text-sm mb-4">
        Shop
      </div>

      <h2 className="relative z-10 text-3xl md:text-5xl font-extrabold mb-3">
        Shop Like a Grampa, Gift Like a Legend
      </h2>

      <p className="relative z-10 text-sm md:text-base text-gray-300 mb-8">
        Bold, cozy, and just the right amount of cranky.
      </p>

      {/* Controlled input */}
      <div className="relative z-10 flex items-center bg-white text-gray-700 rounded-full shadow-lg w-full max-w-lg px-5 py-3">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search product here..."
          value={query}
          onChange={(e) => onQueryChange?.(e.target.value)}
          className="flex-1 bg-transparent outline-none placeholder-gray-400 text-base"
        />

        <div className="relative ml-2">
          <button
            className="text-gray-500 hover:text-black transition"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            <SlidersHorizontal className="w-5 cursor-pointer h-5" />
          </button>

          {isFilterOpen && (
            <div className="absolute top-0 left-full ml-2 z-50">
              <ShopFilterDropdown
                open={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                groups={groupTabs}
                groupedCollections={groupedCollections}
                selectedGroup={selectedGroup}
                onGroupChange={(group) => setSelectedGroup(group)}
                onFiltersApply={(filters) => {
                  setIsFilterOpen(false);
                  // Pass filters upward to Shop page parent
                  onFiltersApply?.(filters);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
