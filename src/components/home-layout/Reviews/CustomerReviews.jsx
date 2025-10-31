"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import PaginationButtons from "../../Buttons/PaginationsButton";
import QuoteIcon from "@/components/icons/Quote";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const totalScrollable = Math.max(reviews.length - itemsPerPage, 0);
  const progress =
    totalScrollable > 0 ? (startIndex / totalScrollable) * 100 : 0;

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        const validReviews = data.reviews.filter(
          (r) => r.published && r.body && (r.reviewer?.name || r.title)
        );
        setReviews(validReviews);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    }
    loadReviews();
  }, []);

  const handleNext = () =>
    setStartIndex((prev) =>
      Math.min(prev + itemsPerPage, reviews.length - itemsPerPage)
    );
  const handlePrevious = () =>
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));

  const handleDragChange = (newProgress) => {
    const newStart = Math.round((newProgress / 100) * totalScrollable);
    setStartIndex(newStart);
  };

  return (
    <section className="w-full bg-neutral-50 py-16 px-6 md:px-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-start justify-between flex-wrap gap-4">
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-3xl md:text-4xl mb-4 font-extrabold text-neutral-950">
            Grumpy Grampa Customer Reviews & Style Stories
          </h2>
          <p className="text-neutral-500 mt-2 text-lg">
            Real feedback from happy grandparents and families who love our
            comfortable, stylish, and timeless senior fashion.
          </p>
        </div>

        <button className="flex items-center cursor-pointer gap-2 border border-neutral-950 text-neutral-950 rounded-full px-6 py-2 text-sm font-medium hover:bg-neutral-950 hover:text-white transition">
          View All
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Reviews Carousel */}
      <div className="overflow-hidden max-w-7xl mx-auto mt-10">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{
            transform: `translateX(-${(startIndex / reviews.length) * 100}%)`,
          }}
        >
          {reviews.map((r) => (
            <div
              key={r.id}
              className="flex-shrink-0 w-full md:w-1/3 bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 flex flex-col justify-between"
            >
              <div>
                <QuoteIcon size={28} className="mb-4" />
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={r.reviewer?.picture_url || "/avatars/avatar-1.png"}
                    alt={r.reviewer?.name || "Reviewer"}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-lg">
                      {r.reviewer?.name || "Anonymous"}
                    </h3>
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
      </div>

      {/* Pagination Buttons */}
      <PaginationButtons
        progress={progress}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onDragChange={handleDragChange}
      />
    </section>
  );
}
