"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="relative max-w-7xl mx-5 sm:mx-auto bg-black text-white rounded-4xl overflow-hidden flex flex-col md:flex-row items-center justify-between px-5 sm:px-0 pt-9">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/lines.svg')] bg-cover bg-center opacity-20 pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Left: Image */}
      <div className="relative z-10 flex items-end justify-center">
        <Image
          src="/newsletter.png"
          alt="Elderly couple wearing white shirts"
          width={550}
          height={550}
          className="object-contain"
        />
      </div>

      {/* Right: Content */}
      <div className="relative z-10 md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
          Sign Up To Our Newsletter
        </h2>
        <p className="text-gray-300 mb-6 text-sm md:text-base">
          Subscribe to our newsletter and receive the latest news & amazing
          deals on Grumpy Grandpa.
        </p>

        <form className="flex items-center bg-white/10 rounded-full overflow-hidden border border-white/20 max-w-md mx-auto md:mx-0">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}
