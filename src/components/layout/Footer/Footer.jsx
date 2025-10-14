"use client";
import Image from "next/image";
import Flag from "react-world-flags";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-50 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & tagline */}
        <div>
          <img
            src="/White_Wordmark.svg"
            alt="Grumpy Grampa Logo"
            className="h-8 w-auto mb-4"
          />
          <p className="text-neutral-500">
            Age doesn’t define your style—your attitude does.
          </p>

          {/* Socials */}
          <div className="mt-6">
            <p className="font-medium mb-3">Follow Us On</p>
            <div className="flex gap-4 text-neutral-50">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:opacity-80 transition"
              >
                <Image src="/fb.svg" alt="Facebook" width={20} height={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:opacity-80 transition"
              >
                <Image src="/ig.svg" alt="Instagram" width={20} height={20} />
              </a>
              <a
                href="#"
                aria-label="X"
                className="hover:opacity-80 transition"
              >
                <Image src="/x.svg" alt="X" width={20} height={20} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:opacity-80 transition"
              >
                <Image src="/in.svg" alt="LinkedIn" width={20} height={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-neutral-500">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Reviews</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Shopping Cart</a>
            </li>
            <li>
              <a href="#">Sign In</a>
            </li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-neutral-500">
            <li>
              <a href="#">Grandparents</a>
            </li>
            <li>
              <a href="#">Theme</a>
            </li>
            <li>
              <a href="#">Accessories</a>
            </li>
            <li>
              <a href="#">Home & Living</a>
            </li>
            <li>
              <a href="#">Featured</a>
            </li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="font-semibold mb-4">Information</h4>
          <ul className="space-y-2 text-neutral-500">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Refund Policy</a>
            </li>
            <li>
              <a href="#">Shopping Policy</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-neutral-800 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-xs">
          <p>
            Copyright © 2025 Grumpy Grampa LLC. All Rights Reserved. Powered by
            Merchously.
          </p>
          <div className="flex items-center gap-2 mt-3 md:mt-0">
            <Flag code="US" className="h-4 w-auto" alt="United States" />
            <span>United States</span>
            <span className="text-neutral-700">▼</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
