"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Quote, ArrowRight } from "lucide-react";
import PaginationButtons from "../../Buttons/PaginationsButton";
import QuoteIcon from "@/components/icons/Quote";

const reviews = [
  {
    id: 1,
    name: "Charlie Gouse",
    role: "HAPPY G-POP",
    quote:
      "I've worn the same old cardigan for years, but Grumpy Grampa's knitwear is next-level. Comfortable enough for my afternoon nap, stylish enough for Sunday lunch. Even my teenage grandsons said, 'Nice fit, Gramps!'",
    rating: 5,
    avatar: "/avatars/avatar-1.png",
  },
  {
    id: 2,
    name: "Allison Kanter",
    role: "HAPPY G-MA",
    quote:
      "I'm not one for complicated outfits, but these shirts and trousers are easy to wear, easy to wash, and make me look like I’ve still got it! My bridge club keeps asking where I shop.",
    rating: 5,
    avatar: "/avatars/avatar-2.png",
  },
  {
    id: 3,
    name: "Zaire Dias",
    role: "HAPPY G-DAD",
    quote:
      "I bought a Grumpy Grampa jacket for a family reunion, and my daughter said I looked 'sharp.' The fit is perfect, the fabric is soft, and I feel confident wearing it anywhere — from the park to the pub.",
    rating: 5,
    avatar: "/avatars/avatar-3.png",
  },
];

export default function CustomerReviews() {
  const [current, setCurrent] = useState(0);

  const next = () =>
    setCurrent((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
  const prev = () =>
    setCurrent((prev) =>
      prev === 0 ? Math.ceil(reviews.length / 3) - 1 : prev - 1
    );

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

        <button className="flex items-center gap-2 border border-neutral-950 text-neutral-950 rounded-full px-6 py-2 text-sm font-medium hover:bg-neutral-950 hover:text-white transition">
          View All
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mt-10">
        {reviews.slice(current * 3, current * 3 + 3).map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-left flex flex-col justify-between h-full"
          >
            <div>
              {/* Gradient quote icon */}
              <QuoteIcon size={28} className="mb-4" />

              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={r.avatar}
                  alt={r.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-900 text-lg">
                    {r.name}
                  </h3>
                  <p className="text-sm text-neutral-500">{r.role}</p>
                </div>
              </div>

              <p className="text-md text-neutral-700 mb-4 leading-relaxed">
                “{r.quote}”
              </p>
            </div>

            {/* Stars always at the bottom */}
            <div className="flex items-center gap-1 mt-4">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-500 text-yellow-500"
                />
              ))}
              <span className="text-sm text-neutral-700 font-medium ml-1">
                {r.rating.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <PaginationButtons />
    </section>
  );
}
