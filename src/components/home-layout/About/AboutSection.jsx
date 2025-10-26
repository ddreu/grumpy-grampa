// src/components/AboutSection.jsx
"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function AboutSection({ showTitle }) {
  const [open, setOpen] = useState("brand");

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  return (
    <section className="w-full py-20 text-black overflow-hidden">
      {/* ===== Title Section ===== */}
      {showTitle && (
        <div className="text-center mb-16 px-4">
          <h1 className="text-3xl md:text-5xl mb-8 font-extrabold">
            Grumpy by Nature. Legendary by Choice.
          </h1>
          <p className="text-lg mt-4 text-gray-600">
            Turning old-school grit into goods worth bragging about.
          </p>
        </div>
      )}

      {/* ===== Main Row ===== */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between md:px-0 px-0">
        {/* ===== Left Image Section (full width left side) ===== */}
        <div className="flex-[1.6] flex justify-start relative w-full">
          <div className="w-full flex justify-start">
            <div className="p-2 rounded-full border-4 border-dashed border-neutral-950 flex items-center justify-center">
              <div className="w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem] bg-black rounded-full flex items-center justify-center relative overflow-visible">
                <Image
                  src="/grumpy.png"
                  alt="Grumpy Grandpa"
                  width={800}
                  height={800}
                  className="object-cover rounded-full -translate-y-7"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===== Right Collapsibles Section ===== */}
        <div className="flex-[1.4] space-y-6 md:ml-0 pl-0 pr-0">
          <div>
            {[
              {
                id: "brand",
                title: "Brand Story",
                content:
                  "Grumpy Grampa is more than a brand — it’s an attitude. We create and curate vintage-inspired apparel, bold statement pieces, and unique lifestyle goods with old-school craftsmanship and a dash of grumpy charm. Every item is built to last, designed to stand out, and made for those who value quality, character, and timeless style.",
              },
              {
                id: "lifestyle",
                title: "Lifestyle Imagery",
                content: "Your lifestyle section content here.",
              },
              {
                id: "mission",
                title: "Mission",
                content: "Your mission statement content here.",
              },
            ].map((item) => (
              <div key={item.id} className="border-b border-neutral-950 py-4">
                <button
                  onClick={() => toggle(item.id)}
                  className="flex justify-between items-center w-full text-left font-semibold text-2xl"
                >
                  {item.title}
                  {open === item.id ? <Minus size={20} /> : <Plus size={20} />}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    open === item.id ? "max-h-96 mt-3" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
