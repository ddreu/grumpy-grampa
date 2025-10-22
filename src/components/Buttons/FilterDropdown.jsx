"use client";
import { useRef, useEffect, useState } from "react";

export default function FilterDropdown({
  open,
  onClose,
  groups = [],
  groupedCollections = {},
  selectedGroup,
  onGroupChange,
}) {
  const dropdownRef = useRef(null);
  const [collections, setCollections] = useState([]);

  const hasSelectedGroup =
    selectedGroup &&
    selectedGroup !== "All" &&
    groupedCollections[selectedGroup];

  useEffect(() => {
    if (selectedGroup && groupedCollections[selectedGroup]) {
      setCollections(groupedCollections[selectedGroup]);
    } else if (selectedGroup === "All" || !selectedGroup) {
      setCollections(Object.values(groupedCollections).flat());
    }
  }, [selectedGroup, groupedCollections]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200 z-50 p-4 text-sm"
    >
      {/* If a group is selected → show collections */}
      {hasSelectedGroup ? (
        <>
          <h3 className="text-xs text-left font-bold mb-1 uppercase text-gray-700">
            Filter By Shop
          </h3>
          <div className="flex flex-col gap-1">
            {(groupedCollections[selectedGroup] || []).map((col) => (
              <label
                key={col.id}
                className="flex justify-between items-center py-1"
              >
                <span>{col.title}</span>
              </label>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xs text-left font-bold mb-1 uppercase text-gray-700">
            Shop By Categories
          </h3>
          <div className="flex flex-col gap-1">
            {groups.map((g) => (
              <button
                key={g.name}
                onClick={() => onGroupChange(g.name)}
                className="text-left hover:text-black"
              >
                {g.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ⭐ Filter By Reviews */}
      <div className="mt-4 mb-4">
        <h3 className="text-xs text-left font-bold text-gray-700 mb-1 uppercase">
          Filter By Reviews
        </h3>
        <div className="flex flex-col gap-3">
          {[
            "All",
            "5.0 Stars",
            "4.0 - 4.9 Stars",
            "3.0 - 3.9 Stars",
            "2.0 - 2.9 Stars",
            "1.0 - 1.9 Stars",
          ].map((label, i) => (
            <label
              key={i}
              className="flex items-center gap-2 text-sm text-gray-800"
            >
              <input
                type="checkbox"
                defaultChecked={label === "All"}
                className="accent-gray-800 w-4 h-4"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* 📦 Filter By Stocks */}
      <div className="mb-4">
        <h3 className="text-xs text-left font-bold text-gray-700 mb-1 uppercase">
          Filter By Stocks
        </h3>
        <input
          type="number"
          placeholder="No. of Stocks"
          className="w-full border border-gray-300 rounded-md p-1.5 text-sm"
        />
      </div>

      {/* 💰 Filter By Price */}
      <div className="mb-4">
        <h3 className="text-xs text-left font-bold text-gray-700 mb-1 uppercase">
          Filter By Price
        </h3>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-left text-gray-700">
            Min Price
            <input
              type="number"
              placeholder="Min (USD)"
              className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
            />
          </label>
          <label className="text-sm text-left text-gray-700">
            Max Price
            <input
              type="number"
              placeholder="Max (USD)"
              className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
            />
          </label>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-black text-white py-1.5 rounded-md font-medium hover:bg-gray-800 transition text-sm"
      >
        Apply
      </button>
    </div>
  );
}
