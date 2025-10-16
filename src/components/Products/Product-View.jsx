"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Star, Truck, Package, ShareIcon, Share, Share2 } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchProduct } from "@/lib/shopify";
import Compare from "../icons/Compare";
import Heart from "../icons/Heart";

export default function ProductView({ product }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [zoom, setZoom] = useState({ active: false, x: 0, y: 0 });

  if (!product) return null;

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-neutral-500">Loading product...</p>
      </div>
    );
  }

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    // const x = e.clientX - rect.left;
    // const y = e.clientY - rect.top;

    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);

    setZoom({ active: true, x, y });
  }
  function DescriptionToggle({ text, limit = 150, className = "" }) {
    const [expanded, setExpanded] = useState(false);

    const content =
      text && text.trim() !== "" ? text : "No description available.";

    const shouldTruncate = content.length > limit;
    const displayedText =
      expanded || !shouldTruncate ? content : content.slice(0, limit) + "...";

    return (
      <div className={className}>
        <p className="text-neutral-600 leading-relaxed text-sm max-w-md">
          {displayedText}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-md font-medium cursor-pointer text-black mt-2 hover:underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      {/* ===== Breadcrumb ===== */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/Shop">All</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{product.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ===== Main Layout ===== */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* ===== Left side: Image Gallery ===== */}
        <div className="flex flex-row-reverse md:flex-row gap-6 flex-1 justify-center">
          {/* Thumbnail List */}
          <div className="flex md:flex-col gap-3 justify-center">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`relative w-20 h-24 rounded-xl overflow-hidden border ${
                  selectedImg === i
                    ? "border-black"
                    : "border-transparent hover:border-neutral-300"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`thumbnail-${i}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          {/* Main Image with Zoom */}
          <div className="flex-1 relative rounded-3xl overflow-hidden max-w-[520px]">
            <div
              className="relative w-full h-full cursor-zoom-in"
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={() => setZoom({ active: false })}
            >
              {/* Original Image */}
              <Image
                src={product.images[selectedImg]?.url}
                alt={product.title}
                width={512}
                height={640}
                className="object-cover w-full h-full rounded-3xl"
              />

              {/* Zoom Lens */}
              {zoom.active && (
                <div
                  className="absolute w-40 h-40 rounded-full border-2 border-black pointer-events-none bg-no-repeat bg-cover"
                  style={{
                    top: zoom.y - 80,
                    left: zoom.x - 80,
                    backgroundImage: `url(${product.images[selectedImg]?.url})`,
                    backgroundSize: `${512 * 2}px ${640 * 2}px`, // scale 2
                    backgroundPosition: `-${zoom.x * 2 - 80}px -${
                      zoom.y * 2 - 80
                    }px`,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* ===== Right side: Product Info ===== */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">
            {product.title}
          </h1>

          {/* Price Section */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-semibold text-gradient-gold">
              ${parseFloat(selectedVariant.price.amount).toFixed(2)}
            </span>

            {selectedVariant.compareAtPrice?.amount && (
              <>
                <span className="text-neutral-400 line-through">
                  $
                  {parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)}
                </span>

                {/* Discount Badge */}
                <span className="bg-black text-white text-xs font-semibold px-3 py-2 rounded-full">
                  {Math.round(
                    ((parseFloat(selectedVariant.compareAtPrice.amount) -
                      parseFloat(selectedVariant.price.amount)) /
                      parseFloat(selectedVariant.compareAtPrice.amount)) *
                      100
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          {/* Stock & Rating Info */}
          <p className="text-sm text-neutral-950 mb-4 flex items-center gap-2">
            {/* 5 stars */}
            <span className="flex items-center gap-0.5 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </span>
            5.0 (260 Reviews) •{" "}
            {product.variants[0]?.availableForSale
              ? `In stock (${product.variants[0]?.quantityAvailable} available)`
              : "Out of stock"}
          </p>

          {/* Quick actions */}
          <div className="flex items-center gap-3 text-sm mb-6">
            <button className="flex items-center  gap-2 bg-neutral-200 text-neutral-950 px-4 py-2 rounded-full hover:bg-neutral-200 transition">
              <Heart size={16} /> Add to Wishlist
            </button>
            <button className="flex items-center gap-2 bg-neutral-200 text-neutral-950 px-4 py-2 rounded-full hover:bg-neutral-200 transition">
              <Compare size={16} /> Add to Compare
            </button>
            <button className="flex items-center gap-2 bg-neutral-200 text-neutral-950 px-4 py-2 rounded-full hover:bg-neutral-200 transition">
              <Share2 size={16} /> Share
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-neutral-800 mb-2">
              Product Description:
            </h3>

            <DescriptionToggle text={product.description} limit={250} />
          </div>

          {/* Variations: Color selection */}
          <hr />
          {product.variants.length > 1 && (
            <div className="my-6">
              <span className="block text-sm font-semibold mb-2">
                Variation:
              </span>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => {
                  const colorOption = variant.selectedOptions.find(
                    (opt) => opt.name.toLowerCase() === "color"
                  )?.value;

                  if (!colorOption) return null;

                  const isSelected = variant.id === selectedVariant.id;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-1 text-sm font-medium rounded-md border transition-all
              ${
                isSelected
                  ? "border-neutral-900 bg-neutral-200 text-neutral-950"
                  : "border-transparent bg-neutral-200 text-neutral-950 hover:bg-neutral-300"
              }`}
                    >
                      {colorOption}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <hr />
          <div className="mb-6 mt-6">
            <h4 className="text-sm font-semibold mb-2 text-neutral-950">
              Quantity:
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="w-10 h-10 text-neutral-950 bg-neutral-200 flex items-center justify-center border border-neutral-950 rounded-md hover:bg-neutral-100 transition text-lg font-semibold"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border bg-neutral-200 text-neutral-950 border-neutral-950 rounded-md px-3 py-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
              />
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-10 h-10 bg-neutral-200 text-neutral-950 flex items-center justify-center border border-neutral-950 rounded-md hover:bg-neutral-100 transition text-lg font-semibold"
              >
                +
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <hr />
          <div className="mb-8 rounded-xl py-4">
            <h4 className="text-sm font-semibold mb-2 text-neutral-950">
              Delivery Info
            </h4>
            <ul className="text-sm text-neutral-600 leading-relaxed space-y-1">
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-800" />
                Estimated delivery: 2–3 days
              </li>
              <li className="flex items-center gap-2">
                <Package className="w-4 h-4 text-neutral-800" />
                Free Shipping & Returns on orders above $70
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 border text-neutral-950 border-black py-3 rounded-full hover:bg-black hover:text-white transition font-medium">
              Add To Cart
            </button>
            <button className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition font-medium">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
