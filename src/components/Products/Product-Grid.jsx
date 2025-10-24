"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/shopify";
import {
  ArrowRight,
  Filter,
  User,
  Gift,
  Home,
  Box,
  Shirt,
  Palette,
  Watch,
  Armchair,
  Star,
} from "lucide-react";
import PaginationButtons from "../Buttons/PaginationsButton";
import CartIcon from "@/components/icons/Cart";
import Link from "next/link";
import Compare from "../icons/Compare";
import Heart from "../icons/Heart";
import FilterDropdown from "../Buttons/FilterDropdown";
import { fetchCollectionsByGroup } from "@/lib/shopify";

export default function ProductGrid({
  title = "Our Products",
  subtitle = "",
  tabs = [], // array of { name: string, icon: ReactComponent }
  showFilter = true,
  className = "",
  viewAllUrl = "#",
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const ICONS_MAP = { ArrowRight, Filter, Heart, Star, User, Gift, Home, Box };
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentPage = startIndex / itemsPerPage;
  const totalScrollable = products.length - itemsPerPage;
  const progress =
    totalScrollable > 0 ? (startIndex / totalScrollable) * 100 : 0;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [groupTabs, setGroupTabs] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [groupedCollections, setGroupedCollections] = useState({});
  const displayTabs =
    tabs.length > 0 ? tabs.map((t) => ({ name: t, icon: null })) : groupTabs;

  const handleDragChange = (newProgress) => {
    const totalScrollable = products.length - itemsPerPage;
    const newStart = Math.round((newProgress / 100) * totalScrollable);
    setStartIndex(newStart);
  };

  const GROUP_ICON_MAP = {
    Grandparents: Shirt,
    Theme: Palette,
    Accessories: Watch,
    "Home & Living": Armchair,
    Featured: Star,
  };
  const DEFAULT_GROUP_ICON = Star;

  const visibleRatio = (itemsPerPage / products.length) * 100;

  useEffect(() => {
    async function loadGroups() {
      try {
        const groups = await fetchCollectionsByGroup();
        setGroupedCollections(groups); // 👈 save all grouped collections
        const tabsArray = Object.keys(groups).map((groupName) => ({
          name: groupName,
          icon: GROUP_ICON_MAP[groupName] || DEFAULT_GROUP_ICON,
        }));
        setGroupTabs(tabsArray);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    }

    loadGroups();
  }, []);

  useEffect(() => {
    if (displayTabs.length > 0 && !selectedGroup) {
      setSelectedGroup(displayTabs[0].name); // 👈 first tab selected by default
    }
  }, [displayTabs, selectedGroup]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center bg-[#f8f8f8]">
        <p className="text-gray-500">Loading products...</p>
      </section>
    );
  }

  // const [groupTabs, setGroupTabs] = useState([]);

  const handlePrevious = () =>
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  const handleNext = () =>
    setStartIndex((prev) =>
      Math.min(prev + itemsPerPage, products.length - itemsPerPage)
    );

  return (
    <section className={`text-[#111] ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="text-left">
              <h1
                className={`text-4xl font-extrabold tracking-tight font-sans ${
                  subtitle ? "mb-3" : "mb-0"
                }`}
              >
                {title}
              </h1>
              {subtitle && <p className="text-gray-600 mt-0">{subtitle}</p>}
            </div>

            <div className="mt-4 sm:mt-0">
              <Link
                href={viewAllUrl}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium border rounded-full border-gray-300 hover:bg-black hover:text-white transition"
              >
                View All <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          {/* Tabs + Filter */}
          {(displayTabs.length > 0 || showFilter) && (
            <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
              {displayTabs.length > 0 && (
                <div className="flex flex-wrap justify-start gap-3">
                  {displayTabs.map((tab, i) => {
                    const IconComponent = tab.icon;
                    const isActive = selectedGroup === tab.name;

                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedGroup(tab.name)}
                        className={`flex items-center gap-2 px-4 py-2 text-md font-medium border rounded-full transition-all ${
                          isActive
                            ? "bg-black text-white border-black"
                            : "border-gray-300 hover:bg-black hover:text-white"
                        }`}
                      >
                        {IconComponent && <IconComponent size={16} />}
                        {tab.name}
                      </button>
                    );
                  })}
                </div>
              )}

              {showFilter && (
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full border-gray-300 hover:bg-black hover:text-white transition"
                  >
                    <Filter size={16} />
                    Filter By: All
                  </button>

                  <FilterDropdown
                    open={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    selectedGroup={selectedGroup}
                    onGroupChange={(group) => setSelectedGroup(group)}
                    groups={groupTabs}
                    groupedCollections={groupedCollections}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product Grid Wrapper */}
        <div className="overflow-hidden relative pb-5">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(startIndex / itemsPerPage) * 100}%)`,
            }}
          >
            {products.map((product) => {
              const img =
                product.images?.[0]?.url ||
                product.images?.edges?.[0]?.node?.url;
              const variant = product.variants?.[0];
              const price = parseFloat(variant?.price?.amount || 0);
              const compareAtPrice = parseFloat(
                variant?.compareAtPrice?.amount || 0
              );
              const productTitle = product.title || "Untitled";
              const id = product.id;
              const handle = product.handle;
              const discount =
                compareAtPrice > price
                  ? Math.round(
                      ((compareAtPrice - price) / compareAtPrice) * 100
                    )
                  : 0;

              return (
                <div
                  key={id}
                  className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-3"
                >
                  <Link href={`/Product/${handle}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group">
                      <div className="relative overflow-hidden">
                        {/* Discount badge */}
                        {discount > 0 && (
                          <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                            {discount}% OFF
                          </div>
                        )}

                        {/* Hover buttons */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                            <Compare size={20} strokeWidth={1} />
                          </button>
                          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                            <Heart size={20} strokeWidth={1} />
                          </button>
                        </div>

                        {/* Product image */}
                        <div className="w-full h-[350px] overflow-hidden">
                          <Image
                            src={img || "/placeholder.png"}
                            alt={productTitle}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                          <span className="flex items-center gap-1">
                            <Star
                              size={16}
                              className="fill-yellow-500 text-yellow-500"
                            />
                            5.0 (260 Reviews)
                          </span>
                          <span>1.2K Stocks</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {productTitle}
                            </h3>
                            <p className="text-l font-bold mt-1">
                              ${price.toFixed(2)}{" "}
                              {discount > 0 && (
                                <span className="text-gray-400 line-through ml-2">
                                  ${compareAtPrice.toFixed(2)}
                                </span>
                              )}
                            </p>
                          </div>

                          <button className="bg-black text-white rounded-full p-3 hover:bg-gray-800 transition self-center">
                            <CartIcon size={26} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <PaginationButtons
          progress={progress}
          visibleRatio={(itemsPerPage / products.length) * 100}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onDragChange={handleDragChange}
        />
      </div>
    </section>
  );
}
