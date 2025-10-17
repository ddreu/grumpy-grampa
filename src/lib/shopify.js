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
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          images(first: 20) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          collections(first: 5) {
            edges {
              node {
                id
                title
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

// ----------------------
// Query to get single product by handle
// ----------------------
export const GET_PRODUCT_BY_HANDLE = gql`
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch single product by handle
 */
export async function fetchProduct(handle) {
  if (!handle) {
    console.error("fetchProduct called without a valid handle");
    return null;
  }

  try {
    const data = await shopify.request(GET_PRODUCT_BY_HANDLE, { handle });
    const product = data.product;

    if (!product) return null;

    // Flatten edges
    const images = product.images.edges.map((edge) => edge.node);
    const variants = product.variants.edges.map((edge) => edge.node);

    return { ...product, images, variants };
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error);
    return null;
  }
}

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
      const collections = product.collections.edges.map((edge) => edge.node);

      return { ...product, images, variants, collections };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
