"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchProduct } from "@/lib/shopify";

export default function ProductView({ product }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  // useEffect(() => {
  //   async function loadProduct() {
  //     const data = await fetchProduct(handle);
  //     setProduct(data);
  //   }
  //   loadProduct();
  // }, [handle]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-neutral-500">Loading product...</p>
      </div>
    );
  }
  function DescriptionToggle({ text, limit = 150, className = "" }) {
    const [expanded, setExpanded] = useState(false);

    if (!text) return null;

    const shouldTruncate = text.length > limit;
    const displayedText =
      expanded || !shouldTruncate ? text : text.slice(0, limit) + "...";

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
          {/* Main Image */}
          <div className="flex-1 relative rounded-3xl overflow-hidden max-w-[520px]">
            <Image
              src={product.images[selectedImg]?.url}
              alt={product.title}
              width={512}
              height={640}
              className="object-cover w-full h-full rounded-3xl"
            />
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
              ${product.variants[0]?.price.amount}
            </span>
            {product.variants[0]?.compareAtPrice?.amount && (
              <span className="text-neutral-400 line-through">
                ${product.variants[0]?.compareAtPrice.amount}
              </span>
            )}
          </div>

          {/* Stock Info */}
          {product.variants[0]?.availableForSale ? (
            <p className="text-sm text-green-600 mb-4">
              In stock ({product.variants[0]?.quantityAvailable} available)
            </p>
          ) : (
            <p className="text-sm text-red-600 mb-4">Out of stock</p>
          )}

          {/* Quick actions */}
          <div className="flex items-center gap-3 text-sm mb-6">
            <button className="flex items-center gap-1 bg-neutral-100 text-neutral-950 px-4 py-2 rounded-full hover:bg-neutral-200 transition">
              <Heart size={16} /> Add to Wishlist
            </button>
            <button className="flex items-center gap-1 bg-neutral-100 text-neutral-950 px-4 py-2 rounded-full hover:bg-neutral-200 transition">
              <ShoppingCart size={16} /> Add to Compare
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-neutral-800 mb-2">
              Product Description:
            </h3>

            <DescriptionToggle text={product.description} limit={250} />
          </div>

          {/* Quantity */}
          <hr />
          <div className="mb-6 mt-6">
            <h4 className="text-sm font-semibold mb-2 text-neutral-950">
              Quantity:
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="w-10 h-10 text-neutral-950 flex items-center justify-center border border-neutral-950 rounded-md hover:bg-neutral-100 transition text-lg font-semibold"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border text-neutral-950 border-neutral-950 rounded-md px-3 py-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
              />
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-10 h-10 text-neutral-950 flex items-center justify-center border border-neutral-950 rounded-md hover:bg-neutral-100 transition text-lg font-semibold"
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
            <ul className="text-sm text-neutral-600 leading-relaxed">
              <li>🚚 Estimated delivery: 2–3 days</li>
              <li>💸 Free Shipping & Returns on orders above $70</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition font-medium">
              Add To Cart
            </button>
            <button className="flex-1 border text-neutral-950 border-black py-3 rounded-full hover:bg-black hover:text-white transition font-medium">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
