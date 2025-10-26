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
      // Improve optimistic update to include full variant data
      setCart((prev) => {
        if (!prev) return prev;
        const updatedLines = prev.lines.edges.map((edge) =>
          edge.node.id === lineId
            ? {
                ...edge,
                node: {
                  ...edge.node,
                  quantity,
                  merchandise: {
                    ...variant,
                    product: {
                      ...variant.product,
                    },
                    price: variant.price || edge.node.merchandise.price,
                    compareAtPrice:
                      variant.compareAtPrice ||
                      edge.node.merchandise.compareAtPrice,
                    image: variant.image || edge.node.merchandise.image,
                  },
                },
              }
            : edge
        );
        return {
          ...prev,
          lines: { ...prev.lines, edges: updatedLines },
        };
      });

      // Make API request
      const response = await shopify.request(UPDATE_CART_LINES, {
        cartId: cart.id,
        lines: [
          {
            id: lineId,
            merchandiseId: variant.id,
            quantity,
          },
        ],
      });

      // Update with server response
      if (response?.cartLinesUpdate?.cart) {
        setCart(response.cartLinesUpdate.cart);
      }
    } catch (err) {
      console.error("Cart line update error:", err);

      // Revert optimistic update on error
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
