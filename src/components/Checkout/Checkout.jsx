"use client";
import Image from "next/image";
import { useState } from "react";

export default function CheckoutPage() {
  const [shipping, setShipping] = useState("standard");

  return (
    <div className="min-h-screen text-neutral-950 py-10">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="flex-1 space-y-8">
          <h1 className="text-3xl font-bold">Checkout</h1>

          {/* Contact */}
          <div>
            <h2 className="font-semibold mb-3">Contact</h2>
            <input
              type="email"
              placeholder="Email or mobile phone number"
              className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
            <div className="flex items-center mt-3 gap-2">
              <input type="checkbox" id="offers" />
              <label htmlFor="offers" className="text-sm">
                Email me with news and offers
              </label>
            </div>
            <div className="mt-2">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Sign in
              </a>
            </div>
          </div>

          {/* Delivery */}
          <div>
            <h2 className="font-semibold mb-3">Delivery</h2>
            <select
              className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400 mb-3"
              defaultValue=""
            >
              <option value="" disabled>
                Select country
              </option>
              <option>Philippines</option>
              <option>USA</option>
              <option>Canada</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="First Name (optional)"
                className="border border-neutral-300 rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-neutral-300 rounded-md px-3 py-2"
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              className="w-full border border-neutral-300 rounded-md px-3 py-2 mb-3"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full border border-neutral-300 rounded-md px-3 py-2 mb-3"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input
                type="text"
                placeholder="City"
                className="border border-neutral-300 rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Select state"
                className="border border-neutral-300 rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Zip Code"
                className="border border-neutral-300 rounded-md px-3 py-2"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="saveInfo" />
              <label htmlFor="saveInfo" className="text-sm">
                Save this information for next time
              </label>
            </div>
          </div>

          {/* Shipping Method */}
          <div>
            <h2 className="font-semibold mb-3">Shipping Method</h2>
            <div className="space-y-2">
              <label className="flex justify-between items-center border border-neutral-300 rounded-md px-4 py-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value="economy"
                    checked={shipping === "economy"}
                    onChange={() => setShipping("economy")}
                  />
                  <span>
                    Economy{" "}
                    <span className="text-sm text-neutral-500 block">
                      5 to 8 business days
                    </span>
                  </span>
                </div>
                <span className="font-semibold">FREE</span>
              </label>

              <label className="flex justify-between items-center border border-neutral-950 rounded-md px-4 py-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shipping === "standard"}
                    onChange={() => setShipping("standard")}
                  />
                  <span>
                    Standard{" "}
                    <span className="text-sm text-neutral-500 block">
                      3 to 6 business days
                    </span>
                  </span>
                </div>
                <span className="font-semibold">$10.00</span>
              </label>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="font-semibold mb-3">Payment</h2>
            <div className="space-y-3">
              {/* Credit Card */}
              <label className="flex items-center gap-2 font-medium">
                <input type="radio" name="payment" defaultChecked />
                Credit Card
                <span className="ml-auto flex gap-1">
                  <Image src="/visa.png" width={40} height={24} alt="Visa" />
                  <Image
                    src="/mastercard.png"
                    width={40}
                    height={24}
                    alt="MasterCard"
                  />
                </span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Card number"
                  className="border border-neutral-300 rounded-md px-3 py-2 col-span-2"
                />
                <input
                  type="text"
                  placeholder="Name on card"
                  className="border border-neutral-300 rounded-md px-3 py-2 col-span-2"
                />
                <input
                  type="text"
                  placeholder="Expiration date (MM/YY)"
                  className="border border-neutral-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Security code"
                  className="border border-neutral-300 rounded-md px-3 py-2"
                />
              </div>

              {/* PayPal */}
              <label className="flex items-center gap-2 font-medium">
                <input type="radio" name="payment" />
                PayPal
              </label>

              {/* Money Order */}
              <label className="flex items-center gap-2 font-medium">
                <input type="radio" name="payment" />
                Money Order
              </label>
            </div>
          </div>

          {/* Pay Button */}
          <button className="w-full bg-neutral-950 text-white py-3 rounded-md mt-6 hover:bg-neutral-900 transition">
            Pay Now
          </button>
        </div>

        {/* Right Section */}
        <div className="lg:w-[350px] w-full space-y-6">
          <div className="space-y-4">
            {/* Items */}
            <div className="flex justify-between items-center border border-neutral-300 rounded-md p-3">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14">
                  <Image
                    src="/shirt1.png"
                    alt="T-Shirt 012"
                    fill
                    className="object-cover rounded-md"
                  />
                  <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    1
                  </span>
                </div>
                <span className="font-medium text-sm">T-Shirt 012</span>
              </div>
              <span className="font-medium">$27.99</span>
            </div>

            <div className="flex justify-between items-center border border-neutral-300 rounded-md p-3">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14">
                  <Image
                    src="/shirt2.png"
                    alt="T-Shirt 008"
                    fill
                    className="object-cover rounded-md"
                  />
                  <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    1
                  </span>
                </div>
                <span className="font-medium text-sm">T-Shirt 008</span>
              </div>
              <span className="font-medium">$27.99</span>
            </div>

            {/* Promo */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type the promo/discount code"
                className="flex-1 border border-neutral-300 rounded-md px-3 py-2"
              />
              <button className="bg-neutral-950 text-white px-4 py-2 rounded-md hover:bg-neutral-900">
                Apply
              </button>
            </div>

            {/* Summary */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal (2 items)</span>
                <span>$55.98</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-$12.00</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction Fee</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-neutral-300 pt-2 font-semibold flex justify-between">
                <span>Total</span>
                <span>USD 53.98</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
