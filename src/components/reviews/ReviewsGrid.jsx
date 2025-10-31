"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, Star } from "lucide-react";
import QuoteIcon from "@/components/icons/Quote";

export default function ReviewsGrid() {
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const maxInitial = 6;

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        const valid = data.reviews.filter(
          (r) => r.published && r.body && r.reviewer?.name
        );
        setReviews(valid);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    }

    loadReviews();
  }, []);

  // Determine which reviews to display
  const displayedReviews = showAll ? reviews : reviews.slice(0, maxInitial);

  return (
    <section className="w-full bg-neutral-50 py-16 px-6 md:px-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-start justify-between flex-wrap gap-4">
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-5xl md:text-5xl mb-8 font-extrabold text-neutral-950">
            Grumpy Grampa Customer Reviews & Style Stories
          </h2>
          <p className="text-neutral-500 mt-2 text-lg">
            Real feedback from happy grandparents and families who love our
            comfortable, stylish, and timeless senior fashion.
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mt-10">
        {displayedReviews.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-left flex flex-col justify-between h-full"
          >
            <div>
              <QuoteIcon size={28} className="mb-4" />

              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={r.reviewer.picture_url || "/avatars/avatar-1.png"}
                  alt={r.reviewer.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-900 text-lg">
                    {r.reviewer.name}
                  </h3>
                  {/* <p className="text-sm text-neutral-500">
                    {r.reviewer.email || "Verified Buyer"}
                  </p> */}
                  <p className="text-sm text-neutral-500">
                    {r.product?.title || r.title || "No title"}
                  </p>
                </div>
              </div>

              <p className="text-md text-neutral-700 mb-4 leading-relaxed">
                “{r.body}”
              </p>
            </div>

            <div className="flex items-center gap-1 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < (r.rating || 0)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-yellow-500/30"
                  }
                />
              ))}
              <span className="text-sm text-neutral-700 font-medium ml-1">
                {r.rating?.toFixed(1) || "0.0"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Less button */}
      {reviews.length > maxInitial && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-8 py-3 border border-neutral-950 text-neutral-950 rounded-full hover:bg-neutral-950 hover:text-white transition-colors duration-200 text-md cursor-pointer font-medium"
          >
            {showAll ? "Show Less" : "Show More"}
            <ArrowDown
              size={16}
              className={`transition-transform duration-300 ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </section>
  );
}
