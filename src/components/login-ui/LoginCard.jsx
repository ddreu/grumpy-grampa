"use client";
import Image from "next/image";

export default function LoginCard() {
  return (
    <section
      className="relative max-w-7xl mx-auto bg-neutral-50 
    border border-gray-300 shadow-sm
    text-white rounded-4xl overflow-hidden flex flex-col md:flex-row 
    items-stretch justify-between px-0 md:px-0 pt-15 my-20"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/login/lines-2.svg')] bg-cover bg-center opacity-20 pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Left: Image (bottom aligned) */}
      <div className="relative z-10 flex items-end justify-center md:w-1/2">
        <Image
          src="/login/login.png"
          alt="Grumpy Grampa"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Right: Content (centered vertically) */}
      <div className="relative z-10 md:w-1/2 flex flex-col items-start justify-center text-left px-6 md:px-10 space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
          Welcome To Grumpy Grampa
        </h2>
        <p className="text-sm text-neutral-700">Please enter your email.</p>

        <form className="w-full space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 mb-10 py-3 border border-gray-300 rounded-lg text-neutral-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-2xl font-medium hover:bg-neutral-800 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
}
