"use client";

import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import ViewAllButton from "./Buttons/ViewAllButton";

const faqs = [
  {
    question: "What is Grumpy Grampa all about?",
    answer:
      "Grumpy Grampa is an e-commerce store that celebrates the quirks, wisdom, and humor of grandparents. We offer thoughtfully designed products that are practical, nostalgic, and just a little bit ornery—just like Grampa himself.",
  },
  {
    question: "Who are your products for?",
    answer:
      "Our products are designed for grandparents and anyone who appreciates a touch of old-school humor and classic charm.",
  },
  {
    question: "Do you offer gift wrapping or personalized messages?",
    answer:
      "Yes! We offer gift wrapping and custom messages during checkout for that perfect personal touch.",
  },
  {
    question: "How do I know what size to get for apparel?",
    answer:
      "Each apparel product includes a detailed size chart to help you choose the perfect fit.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Of course. If you’re not completely satisfied, you can return or exchange your purchase within 30 days.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-16 mb-5 text-center">
      <h2 className="text-3xl font-extrabold text-neutral-950 tracking-normal">
        Frequently Asked Questions
      </h2>
      <p className="text-sm text-neutral-500 mt-2">
        Because Grampa doesn’t like repeating himself.
      </p>

      <div className="mt-10 space-y-4 text-left">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 transition-all duration-200 ${
              openIndex === index
                ? "bg-neutral-200"
                : "bg-neutral-200/70 hover:bg-neutral-200"
            }`}
          >
            <button
              className="w-full flex justify-between items-center text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-semibold tracking-wide text-neutral-950">
                {faq.question}
              </span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-neutral-950" />
              ) : (
                <Plus className="w-5 h-5 text-neutral-950" />
              )}
            </button>

            {openIndex === index && (
              <p className="mt-3 text-neutral-950 text-sm leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      <ViewAllButton />
    </section>
  );
}
