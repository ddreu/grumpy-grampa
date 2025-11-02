"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function NewsletterSection({ className = "" }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // <-- Add this

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(""); // reset status

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success"); // <-- success
        setEmail("");
      } else {
        setStatus("error"); // <-- error
        console.error(data.error);
      }
    } catch (err) {
      setStatus("error"); // <-- error
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <section
      className={`relative max-w-7xl mx-5 sm:mx-auto bg-black text-white rounded-4xl overflow-hidden flex flex-col md:flex-row items-center justify-between px-5 sm:px-0 pt-9 ${className}`}
    >
      <div
        className="absolute inset-0 bg-[url('/lines.svg')] bg-cover bg-center opacity-20 pointer-events-none"
        aria-hidden="true"
      />
      <div className="hidden sm:flex relative z-10 items-end justify-center">
        <Image
          src="/newsletter.png"
          alt="Elderly couple wearing white shirts"
          width={550}
          height={550}
          className="object-contain"
        />
      </div>
      <div className="relative z-10 md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-5 sm:mb-2">
          Sign Up To Our Newsletter
        </h2>
        <p className="text-gray-300 mb-8 sm:mb-6 text-sm md:text-base">
          Subscribe to our newsletter and receive the latest news & amazing
          deals on Grumpy Grandpa.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white/10 rounded-full overflow-hidden border border-white/20 max-w-md mx-auto mb-8 sm:mb-0 sm:mx-0"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition"
            disabled={loading}
          >
            <ArrowRight size={20} />
          </button>
        </form>

        {status === "success" && (
          <p className="text-green-400 mt-2">Subscribed successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-400 mt-2">Failed to subscribe. Try again.</p>
        )}
      </div>
    </section>
  );
}
