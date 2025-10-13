"use client";
import { ArrowRight } from "lucide-react";

export default function HeroText() {
  return (
    <div className="text-center py-8 bg-neutral-50">
      <div className="max-w-2xl mx-auto px-2">
        {/* Free shipping badge */}
        <div className="inline-block border border-neutral-200 rounded-full px-4 py-1 mb-4">
          <span className="text-sm text-amber-600 font-medium">
            Free Shipping on Orders over $75+
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-950 mb-2">
          We Make Retirement Look Real Good
        </h1>

        {/* Subtext */}
        <p className="text-neutral-500 mb-6">
          Our casual apparel makes for a project gift or addition to your
          wardrobe.
        </p>

        {/* Button */}
        <button className="bg-neutral-950 text-neutral-50 rounded-full px-4 py-2 flex items-center mx-auto hover:bg-neutral-900 transition">
          Shop Collection
          <span className="ml-3 w-9 h-9 flex items-center justify-center bg-white rounded-full">
            <ArrowRight className="w-4 h-4 text-neutral-950" />
          </span>
        </button>
      </div>
    </div>
  );
}
