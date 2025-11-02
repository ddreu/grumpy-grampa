"use client";
import Image from "next/image";

export default function LoginCard() {
  const handleLogin = () => {
    // ✅ Redirect directly to Shopify’s new customer account page
    window.location.href = "https://shopify.com/64394362940/account";
  };

  return (
    <section
      className="relative max-w-7xl mx-5 md:mx-auto bg-neutral-50 border border-gray-300 shadow-sm
      text-white rounded-4xl overflow-hidden flex flex-col md:flex-row 
      items-stretch justify-between px-2 md:px-0 pt-15 my-20"
    >
      <div
        className="absolute inset-0 bg-[url('/login/lines-2.svg')] bg-cover bg-center opacity-20 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 hidden md:flex items-end justify-center md:w-1/2">
        <Image
          src="/login/login.png"
          alt="Grumpy Grampa"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      <div className="relative z-10 md:w-1/2 flex flex-col items-start justify-center text-left px-6 md:px-10 space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
          Welcome To Grumpy Grampa
        </h2>
        <p className="text-sm text-neutral-700">
          Sign in to your customer account.
        </p>

        <button
          onClick={handleLogin}
          className="w-full mb-13 md:mb-0 bg-black cursor-pointer text-white py-3 rounded-2xl font-medium hover:bg-neutral-800 transition"
        >
          Continue to Login
        </button>
      </div>
    </section>
  );
}
