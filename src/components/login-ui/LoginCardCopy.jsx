"use client";
import Image from "next/image";

function generateState(length = 24) {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let s = "";
  for (let i = 0; i < length; i++)
    s += chars[(Math.random() * chars.length) | 0];
  return s;
}

export default function LoginCard() {
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) return alert("Please enter your email.");

    // Build a full redirect_uri that you must register in Shopify Admin
    const redirectUri = `${window.location.origin}/api/shopify/callback`; // <- register this exact URL in Shopify
    const state = generateState();
    localStorage.setItem("shopify_oauth_state", state);
    localStorage.setItem("loginEmail", email); // optional UX convenience

    const params = new URLSearchParams({
      client_id: "45bb2fb7-7367-4264-bfdc-53f1a412a574",
      locale: "en",
      redirect_uri: redirectUri, // must be absolute and registered
      region_country: "US",
      state,
      // recommended scopes
      scope: "openid email customer-account-api:full",
    });

    // Shopify's hosted login entry point
    const url = `https://shopify.com/authentication/64394362940/login?${params.toString()}`;

    // Redirect to Shopify auth UI
    window.location.href = url;
  }

  return (
    <section
      className="relative max-w-7xl mx-auto bg-neutral-50 border border-gray-300 shadow-sm
      text-white rounded-4xl overflow-hidden flex flex-col md:flex-row 
      items-stretch justify-between px-0 md:px-0 pt-15 my-20"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/login/lines-2.svg')] bg-cover bg-center opacity-20 pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Left: Image */}
      <div className="relative z-10 flex items-end justify-center md:w-1/2">
        <Image
          src="/login/login.png"
          alt="Grumpy Grampa"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Right: Content */}
      <div className="relative z-10 md:w-1/2 flex flex-col items-start justify-center text-left px-6 md:px-10 space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
          Welcome To Grumpy Grampa
        </h2>
        <p className="text-sm text-neutral-700">Please enter your email.</p>

        <form className="w-full space-y-3" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 mb-10 py-3 border border-gray-300 rounded-lg text-neutral-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <button
            type="submit"
            className="w-full bg-black cursor-pointer text-white py-3 rounded-2xl font-medium hover:bg-neutral-800 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
}
