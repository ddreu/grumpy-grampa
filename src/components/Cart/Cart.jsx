"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { fetchProduct } from "@/lib/shopify";

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [cartItems, setCartItems] = useState([]);

  // Step 1: When cart changes fetch full product data
  useEffect(() => {
    async function loadProducts() {
      if (!cart?.lines?.edges?.length) return;

      const items = cart.lines.edges.map(({ node }) => {
        const merchandise = node.merchandise;
        return {
          id: node.id,
          variantId: merchandise.id,
          variantTitle: merchandise.title,
          productHandle: merchandise.product?.handle,
          productTitle: merchandise.product?.title,
          price: parseFloat(merchandise.price?.amount || 0),
          image: merchandise?.image?.url || "/placeholder.png",
          quantity: node.quantity,
        };
      });

      // Fetch full products for each unique handle
      const uniqueHandles = [
        ...new Set(items.map((i) => i.productHandle).filter(Boolean)), // filter out undefined/null
      ];

      const products = await Promise.all(
        uniqueHandles.map(async (handle) => ({
          handle,
          data: await fetchProduct(handle),
        }))
      );

      // Map full product data back to cart items
      const enriched = items.map((item) => {
        const product = products.find(
          (p) => p.handle === item.productHandle
        )?.data;
        if (!product) return item;

        // Find the selected variant inside product
        const selectedVariant =
          product.variants.find((v) => v.id === item.variantId) ||
          product.variants[0];

        const discountPercent = selectedVariant.compareAtPrice?.amount
          ? Math.round(
              ((parseFloat(selectedVariant.compareAtPrice.amount) -
                parseFloat(selectedVariant.price.amount)) /
                parseFloat(selectedVariant.compareAtPrice.amount)) *
                100
            )
          : null;

        return {
          ...item,
          product,
          selectedVariant,
          oldPrice: selectedVariant.compareAtPrice?.amount || null,
          discountPercent,
          variations:
            selectedVariant.selectedOptions?.map((opt) => opt.value) || [],
        };
      });

      setCartItems(enriched);
    }

    loadProducts();
  }, [cart]);

  return (
    <section className="min-h-screen py-10 px-5 sm:px-8 lg:px-20 bg-neutral-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-8 sm:mb-12">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-start gap-4 bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 relative shadow-sm"
            >
              {/* Checkbox */}
              <div className="absolute top-4 left-4 sm:static flex-shrink-0">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-neutral-950 cursor-pointer"
                />
              </div>

              {/* Remove button */}
              <div
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 cursor-pointer sm:static sm:order-3 sm:ml-auto"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={18} />
              </div>

              {/* Product details */}
              <div className="flex items-start gap-3 sm:gap-4 flex-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.productTitle}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <h2 className="text-base sm:text-lg font-semibold text-neutral-950">
                    {item.productTitle}
                  </h2>

                  {/* Price Section */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-semibold text-gradient-gold">
                      $
                      {item.selectedVariant?.price?.amount
                        ? parseFloat(item.selectedVariant.price.amount).toFixed(
                            2
                          )
                        : parseFloat(item.price || 0).toFixed(2)}
                    </span>

                    {item.selectedVariant?.compareAtPrice?.amount && (
                      <>
                        <span className="text-neutral-400 line-through">
                          $
                          {parseFloat(
                            item.selectedVariant.compareAtPrice.amount
                          ).toFixed(2)}
                        </span>
                        <span className="bg-black text-white text-xs font-semibold px-3 py-2 rounded-full">
                          {item.discountPercent}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* All Variants */}
                  {item.product?.variants?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.product.variants.map((variant) => {
                        const isSelected = variant.id === item.variantId;
                        return (
                          <button
                            key={variant.id}
                            onClick={async () => {
                              // change variant logic
                              if (variant.id !== item.variantId) {
                                await removeFromCart(item.id); // remove current line
                                await addToCart(variant.id, item.quantity); // add selected variant
                              }
                            }}
                            className={`border rounded-md px-3 py-1 text-sm transition ${
                              isSelected
                                ? "bg-black text-white border-black"
                                : "border-neutral-300 text-neutral-700 hover:bg-neutral-200"
                            }`}
                          >
                            {variant.title}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Quantity controls */}
                  <div className="mt-4 sm:mt-3">
                    <p className="text-sm font-semibold mb-2 text-neutral-950">
                      Quantity:
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={async () => {
                          if (item.quantity > 1) {
                            await addToCart(
                              item.variantId,
                              item.quantity - 1,
                              item.id
                            );
                          } else {
                            await removeFromCart(item.id);
                          }
                        }}
                        className="w-10 h-10 text-neutral-950 bg-neutral-200 flex items-center justify-center border border-neutral-950 rounded-md hover:bg-neutral-100 transition text-lg font-semibold"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          addToCart(
                            item.variantId,
                            Math.max(Number(e.target.value), 1),
                            item.id
                          )
                        }
                        className="w-16 border bg-neutral-200 text-neutral-950 border-neutral-950 rounded-md px-3 py-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                      />
                      <button
                        onClick={() =>
                          addToCart(item.variantId, item.quantity + 1, item.id)
                        }
                        className="w-10 h-10 bg-neutral-200 text-neutral-950 flex items-center justify-center border border-neutral-950 rounded-md hover:bg-neutral-100 transition text-lg font-semibold"
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
            {/* <Link
              href="/Checkout"
              className="w-full bg-neutral-950 text-white text-sm font-medium py-3 rounded-md hover:bg-neutral-900 transition text-center block"
            >
              Check Out
            </Link> */}
            <button
              onClick={() => {
                if (cart?.checkoutUrl) {
                  window.location.href = cart.checkoutUrl;
                } else {
                  alert("Your cart is empty or not synced yet.");
                }
              }}
              className="w-full bg-neutral-950 text-white text-sm font-medium py-3 rounded-md hover:bg-neutral-900 transition text-center block"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
