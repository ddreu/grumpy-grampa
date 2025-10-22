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

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

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

      if (lineId) {
        // Update quantity of existing line
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
        // Add new line
        updatedCart = await shopifyAddToCart(cart.id, variantId, quantity);
      }

      setCart(updatedCart);
    } catch (err) {
      console.error("Cart update error:", err);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
