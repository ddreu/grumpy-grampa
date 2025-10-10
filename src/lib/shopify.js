// lib/shopify.js
import { GraphQLClient, gql } from "graphql-request";

// Shopify Storefront API configuration
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const shopify = new GraphQLClient(
  `https://${domain}/api/2025-10/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": token,
      "Content-Type": "application/json",
    },
  }
);
// query for logo //

// ----------------------
// Query to get store logo
// ----------------------
export async function fetchStoreLogo(filename = "Black_Wordmark.svg") {
  const query = gql`
    query getStoreLogo($filename: String!) {
      files(first: 1, query: $filename) {
        edges {
          node {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopify.request(query, {
      filename: `filename:${filename}`,
    });
    return data.files?.edges[0]?.node?.image || null;
  } catch (error) {
    console.error("Error fetching store logo:", error);
    return null;
  }
}

// ----------------------
// Query to get products
// ----------------------
export const GET_PRODUCTS = gql`
  query getProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          images(first: 5) {
            # Fetch first 5 images
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

// ----------------------
// Query to get menu items
// ----------------------
export const GET_MENU = gql`
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        id
        title
        url
      }
    }
  }
`;

/**
 * Fetch menu items by handle (default: "main-menu")
 * @param {string} handle - The menu handle in Shopify
 * @returns {Array} Array of menu items
 */
export async function fetchMenu(handle = "main-menu") {
  try {
    const data = await shopify.request(GET_MENU, { handle });
    return data.menu?.items || [];
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
}

/**
 * Example function to fetch products
 */
export async function fetchProducts() {
  try {
    const data = await shopify.request(GET_PRODUCTS);
    return data.products.edges.map((edge) => {
      const product = edge.node;
      // Flatten images
      const images = product.images.edges.map((imgEdge) => imgEdge.node);
      // Flatten variants
      const variants = product.variants.edges.map((vEdge) => vEdge.node);
      return { ...product, images, variants };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
