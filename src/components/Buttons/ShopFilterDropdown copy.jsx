"use client";
import { useRef, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShopFilterDropdown({
  open,
  onClose,
  groups = [],
  groupedCollections = {},
  selectedCollection,
  onCollectionChange,
  onFiltersApply,
}) {
  const dropdownRef = useRef(null);

  // Local states
  const [selectedGroup, setSelectedGroup] = useState(null); // preview
  const [appliedGroup, setAppliedGroup] = useState(null); // applied
  const [selectedReview, setSelectedReview] = useState("All");
  const [stockThreshold, setStockThreshold] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCollection = searchParams.get("collection") || "All";

  useEffect(() => {
    setSelectedReview(searchParams.get("review") || "All");
    setStockThreshold(searchParams.get("stockThreshold") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSelectedGroup(searchParams.get("group") || null);
  }, [searchParams]);

  const handleApply = () => {
    if (!selectedGroup) return;

    const params = new URLSearchParams(searchParams);

    // Keep standard filters
    if (selectedReview && selectedReview !== "All")
      params.set("review", selectedReview);
    else params.delete("review");

    if (stockThreshold) params.set("stockThreshold", stockThreshold);
    else params.delete("stockThreshold");

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    // Now set up our new structure
    const title = selectedGroup;
    const tabs =
      groupedCollections[selectedGroup]?.map((col) => col.title).join(",") ||
      "";

    params.set("title", title);
    params.set("tabs", tabs);

    // Push to new dynamic route
    router.push(`/Shop/${encodeURIComponent(title)}?${params.toString()}`);

    onClose?.();
  };

  const handleCollectionChange = (collection) => {
    const params = new URLSearchParams(searchParams);
    params.set("collection", collection);
    router.push(
      `/Shop/${encodeURIComponent(selectedGroup || "All")}?${params.toString()}`
    );
    onCollectionChange?.(collection); // notify parent if needed
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    // Get values from URL
    const titleFromUrl = searchParams.get("title") || "All"; // default to All
    const tabsFromUrl = searchParams.get("tabs") || "";

    setSelectedGroup(titleFromUrl);
    setAppliedGroup(titleFromUrl !== "All" ? titleFromUrl : null);
    setSelectedReview(searchParams.get("review") || "All");
    setStockThreshold(searchParams.get("stockThreshold") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200 z-50 p-4 text-sm"
    >
      {/* Category selection */}
      {!appliedGroup && (
        <>
          <h3 className="text-xs text-left font-bold mb-1 uppercase text-gray-700">
            Shop By Categories
          </h3>
          <div className="flex flex-col gap-3">
            {/* "All" option */}
            <label className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGroup === "All" || !selectedGroup}
                onChange={() => setSelectedGroup("All")}
                className="accent-gray-800 w-4 h-4 cursor-pointer"
              />
              All
            </label>

            {/* Other groups */}
            {groups.map((g, i) => (
              <label
                key={i}
                className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedGroup === g.name}
                  onChange={() => setSelectedGroup(g.name)}
                  className="accent-gray-800 w-4 h-4 cursor-pointer"
                />
                {g.name}
              </label>
            ))}
          </div>
        </>
      )}

      {/* Filter By Shop (collections) */}
      {appliedGroup && (
        <>
          <h3 className="text-xs text-left font-bold mb-1 uppercase text-gray-700">
            Filter By Shop
          </h3>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleCollectionChange("All")}
              className="w-full flex justify-between items-center py-1 cursor-pointer text-left hover:text-black"
            >
              <span>All</span>
              {currentCollection === "All" && (
                <Check className="w-4 h-4 text-black" />
              )}
            </button>

            {(groupedCollections[appliedGroup] || []).map((col) => (
              <button
                key={col.id}
                onClick={() => handleCollectionChange(col.title)}
                className="w-full flex justify-between items-center py-1 cursor-pointer text-left hover:text-black"
              >
                <span>{col.title}</span>
                {currentCollection === col.title && (
                  <Check className="w-4 h-4 text-black" />
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Filter by Reviews */}
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
              className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedReview === label}
                onChange={() => setSelectedReview(label)}
                className="accent-gray-800 w-4 h-4 cursor-pointer"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Filter by Stocks */}
      <div className="mb-4">
        <h3 className="text-xs text-left font-bold text-gray-700 mb-1 uppercase">
          Filter By Stocks
        </h3>
        <input
          type="number"
          placeholder="No. of Stocks"
          value={stockThreshold}
          onChange={(e) => setStockThreshold(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-1.5 text-sm"
        />
      </div>

      {/* Filter by Price */}
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
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
            />
          </label>
          <label className="text-sm text-left text-gray-700">
            Max Price
            <input
              type="number"
              placeholder="Max (USD)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
            />
          </label>
        </div>
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-black cursor-pointer text-white py-1.5 rounded-md font-medium hover:bg-gray-800 transition text-sm"
      >
        Apply
      </button>
    </div>
  );
}
