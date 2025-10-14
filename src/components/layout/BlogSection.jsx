"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ViewAllButton from "./Buttons/ViewAllButton";

const blogs = [
  {
    id: 1,
    image: "/images/blog1.jpg",
    date: "September 12, 2025",
    title: "Back in My Day… and Other Things Gramps Says",
    excerpt:
      "Grampa’s got a way with words—most of them starting with “Back in my day…” Whether it’s about the price of...",
  },
  {
    id: 2,
    image: "/images/blog2.jpg",
    date: "September 11, 2025",
    title: "10 Gifts That’ll Make Grampa Smile (and Maybe Tear Up)",
    excerpt:
      "Grampa might act like he doesn’t need anything, but deep down, he loves a thoughtful gift—especially if it’s...",
  },
  {
    id: 3,
    image: "/images/blog3.jpg",
    date: "September 10, 2025",
    title: "How to Keep Grandkids Off Their Phones (for 5 Minutes)",
    excerpt:
      "Grampa’s mission: get the grandkids to look up from their screens and into the real world. Here’s how to ma...",
  },
];

export default function BlogSection() {
  return (
    <section className="text-neutral-950 py-18">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">Our Blogs</h2>
        <p className="text-sm text-neutral-600 mb-12">
          Stories, tips, and a few grumbles about life, love, and the art of
          spoiling grandkids.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-4xl shadow-sm overflow-hidden text-left transition hover:shadow-md"
            >
              <div className="h-52 w-full relative">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-neutral-500 mb-2 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-yellow-400 rounded-sm"></span>
                  {blog.date}
                </p>
                <h3 className="font-semibold text-base mb-2">{blog.title}</h3>
                <p className="text-sm text-neutral-600 mb-4">{blog.excerpt}</p>
                <button className="flex items-center gap-2 text-sm font-medium text-neutral-950 hover:translate-x-1 transition">
                  Learn More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <ViewAllButton />
      </div>
    </section>
  );
}
