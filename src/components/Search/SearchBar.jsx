"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import FilterDropdown from "../Buttons/FilterDropdown";
import { fetchCollectionsByGroup } from "@/lib/shopify";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const titleParam = searchParams.get("title"); // read ?title= from URL

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [groupTabs, setGroupTabs] = useState([]);
  const [groupedCollections, setGroupedCollections] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null); // default: no selection

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

        // Only set selectedGroup if titleParam exists AND matches a group
        if (titleParam && groups[titleParam]) {
          setSelectedGroup(titleParam);
        }
        // Otherwise leave selectedGroup null
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    }
    loadGroups();
  }, [titleParam]);

  return (
    <section className="relative mt-6 mb-8 max-w-7xl mx-auto bg-black text-white rounded-3xl flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/lines.svg')] bg-cover bg-center opacity-20 pointer-events-none"
        aria-hidden="true"
      />

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

        {/* Button + Dropdown wrapper */}
        <div className="relative ml-2">
          <button
            className="text-gray-500 hover:text-black transition"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {isFilterOpen && (
            <div className="absolute top-0 left-full ml-2 z-50">
              <FilterDropdown
                open={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                groups={groupTabs}
                groupedCollections={groupedCollections}
                selectedGroup={
                  titleParam && selectedGroup ? selectedGroup : null
                }
                onGroupChange={(group) => setSelectedGroup(group)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
