"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterSection({ className = "" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setEmail("");
        toast.success("Thanks for subscribing!", {
          description: "You are now signed up for our newsletter.",
        });
      } else {
        setStatus("error");
        toast.error("Something went wrong.", {
          description: "Please try again later.",
        });
      }
    } catch (err) {
      setStatus("error");
      toast.error("An unexpected error occurred.", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <section
      className={`relative max-w-7xl mx-5 sm:mx-auto bg-black text-white rounded-4xl overflow-hidden flex flex-col md:flex-row items-center justify-between px-5 sm:px-0 pt-9 ${className}`}
    >
      {/* background */}
      <div
        className="absolute inset-0 bg-[url('/lines.svg')] bg-cover bg-center opacity-20 pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* image */}
      <div className="hidden sm:flex relative z-10 items-end justify-center">
        <Image
          src="/newsletter.png"
          alt="Newsletter illustration"
          width={550}
          height={550}
          className="object-contain"
        />
      </div>

      {/* form */}
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
            required
            className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white cursor-pointer text-black p-3 rounded-full hover:bg-gray-200 transition disabled:opacity-50"
            disabled={status === "loading"}
          >
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}
