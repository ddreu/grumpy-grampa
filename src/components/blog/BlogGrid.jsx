"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import CalendarIcon from "../icons/Calendar";
import { fetchBlogArticles } from "@/lib/shopify";
import Link from "next/link";

export default function BlogGrid() {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    async function loadBlogs() {
      const articles = await fetchBlogArticles("news"); // use your blog handle here
      setBlogs(articles);
    }
    loadBlogs();
  }, []);

  const showAll = () => setVisibleCount(blogs.length);

  return (
    <section className="text-neutral-950 py-18">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6 text-left">Our Blogs</h2>
        <p className="text-md text-neutral-600 text-left mb-12">
          Stories, tips, and a few grumbles about life, love, and the art of
          spoiling grandkids.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {blogs.slice(0, visibleCount).map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-4xl shadow-sm overflow-hidden text-left transition hover:shadow-md flex flex-col"
            >
              <div className="h-52 w-full relative">
                {blog.image ? (
                  <Image
                    src={blog.image.url}
                    alt={blog.image.altText || blog.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-neutral-100 w-full h-full" />
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <p className="text-sm text-neutral-500 mb-2 flex items-center gap-1.5">
                    <CalendarIcon size={16} className="mr-1.5" />
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  <h3 className="font-semibold text-base mb-2">{blog.title}</h3>
                  <p className="text-md text-neutral-600">
                    {blog.excerpt ||
                      (blog.content
                        ? blog.content.slice(0, 100) + "..."
                        : "Read more...")}
                  </p>
                </div>

                <div className="mt-auto">
                  <Link
                    href={`/Blog/${blog.handle}`}
                    className="flex items-center gap-2 text-md font-medium text-neutral-950 hover:translate-x-1 transition"
                  >
                    Learn More <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more button */}
        {visibleCount < blogs.length && (
          <button
            onClick={showAll}
            className="mx-auto flex mt-15 items-center gap-2 text-neutral-950 border border-neutral-950 rounded-full px-6 py-2 text-md hover:bg-neutral-200 transition"
          >
            Show more
            <ArrowDown />
          </button>
        )}
      </div>
    </section>
  );
}
