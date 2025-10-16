"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/shopify";
import {
  ArrowRight,
  Filter,
  Heart,
  Star,
  Box,
  User,
  Gift,
  Home,
} from "lucide-react";
import PaginationButtons from "../Buttons/PaginationsButton";
import CartIcon from "@/components/icons/Cart";
import Link from "next/link";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("All"); // track active tab
  const itemsPerPage = 4;

  const tabIcons = [User, Star, Gift, Home, Box];
  const tabs = [
    "Grandparents",
    "Theme",
    "Accessories",
    "Home & Living",
    "Featured",
  ];

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

  // Filter products based on active tab
  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((product) =>
          product.collections?.some(
            (collection) =>
              collection.title.toLowerCase() === activeTab.toLowerCase()
          )
        );

  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + itemsPerPage, filteredProducts.length - itemsPerPage)
    );
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setStartIndex(0); // reset carousel when changing tab
  };

  const progress = Math.min(
    100,
    ((startIndex + itemsPerPage) / filteredProducts.length) * 100
  );

  return (
    <section className="text-[#111] py-12">
      <div className="max-w-7xl mx-auto">
        {/* ===== Header ===== */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row mb-8 sm:items-end sm:justify-between">
            <div className="text-left">
              <h1 className="text-4xl mb-6 font-extrabold tracking-tight font-sans">
                Grumpy Grampa’s Treasure Trove
              </h1>
              <p className="text-gray-600 mt-2">
                Curiously cranky finds, handpicked with old-school charm.
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <button className="flex items-center gap-2 px-6 py-2 text-sm font-medium border rounded-full border-gray-300 hover:bg-black hover:text-white transition">
                View All <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* ===== Tabs + Filter ===== */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
            <div className="flex flex-wrap justify-start gap-3">
              {["All", ...tabs].map((tab, i) => {
                const Icon = tabIcons[i % tabIcons.length];
                const isActive = activeTab === tab;
                return (
                  <button
                    key={i}
                    onClick={() => handleTabClick(tab)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full transition-all ${
                      isActive
                        ? "bg-black text-white"
                        : "border-gray-300 hover:bg-black hover:text-white"
                    }`}
                  >
                    {i > 0 && <Icon size={16} />}
                    {tab}
                  </button>
                );
              })}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full border-gray-300 hover:bg-black hover:text-white transition">
              <Filter size={16} />
              Filter By: {activeTab}
            </button>
          </div>
        </div>

        {/* ===== Product Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => {
            const img =
              product.images?.[0]?.url || product.images?.edges?.[0]?.node?.url;
            const variant = product.variants?.[0];
            const price = parseFloat(variant?.price?.amount || 0);
            const compareAtPrice = parseFloat(
              variant?.compareAtPrice?.amount || 0
            );
            const title = product.title || "Untitled";
            const id = product.id;
            const handle = product.handle;

            const discount =
              compareAtPrice > price
                ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
                : 0;

            return (
              <Link key={id} href={`/Product/${handle}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <div className="relative">
                    {discount > 0 && (
                      <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {discount}% OFF
                      </div>
                    )}
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100">
                      <Heart size={20} strokeWidth={1} />
                    </button>
                    <Image
                      src={img || "/placeholder.png"}
                      alt={title}
                      width={400}
                      height={400}
                      className="w-full h-[350px] object-cover"
                    />
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
                        <h3 className="font-semibold text-lg">{title}</h3>
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
            );
          })}
        </div>

        <PaginationButtons
          progress={progress}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </section>
  );
}
