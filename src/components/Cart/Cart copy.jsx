"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { fetchProduct } from "@/lib/shopify";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

export default function CartPage() {
  const { cart } = useCart();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!cart?.lines?.edges) return;

    async function loadCartItems() {
      const items = await Promise.all(
        cart.lines.edges.map(async ({ node }) => {
          const handle = node.merchandise.product.handle;
          const product = await fetchProduct(handle);
          if (!product) return null;

          const variant = product.variants.find(
            (v) => v.id === node.merchandise.id
          );

          return {
            id: node.id,
            name: product.title,
            variantId: variant.id,
            price: parseFloat(variant.price.amount),
            oldPrice: variant.compareAtPrice
              ? parseFloat(variant.compareAtPrice.amount)
              : parseFloat(variant.price.amount),
            image: product.images[0]?.url,
            variations: variant.selectedOptions.map((o) => o.value),
            quantity: node.quantity,
            description: product.description,
          };
        })
      );

      setCartItems(items.filter(Boolean));
    }

    loadCartItems();
  }, [cart]);

  //   if (loadingItems) {
  //     return (
  //       <div className="flex justify-center items-center h-[60vh]">
  //         <p className="text-neutral-500">Loading cart...</p>
  //       </div>
  //     );
  //   }

  if (!cartItems.length) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-neutral-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-10 px-5 sm:px-8 lg:px-20 bg-neutral-50">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-8 sm:mb-12">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Cart Items */}
        <div className="flex-1 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-start gap-4 bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 relative shadow-sm"
            >
              <div
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 cursor-pointer sm:static sm:order-3 sm:ml-auto"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={18} />
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <input
                  type="checkbox"
                  className="mt-2 accent-neutral-950 hidden sm:block"
                />

                <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-neutral-950">
                      {item.name}
                    </h2>
                    <p className="text-sm text-neutral-600">
                      <span className="text-neutral-950 font-medium">
                        ${item.price.toFixed(2)}
                      </span>{" "}
                      <span className="line-through text-neutral-400 ml-1">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    </p>

                    <p className="mt-2 text-sm text-neutral-500 font-medium">
                      Variation
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.variations.map((v) => (
                        <button
                          key={v}
                          className="border border-neutral-300 rounded-md px-3 py-1 text-sm text-neutral-700 hover:bg-neutral-200"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 sm:mt-3">
                    <p className="text-sm text-neutral-500">Quantity</p>
                    <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden">
                      <button
                        onClick={() =>
                          addToCart(
                            item.variantId,
                            Math.max(item.quantity - 1, 1),
                            item.id
                          )
                        }
                        className="px-3 py-1 text-sm text-neutral-600 hover:bg-neutral-200"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          addToCart(item.variantId, item.quantity + 1, item.id)
                        }
                        className="px-3 py-1 text-sm text-neutral-600 hover:bg-neutral-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button className="mx-auto block text-neutral-600 border border-neutral-300 rounded-full px-6 py-2 text-sm hover:bg-neutral-200 transition">
            See More
          </button>
        </div>

        {/* Right: Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-5 shadow-sm sticky top-6">
            {/* Discount */}
            <div>
              <p className="font-semibold text-neutral-900 mb-2">Discount</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Type in your discount code"
                  className="border border-neutral-300 rounded-md flex-1 px-3 py-2 text-sm outline-none"
                />
                <button className="bg-neutral-950 text-white text-sm px-4 py-2 rounded-md hover:bg-neutral-800 transition">
                  Apply
                </button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="font-semibold text-neutral-900 mb-2">Notes</p>
              <textarea
                placeholder="Type your notes"
                className="border border-neutral-300 rounded-md w-full px-3 py-2 text-sm h-24 outline-none resize-none"
              ></textarea>
            </div>

            {/* Summary */}
            <div className="border-t border-neutral-200 pt-3 space-y-2">
              <p className="flex justify-between text-sm text-neutral-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${cart?.cost?.subtotalAmount?.amount || "0.00"}</span>
              </p>
              <p className="flex justify-between text-sm text-neutral-600">
                <span>Discount</span>
                <span>-$0.00</span>
              </p>
              <p className="flex justify-between font-semibold text-neutral-950 text-base pt-2">
                <span>Total</span>
                <span>USD {cart?.cost?.totalAmount?.amount || "0.00"}</span>
              </p>
            </div>
            <Link
              href="/Checkout"
              className="w-full bg-neutral-950 text-white text-sm font-medium py-3 rounded-md hover:bg-neutral-900 transition text-center block"
            >
              Check Out
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
