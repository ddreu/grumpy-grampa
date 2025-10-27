"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import ViewAllButton from "../Buttons/ViewAllButton";
import CalendarIcon from "../icons/Calendar";

const blogs = [
  {
    id: 1,
    image: "/blog/blog-1.png",
    date: "September 12, 2025",
    title: "Back in My Day… and Other Things Gramps Says",
    excerpt:
      "Grampa’s got a way with words—most of them starting with “Back in my day…” Whether it’s about the price of...",
  },
  {
    id: 2,
    image: "/blog/blog-2.png",
    date: "September 11, 2025",
    title: "10 Gifts That’ll Make Grampa Smile (and Maybe Tear Up)",
    excerpt:
      "Grampa might act like he doesn’t need anything, but deep down, he loves a thoughtful gift—especially if it’s...",
  },
  {
    id: 3,
    image: "/blog/blog-3.png",
    date: "September 10, 2025",
    title: "How to Keep Grandkids Off Their Phones (for 5 Minutes)",
    excerpt:
      "Grampa’s mission: get the grandkids to look up from their screens and into the real world. Here’s how to ma...",
  },
];

export default function BlogGrid() {
  return (
    <section className="text-neutral-950 py-18">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6 text-left">Our Blogs</h2>
        <p className="text-md text-neutral-600 text-left mb-12">
          Stories, tips, and a few grumbles about life, love, and the art of
          spoiling grandkids.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-4xl shadow-sm overflow-hidden text-left transition hover:shadow-md flex flex-col"
            >
              <div className="h-52 w-full relative">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content + Footer */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <p className="text-sm text-neutral-500 mb-2 flex items-center gap-1.5">
                    <CalendarIcon size={16} className="mr-1.5" />
                    {blog.date}
                  </p>

                  <h3 className="font-semibold text-base mb-2">{blog.title}</h3>
                  <p className="text-md text-neutral-600">{blog.excerpt}</p>
                </div>

                {/* Footer Button */}
                <div className="mt-auto">
                  <button className="flex items-center gap-2 text-md font-medium text-neutral-950 hover:translate-x-1 transition">
                    Learn More <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mx-auto flex mt-15 items-center gap-2 text-neutral-950 border border-neutral-950 rounded-full px-6 py-2 text-md hover:bg-neutral-200 transition">
          Show more
          <ArrowDown />
        </button>
      </div>
    </section>
  );
}
