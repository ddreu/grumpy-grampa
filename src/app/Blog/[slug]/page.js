import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { fetchBlogArticleByHandle } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/home-layout/Faq";
import NewsletterSection from "@/components/home-layout/Newsletter";
import CalendarIcon from "@/components/icons/Calendar";

export default async function BlogViewPage({ params }) {
  const { slug } = params;

  // Fetch the article using the handle (slug)
  const blog = await fetchBlogArticleByHandle(slug);

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Article not found</h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar buttonLabel="Back to Blog" buttonHref="/blog" />

      <main className="max-w-7xl mx-auto py-10 px-6">
        {/* Breadcrumb */}
        {/* <div className="pb-28"> */}
        <div className="text-lg font-bold text-neutral-500 mb-12">
          <Link href="/Blog" className="hover:underline text-neutral-700">
            All Blogs
          </Link>{" "}
          <span className="text-neutral-400">›</span>{" "}
          <span className="text-neutral-950">{blog.title}</span>
        </div>

        {/* Blog image */}
        {blog.image && (
          <div className="relative w-full h-96 mb-8 rounded-3xl overflow-hidden">
            <Image
              src={blog.image.url}
              alt={blog.image.altText || blog.title}
              fill
              className="absolute inset-0 w-full h-full object-cover object-top"
              priority
            />
          </div>
        )}

        {/* Blog title */}
        <h1 className="text-4xl font-bold mb-4 text-neutral-900">
          {blog.title}
        </h1>

        {/* Date */}
        <p className="text-neutral-500 flex text-sm mb-8">
          <CalendarIcon size={16} className="mr-2" />
          {new Date(blog.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Blog content */}
        <article
          className="prose prose-neutral max-w-none text-neutral-800"
          dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
        />

        {/* Share Section */}
        <div className="border-t border-neutral-200 pt-8 mt-12 mb-12">
          <h3 className="text-neutral-900 font-semibold mb-4">
            Share This Blog On:
          </h3>

          <div className="flex">
            {/* Facebook */}
            <Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center"
            >
              <img
                src="/blog/icons/fb.svg"
                alt="Share on Facebook"
                className="w-5 h-5"
              />
            </Link>
            {/* ig */}
            <Link
              href=""
              className="w-10 h-10 flex items-center justify-center"
            >
              <img
                src="/blog/icons/ig.svg"
                alt="Share via Email"
                className="w-5 h-5"
              />
            </Link>

            {/* x */}
            <Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center"
            >
              <img
                src="/blog/icons/x.svg"
                alt="Share on Twitter"
                className="w-5 h-5"
              />
            </Link>

            {/* LinkedIn */}
            <Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center"
            >
              <img
                src="/blog/icons/linked-in.svg"
                alt="Share on LinkedIn"
                className="w-5 h-5"
              />
            </Link>
          </div>
        </div>
        {/* </div> */}
        <FAQ />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
