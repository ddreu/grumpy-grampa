"use client";
import Image from "next/image";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react"; // Add useRef
import { useCart } from "@/context/CartContext";
import { fetchProduct } from "@/lib/shopify";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, updateCartLine } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const previousCartItemsRef = useRef([]); // Add ref to store previous cart items
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.id)
  );

  const subtotal = selectedCartItems.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        parseFloat(item.selectedVariant?.price?.amount || item.price || 0),
    0
  );

  const originalTotal = selectedCartItems.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        parseFloat(
          item.selectedVariant?.compareAtPrice?.amount || item.price || 0
        ),
    0
  );

  const discountTotal = Math.max(originalTotal - subtotal, 0);

  // Step 1: When cart changes fetch full product data
  useEffect(() => {
    async function loadProducts() {
      if (!cart?.lines?.edges?.length) {
        setCartItems([]); // Clear items if cart is empty
        return;
      }

      // Preserve existing cart items during loading
      const items = cart.lines.edges.map(({ node }) => {
        const merchandise = node.merchandise;

        // Find existing item from current items or previous items
        const existingItem =
          cartItems.find((item) => item.id === node.id) ||
          previousCartItemsRef.current.find((item) => item.id === node.id);

        // If we have existing data, use it to prevent flickering
        if (existingItem) {
          return {
            ...existingItem,
            quantity: node.quantity, // Update only the quantity
            price: parseFloat(
              merchandise?.price?.amount || merchandise?.priceV2?.amount || 0
            ),
          };
        }

        // If no existing item, create new basic item
        return {
          id: node.id,
          variantId: merchandise.id,
          variantTitle: merchandise.title,
          productHandle: merchandise.product?.handle,
          productTitle: merchandise.product?.title,
          price: parseFloat(
            merchandise?.price?.amount || merchandise?.priceV2?.amount || 0
          ),
          image: merchandise?.image?.url || "/placeholder.png",
          quantity: node.quantity,
        };
      });

      // Update cart items immediately to preserve state
      setCartItems(items);
      previousCartItemsRef.current = items; // Store current items in ref

      // Only fetch product data for items that don't have it
      const itemsNeedingData = items.filter((item) => !item.product);
      if (itemsNeedingData.length === 0) return;

      setIsLoading(true);
      try {
        const uniqueHandles = [
          ...new Set(
            itemsNeedingData.map((i) => i.productHandle).filter(Boolean)
          ),
        ];

        const products = await Promise.all(
          uniqueHandles.map(async (handle) => ({
            handle,
            data: await fetchProduct(handle),
          }))
        );

        // Update only items that need updating
        const enriched = items.map((item) => {
          if (item.product) return item; // Skip if already has product data

          const product = products.find(
            (p) => p.handle === item.productHandle
          )?.data;
          if (!product) return item;

          const selectedVariant =
            product.variants.find((v) => v.id === item.variantId) ||
            product.variants[0];

          return {
            ...item,
            product,
            selectedVariant,
            oldPrice: selectedVariant.compareAtPrice?.amount || null,
            discountPercent:
              selectedVariant.compareAtPrice?.amount &&
              Math.round(
                ((parseFloat(selectedVariant.compareAtPrice.amount) -
                  parseFloat(selectedVariant.price.amount)) /
                  parseFloat(selectedVariant.compareAtPrice.amount)) *
                  100
              ),
            variations:
              selectedVariant.selectedOptions?.map((opt) => opt.value) || [],
          };
        });

        setCartItems(enriched);
        previousCartItemsRef.current = enriched;
      } catch (error) {
        console.error("Error loading product data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [cart]);

  const handleCheckout = async () => {
    if (selectedCartItems.length === 0) {
      toast.error("Please select at least one item to checkout.", {
        description: "You need to select items before proceeding.",
      });
      return;
    }

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineItems: selectedCartItems }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.error("Failed to start checkout", {
          description: "Please try again later.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <section className="min-h-screen py-10 px-5 sm:px-8 lg:px-20 bg-neutral-50">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 mb-8 sm:mb-12">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-neutral-200 rounded-4xl">
              {/* <Image
                src="/placeholder.png"
                alt="Empty Cart"
                width={150}
                height={150}
                className="mb-4"
              /> */}
              <h2 className="text-xl font-semibold text-neutral-950 mb-2">
                Your cart is empty
              </h2>
              <p className="text-sm text-neutral-600 mb-4">
                Looks like you haven’t added anything yet.
              </p>
              <Link
                href="/Shop"
                className="px-6 py-3 bg-neutral-950 text-white rounded-md hover:bg-neutral-900 transition"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            (showAll ? cartItems : cartItems.slice(0, 4)).map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-start gap-4 bg-white border border-neutral-200 rounded-4xl p-4 sm:p-5 relative shadow-sm"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-neutral-950 cursor-pointer"
                  checked={selectedItems.includes(item.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems((prev) => [...prev, item.id]);
                    } else {
                      setSelectedItems((prev) =>
                        prev.filter((id) => id !== item.id)
                      );
                    }
                  }}
                />

                {/* Remove button */}

                <button
                  type="button"
                  aria-label={`Remove ${item.productTitle} from cart`}
                  className="absolute top-4 right-4 text-red-500 hover:text-neutral-900 cursor-pointer sm:static sm:order-3 sm:ml-auto"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={21} />
                </button>

                {/* Product details */}
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="w-33 h-48 mr-2 relative rounded-xl overflow-hidden flex-shrink-1">
                    <Image
                      src={item.image}
                      alt={item.productTitle}
                      fill
                      className="object-fill"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <h2 className="text-base mb-1 sm:text-2xl font-semibold text-neutral-950">
                      {item.productTitle}
                    </h2>

                    {/* Price Section */}
                    <div className="flex items-center gap-3">
                      <span className="text-1xl font-semibold text-gradient-gold">
                        $
                        {item.selectedVariant?.price?.amount
                          ? parseFloat(
                              item.selectedVariant.price.amount
                            ).toFixed(2)
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
                          <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                            {item.discountPercent}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Variants (hide if only Default Title exists) */}
                    {item.product?.variants?.length > 1 && (
                      <div className="mt-2">
                        <p className="text-sm font-semibold mb-2 text-neutral-950">
                          Variants:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.product.variants.map((variant) => {
                            if (variant.title === "Default Title") return null;

                            const isSelected = variant.id === item.variantId;
                            return (
                              <button
                                key={variant.id}
                                onClick={async () => {
                                  if (variant.id !== item.variantId) {
                                    // Update the cart line in backend
                                    await updateCartLine(
                                      item.id,
                                      variant,
                                      item.quantity
                                    );

                                    // Update the UI immediately
                                    setCartItems((prev) =>
                                      prev.map((i) =>
                                        i.id === item.id
                                          ? {
                                              ...i,
                                              variantId: variant.id,
                                              selectedVariant: variant,
                                              price: parseFloat(
                                                variant.price.amount
                                              ),
                                              oldPrice:
                                                variant.compareAtPrice
                                                  ?.amount || null,
                                              discountPercent:
                                                variant.compareAtPrice
                                                  ?.amount &&
                                                Math.round(
                                                  ((parseFloat(
                                                    variant.compareAtPrice
                                                      .amount
                                                  ) -
                                                    parseFloat(
                                                      variant.price.amount
                                                    )) /
                                                    parseFloat(
                                                      variant.compareAtPrice
                                                        .amount
                                                    )) *
                                                    100
                                                ),
                                            }
                                          : i
                                      )
                                    );
                                  }
                                }}
                                className={`border rounded-md px-3 py-1 text-sm transition bg-neutral-200 ${
                                  isSelected
                                    ? "text-neutral-950 border-black"
                                    : "border-neutral-300 text-neutral-950 hover:bg-neutral-200"
                                }`}
                              >
                                {variant.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Quantity controls */}
                    <div className="mt-4 sm:mt-3">
                      <p className="text-sm font-semibold mb-2 text-neutral-950">
                        Quantity:
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateCartLine(
                              item.id,
                              { id: item.variantId },
                              Math.max(item.quantity - 1, 1)
                            )
                          }
                          className="w-8 h-8 text-neutral-950 bg-neutral-200 flex items-center justify-center rounded-md hover:bg-neutral-100 transition text-lg font-semibold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartLine(
                              item.id,
                              { id: item.variantId },
                              Math.max(Number(e.target.value), 1)
                            )
                          }
                          className="w-14 border h-8 bg-neutral-200 text-neutral-950 border-neutral-950 rounded-md px-3 py-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                        />
                        <button
                          onClick={() =>
                            updateCartLine(
                              item.id,
                              { id: item.variantId },
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 bg-neutral-200 text-neutral-950 flex items-center justify-center rounded-md hover:bg-neutral-100 transition text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {cartItems.length > 4 && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="mx-auto flex items-center gap-2 text-neutral-950 border border-neutral-950 rounded-full px-6 py-2 text-md hover:bg-neutral-200 transition"
            >
              {showAll ? (
                <>
                  See Less <ArrowUp size={16} />
                </>
              ) : (
                <>
                  See More <ArrowDown size={16} /> ({cartItems.length - 4} more)
                </>
              )}
            </button>
          )}
        </div>

        {/* Right: Summary */}
        <div className="w-full lg:w-1/3">
          <div className="rounded-xl p-6 space-y-5 sticky top-6">
            {/* Discount */}
            <div>
              <p className="font-semibold text-neutral-900 mb-2">Discount</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Type in your discount code"
                  className="border border-neutral-300 rounded-md flex-1 px-3 py-2 text-sm outline-none"
                />
                <button className="bg-neutral-950 text-white text-sm px-8 py-4 rounded-md hover:bg-neutral-800 transition">
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

            <div className="border-t border-neutral-200 pt-3 space-y-2">
              <h2 className="text-lg font-bold mb-5">Summary</h2>
              <p className="flex justify-between text-sm text-neutral-600">
                <span>Subtotal ({selectedCartItems.length} items)</span>
                <span>${originalTotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-sm text-neutral-600">
                <span>Discount</span>
                <span>-${discountTotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between font-semibold text-neutral-950 text-base pt-2">
                <span>Total</span>
                <span>USD {subtotal.toFixed(2)}</span>
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-neutral-950 cursor-pointer text-white text-sm font-medium py-3 rounded-md hover:bg-neutral-900 transition text-center block"
            >
              Check Out ({selectedItems.length})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
