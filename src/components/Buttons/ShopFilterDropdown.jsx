"use client";

import { useRef, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query"; // We'll make this tiny hook below

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
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [appliedGroup, setAppliedGroup] = useState(null);
  const [selectedReview, setSelectedReview] = useState("All");
  const [stockThreshold, setStockThreshold] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCollection = searchParams.get("collection") || "All";

  const handleApply = () => {
    if (!selectedGroup) return;
    setAppliedGroup(selectedGroup);

    const params = new URLSearchParams(searchParams);

    if (selectedReview && selectedReview !== "All")
      params.set("review", selectedReview);
    else params.delete("review");

    if (stockThreshold) params.set("stockThreshold", stockThreshold);
    else params.delete("stockThreshold");

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    // ✅ Add this line
    params.set("group", selectedGroup);

    const title = selectedGroup;
    const tabs =
      groupedCollections[selectedGroup]?.map((col) => col.title).join(",") ||
      "";

    params.set("title", title);
    params.set("tabs", tabs);

    router.push(`/Shop/${encodeURIComponent(title)}?${params.toString()}`);
    onClose?.();
  };

  const handleCollectionChange = (collection) => {
    const params = new URLSearchParams(searchParams);
    params.set("collection", collection);
    router.push(
      `/Shop/${encodeURIComponent(selectedGroup || "All")}?${params.toString()}`
    );
    onCollectionChange?.(collection);
  };

  useEffect(() => {
    if (!open) return;

    // Create a plain object snapshot of current URL params
    const params = Object.fromEntries(searchParams.entries());

    setSelectedGroup(params.group || null);
    setAppliedGroup(params.group || null);
    setSelectedReview(params.review || "All");
    setStockThreshold(params.stockThreshold || "");
    setMinPrice(params.minPrice || "");
    setMaxPrice(params.maxPrice || "");
  }, [open, searchParams.toString()]);

  useEffect(() => {
    if (!isDesktop || !open) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDesktop, open, onClose]);

  // Extracted content to reuse inside Dialog or Drawer
  const FilterContent = (
    <div
      ref={dropdownRef}
      className="w-full sm:w-72 bg-white shadow-xl rounded-lg z-50 text-sm m-0 p-0 md:m-3 md:p-4"
    >
      {!appliedGroup && (
        <>
          <h3 className="text-xs text-left font-bold mb-1 uppercase text-gray-700">
            Shop By Categories
          </h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-gray-800">
              <input
                type="checkbox"
                checked={selectedGroup === "All" || !selectedGroup}
                onChange={() => setSelectedGroup("All")}
                className="accent-gray-800 w-4 h-4"
              />
              All
            </label>

            {groups.map((g, i) => (
              <label
                key={i}
                className="flex items-center gap-2 cursor-pointer text-gray-800"
              >
                <input
                  type="checkbox"
                  checked={selectedGroup === g.name}
                  onChange={() => setSelectedGroup(g.name)}
                  className="accent-gray-800 w-4 h-4"
                />
                {g.name}
              </label>
            ))}
          </div>
        </>
      )}

      {appliedGroup && (
        <>
          <h3 className="text-xs text-left font-bold mb-1 uppercase text-gray-700">
            Filter By Shop
          </h3>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleCollectionChange("All")}
              className="flex justify-between items-center py-1 hover:text-black"
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
                className="flex justify-between items-center py-1 hover:text-black"
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
              className="flex items-center gap-2 cursor-pointer text-gray-800"
            >
              <input
                type="checkbox"
                checked={selectedReview === label}
                onChange={() => setSelectedReview(label)}
                className="accent-gray-800 w-4 h-4"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

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
        className="w-full hidden md:block bg-black cursor-pointer text-white py-1.5 rounded-md font-medium hover:bg-gray-800 transition text-sm"
      >
        Apply
      </button>
    </div>
  );
  if (isDesktop) {
    return <div ref={dropdownRef}>{FilterContent}</div>;
  }

  return (
    <Drawer open={open} onOpenChange={onClose} direction="bottom">
      <DrawerContent className="bg-white rounded-t-2xl max-h-[80vh] flex flex-col">
        <VisuallyHidden>
          <DialogTitle>Filter Options</DialogTitle>
        </VisuallyHidden>

        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 p-4 pb-2">
          <div ref={dropdownRef} className="w-full sm:w-72 text-sm">
            {/* everything in FilterContent EXCEPT the Apply button */}
            {/* move the Apply button out below */}
            {FilterContent}
          </div>
        </div>

        {/* Fixed bottom action bar */}
        <div className="p-4 border-t">
          <button
            onClick={handleApply}
            className="w-full bg-black cursor-pointer text-white py-1.5 rounded-md font-medium hover:bg-gray-800 transition text-sm"
          >
            Apply
          </button>
        </div>
      </DrawerContent>
    </Drawer>

    // <Drawer open={open} onOpenChange={onClose} direction="bottom">
    //   <DrawerContent className="bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto p-4">
    //     <VisuallyHidden>
    //       <DialogTitle>Filter Options</DialogTitle>
    //     </VisuallyHidden>
    //     {/* <div ref={dropdownRef} className="w-full sm:w-72"> */}
    //     {FilterContent}
    //     {/* </div> */}
    //   </DrawerContent>
    // </Drawer>
  );
}
