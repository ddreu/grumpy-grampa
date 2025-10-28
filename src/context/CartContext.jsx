"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createCart,
  fetchCart,
  removeFromCart,
  addToCart as shopifyAddToCart,
  shopify,
} from "@/lib/shopify";
import { gql } from "graphql-request";
import { toast } from "sonner";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  function normalizeId(id) {
    return id?.startsWith("gid://") ? id : `gid://shopify/ProductVariant/${id}`;
  }
  // Initialize cart on load
  useEffect(() => {
    async function initCart() {
      setLoading(true);
      try {
        const existingId = localStorage.getItem("cartId");
        let currentCart = null;

        if (existingId) {
          currentCart = await fetchCart(existingId);
        }

        if (!currentCart) {
          currentCart = await createCart();
          localStorage.setItem("cartId", currentCart.id);
        }

        setCart(currentCart);
      } catch (err) {
        console.error("Cart initialization error:", err);
      } finally {
        setLoading(false);
      }
    }
    initCart();
  }, []);

  // Add or update item
  async function handleAddToCart(variantId, quantity = 1, lineId = null) {
    if (!cart?.id) return;
    setLoading(true);

    try {
      let updatedCart;

      // 1️⃣ Always fetch the latest cart to ensure we have current line IDs
      const currentCart = await fetchCart(cart.id);

      // 2️⃣ Check if this variant already exists in cart
      // const existingLine = currentCart.lines.edges.find(
      //   (edge) => edge.node.merchandise.id === variantId
      // );
      const normalizedVariantId = normalizeId(variantId);
      const existingLine = currentCart.lines.edges.find(
        (edge) => normalizeId(edge.node.merchandise.id) === normalizedVariantId
      );

      if (existingLine) {
        // If variant already exists, update its quantity instead of adding a new line
        const newQuantity = existingLine.node.quantity + quantity;

        const UPDATE_CART_LINES = gql`
          mutation UpdateCartLines(
            $cartId: ID!
            $lines: [CartLineUpdateInput!]!
          ) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
              cart {
                id
                checkoutUrl
                lines(first: 20) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                          price {
                            amount
                          }
                          compareAtPrice {
                            amount
                          }
                          image {
                            url
                          }
                        }
                      }
                    }
                  }
                }
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        `;

        const data = await shopify.request(UPDATE_CART_LINES, {
          cartId: cart.id,
          lines: [{ id: existingLine.node.id, quantity: newQuantity }],
        });

        updatedCart = data.cartLinesUpdate.cart;
      } else if (lineId) {
        // If specific lineId provided → just update it directly
        const UPDATE_CART_LINES = gql`
          mutation UpdateCartLines(
            $cartId: ID!
            $lines: [CartLineUpdateInput!]!
          ) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
              cart {
                id
                checkoutUrl
                lines(first: 20) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                          price {
                            amount
                          }
                          compareAtPrice {
                            amount
                          }
                          image {
                            url
                          }
                        }
                      }
                    }
                  }
                }
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        `;

        const data = await shopify.request(UPDATE_CART_LINES, {
          cartId: cart.id,
          lines: [{ id: lineId, quantity }],
        });

        updatedCart = data.cartLinesUpdate.cart;
      } else {
        // Otherwise, add as a new line
        // updatedCart = await shopifyAddToCart(cart.id, variantId, quantity);
        updatedCart = await shopifyAddToCart(
          cart.id,
          normalizedVariantId,
          quantity
        );
      }

      setCart(updatedCart);

      // check for stock

      // Find the affected line
      const affectedLine = updatedCart.lines.edges.find(
        (line) => normalizeId(line.node.merchandise.id) === normalizedVariantId
      );

      // Show toast if requested quantity exceeds available stock
      if (affectedLine && affectedLine.node.quantity < quantity) {
        toast.error(
          `Only ${affectedLine.node.quantity} of this item available`,
          { description: "Cannot add more than available stock." }
        );
      }
    } catch (err) {
      console.error("Cart update error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Update an existing cart line to a different variant
  async function handleUpdateCartLine(lineId, variant, quantity = 1) {
    if (!cart?.id) return;
    if (loading) return;

    setLoading(true);

    const UPDATE_CART_LINES = gql`
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 20) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                        handle
                      }
                      price {
                        amount
                      }
                      compareAtPrice {
                        amount
                      }
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      console.log("🟡 Updating line:", { lineId, quantity, variant });

      // 🧠 Validate IDs
      if (!lineId?.startsWith("gid://")) {
        console.warn("⚠️ lineId is not a Shopify GID:", lineId);
      }
      if (!cart?.id?.startsWith("gid://")) {
        console.warn("⚠️ cartId is not a Shopify GID:", cart.id);
      }

      // 🧩 Build payload dynamically
      const linesPayload = variant?.id
        ? [{ id: lineId, merchandiseId: normalizeId(variant.id), quantity }]
        : [{ id: lineId, quantity }];

      console.log("🧾 Sending update payload:", {
        cartId: cart.id,
        linesPayload,
      });

      // 🚀 Send update to Shopify
      const response = await shopify.request(UPDATE_CART_LINES, {
        cartId: cart.id,
        lines: linesPayload,
      });

      console.log("✅ Shopify response:", response);

      // 🧩 Handle userErrors
      const userErrors = response?.cartLinesUpdate?.userErrors;
      if (userErrors?.length) {
        console.error("❌ Shopify userErrors:", userErrors);
        const currentCart = await fetchCart(cart.id);
        setCart(currentCart);
        return;
      }

      // Update cart state
      if (response?.cartLinesUpdate?.cart) {
        // ALWAYS set cart from server
        const updatedCart = response.cartLinesUpdate.cart;
        setCart(updatedCart);

        //check for stock
        // Find affected line
        const updatedLine = updatedCart.lines.edges.find(
          (line) => line.node.id === lineId
        );

        // Show toast if requested quantity exceeds available stock
        if (updatedLine && updatedLine.node.quantity < quantity) {
          toast.error(
            `Only ${updatedLine.node.quantity} of this item available`,
            { description: "Cannot add more than available stock." }
          );
        }
      } else {
        // fallback to fetching cart if mutation fails
        const refreshedCart = await fetchCart(cart.id);
        setCart(refreshedCart);
      }
    } catch (err) {
      console.error("🔥 Cart line update error:", err);
      const currentCart = await fetchCart(cart.id);
      setCart(currentCart);
    } finally {
      setLoading(false);
    }
  }

  // Remove line
  async function handleRemoveFromCart(lineId) {
    if (!cart?.id) return;
    setLoading(true);

    try {
      const updatedCart = await removeFromCart(cart.id, lineId);
      setCart(updatedCart);
    } catch (err) {
      console.error("Cart remove error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateCartLine: handleUpdateCartLine,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
