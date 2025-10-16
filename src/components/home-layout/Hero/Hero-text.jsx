"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroText() {
  return (
    <div className="text-center py-8 bg-neutral-50">
      <div className="max-w-2xl mx-auto px-2">
        {/* Free shipping badge */}
        <div className="inline-block border border-neutral-400 rounded-full px-4 py-1 mb-4">
          <span className="text-sm font-medium text-gradient-gold">
            Free Shipping on Orders over $75+
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-950 mb-5">
          We Make Retirement Look Real Good
        </h1>

        {/* Subtext */}
        <p className="text-neutral-500 mb-6">
          Our casual apparel makes for a project gift or addition to your
          wardrobe.
        </p>

        {/* Button */}
        <Link href="/Shop" className="inline-block">
          <button className="bg-neutral-950 cursor-pointer text-neutral-50 rounded-full px-4 py-2 flex items-center mx-auto hover:bg-neutral-900 transition">
            Shop Collection
            <span className="ml-3 cursor-pointer w-9 h-9 flex items-center justify-center bg-white rounded-full">
              <ArrowRight className="w-4 h-4 text-neutral-950" />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
