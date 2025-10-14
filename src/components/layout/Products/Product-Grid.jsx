"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/shopify";
import {
  ArrowRight,
  Filter,
  Heart,
  ShoppingCart,
  User,
  Home,
  Star,
  Gift,
  Box,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PaginationButtons from "../Buttons/PaginationsButton";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data.slice(0, 4)); // ✅ show only 4
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

  // example icons for each tab
  const tabIcons = [User, Star, Gift, Home, Box];
  const tabs = [
    "Grandparents",
    "Theme",
    "Accessories",
    "Home & Living",
    "Featured",
  ];

  return (
    <section className="text-[#111] py-12">
      <div className="max-w-7xl mx-auto">
        {/* ===== Header ===== */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            {/* Left side — title and subtitle */}
            <div className="text-left">
              <h1 className="text-4xl font-extrabold tracking-tight font-sans">
                Grumpy Grampa’s Treasure Trove
              </h1>
              <p className="text-gray-600 mt-2">
                Curiously cranky finds, handpicked with old-school charm.
              </p>
            </div>

            {/* Right side — View All */}
            <div className="mt-4 sm:mt-0">
              <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium border rounded-full border-gray-300 hover:bg-black hover:text-white transition">
                View All <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* ===== Tabs + Filter ===== */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
            {/* Left: Tabs */}
            <div className="flex flex-wrap justify-start gap-3">
              {tabs.map((tab, i) => {
                const Icon = tabIcons[i];
                return (
                  <button
                    key={i}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full transition-all ${
                      i === 0
                        ? "bg-black text-white"
                        : "border-gray-300 hover:bg-black hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Right: Filter */}
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full border-gray-300 hover:bg-black hover:text-white transition">
              <Filter size={16} />
              Filter By: All
            </button>
          </div>
        </div>

        {/* ===== Product Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const img =
              product.images?.[0]?.url || product.images?.edges?.[0]?.node?.url;
            const price =
              product.variants?.[0]?.price?.amount ||
              product.priceRange?.minVariantPrice?.amount;
            const title = product.title || "Untitled";
            const id = product.id;

            const discounts = ["20% OFF", "17% OFF", "14% OFF", "14% OFF"];
            const discount = discounts[index] || "10% OFF";

            return (
              <div
                key={id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Image Section */}
                <div className="relative">
                  <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {discount}
                  </div>
                  <button className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-gray-100">
                    <Heart size={16} />
                  </button>
                  <Image
                    src={img || "/placeholder.png"}
                    alt={title}
                    width={400}
                    height={400}
                    className="w-full h-[350px] object-cover"
                  />
                </div>

                {/* Info Section */}
                <div className="p-4">
                  {/* Stars + Stock */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                    <span>⭐ 5.0 (260 Reviews)</span>
                    <span>1.2K Stocks</span>
                  </div>

                  {/* Title + Price + Cart */}
                  <div className="flex justify-between items-center">
                    {/* Left side: Title and Price stacked */}
                    <div>
                      <h3 className="font-semibold text-lg">{title}</h3>
                      <p className="text-l font-bold mt-1">
                        ${parseFloat(price).toFixed(2)}
                      </p>
                    </div>

                    {/* Right side: Cart Button vertically centered */}
                    <button className="bg-black text-white rounded-full p-3 hover:bg-gray-800 transition self-center">
                      <ShoppingCart size={26} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <PaginationButtons />
      </div>
    </section>
  );
}
