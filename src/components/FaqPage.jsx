"use client";

import { useState } from "react";
import { Plus, Minus, Search, ArrowDown } from "lucide-react";
import faqData from "../lib/faqData"; // adjust path if needed

export default function FAQ() {
  const categories = [
    "All",
    "Product",
    "Shipping",
    "Payment",
    "Return Product",
    "Cancel Product",
    "Add To Cart",
    "Checkout",
    "Reviews",
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Combine all categories for "All"
  const allFaqs = Object.values(faqData).flat();

  // If searching, always search globally
  const currentFaqs =
    searchTerm.trim() !== ""
      ? allFaqs
      : activeCategory === "All"
      ? allFaqs
      : faqData[activeCategory] || [];

  // Filter by search term globally
  const filteredFaqs = currentFaqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limit to 5 unless showAll is true
  const displayedFaqs = showAll ? filteredFaqs : filteredFaqs.slice(0, 5);

  return (
    <section className="w-full max-w-6xl mx-auto py-16 mb-5 text-center">
      <h2 className="text-5xl font-extrabold text-neutral-950 tracking-normal mb-8">
        Frequently Asked Questions
      </h2>
      <p className="text-lg text-neutral-500 mt-2">
        Because Grampa doesn’t like repeating himself.
      </p>

      {/* Search Bar */}
      <div className="mt-12 mb-12 flex justify-center">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search FAQs here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-full pl-12 pr-4 py-3 text-neutral-950 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(null);
              setShowAll(false);
              setSearchTerm("");
            }}
            className={`px-4 py-1 rounded-full font-semibold text-md border border-gray-300 transition ${
              activeCategory === cat
                ? "bg-black text-white border-black"
                : "hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Collapsibles */}
      <div className="mt-10 space-y-4 text-left">
        {displayedFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl p-6 transition-all duration-200 ${
                isOpen
                  ? "bg-neutral-200"
                  : "bg-neutral-200/70 hover:bg-neutral-200"
              }`}
            >
              <button
                className="w-full flex py-2 px-2 justify-between items-center text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-xl font-semibold tracking-wide text-neutral-950">
                  {faq.question}
                </span>

                <span
                  className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-neutral-950" />
                  ) : (
                    <Plus className="w-5 h-5 text-neutral-950" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all px-2 duration-300 ${
                  isOpen ? "max-h-96 mt-3" : "max-h-0 mt-0"
                }`}
              >
                <p className="text-neutral-950 text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}

        {/* Show More Button */}
        {filteredFaqs.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mx-auto flex mt-8 items-center gap-2 text-neutral-950 border border-neutral-950 rounded-full px-6 py-2 text-md hover:bg-neutral-200 transition"
          >
            {showAll ? "Show less" : "Show more"}
            <ArrowDown
              className={`transition-transform ${
                showAll ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        )}
      </div>
    </section>
  );
}
