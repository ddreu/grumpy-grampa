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

// ----------------------
// Shopify Cart Functions
// ----------------------

//  Create Cart
export const CREATE_CART = gql`
  mutation CreateCart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

//  Add Line Item to Cart
export const ADD_TO_CART = gql`
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
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
                  image {
                    url
                  }
                  price {
                    amount
                    currencyCode
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

//  Get Cart
export const GET_CART = gql`
  query GetCart($id: ID!) {
    cart(id: $id) {
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
                image {
                  url
                }
                price {
                  amount
                  currencyCode
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
`;

//  Remove Line Item
export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        lines(first: 20) {
          edges {
            node {
              id
              quantity
            }
          }
        }
      }
    }
  }
`;
export const GET_COLLECTIONS_WITH_GROUPS = gql`
  query getCollectionsWithGroups {
    collections(first: 50) {
      edges {
        node {
          id
          title
          handle
          metafield(namespace: "filters", key: "group") {
            value
          }
        }
      }
    }
  }
`;

export const UPDATE_CART_LINE = gql`
  mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
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
// Query to get blog articles
// ----------------------
export const GET_BLOG_ARTICLES = gql`
  query getBlogArticles($handle: String!) {
    blog(handle: $handle) {
      title
      articles(first: 10, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            excerpt
            content
            publishedAt
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

// export async function fetchBlogArticleByHandle(handle) {
//   const query = gql`
//     query ArticleByHandle($handle: String!) {
//       blog(handle: "news") {
//         articleByHandle(handle: $handle) {
//           id
//           title
//           contentHtml
//           excerpt
//           publishedAt
//           image {
//             url
//             altText
//           }
//         }
//       }
//     }
//   `;
export async function fetchBlogArticleByHandle(
  articleHandle,
  blogHandle = "news"
) {
  const query = gql`
    query ArticleByHandle($blogHandle: String!, $articleHandle: String!) {
      blog(handle: $blogHandle) {
        articleByHandle(handle: $articleHandle) {
          id
          title
          contentHtml
          excerpt
          publishedAt
          image {
            url
            altText
          }
        }
      }
    }
  `;

  try {
    // const data = await shopify.request(query, { handle });
    const data = await shopify.request(query, {
      blogHandle,
      articleHandle,
    });
    return data.blog?.articleByHandle || null;
  } catch (error) {
    console.error("Error fetching blog article by handle:", error);
    return null;
  }
}
/**
 * Fetch all blog posts from a given blog handle
 * @param {string} handle - The handle of the blog (e.g., "news", "blog", "stories")
 */
export async function fetchBlogArticles(handle = "news") {
  try {
    const data = await shopify.request(GET_BLOG_ARTICLES, { handle });
    const articles = data.blog?.articles?.edges?.map((edge) => edge.node) || [];
    return articles;
  } catch (error) {
    console.error("Error fetching blog articles:", error);
    return [];
  }
}

export async function updateCartLine(cartId, lineId, quantity) {
  const data = await shopify.request(UPDATE_CART_LINE, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  return data.cartLinesUpdate.cart;
}

export async function fetchCollectionsByGroup() {
  try {
    const data = await shopify.request(GET_COLLECTIONS_WITH_GROUPS);

    const collections = data.collections.edges
      .map((edge) => {
        const collection = edge.node;
        const group = collection.metafield?.value; // no default
        if (!group) return null; // skip collections without a group
        return { ...collection, group };
      })
      .filter(Boolean); // remove nulls

    const grouped = collections.reduce((acc, col) => {
      if (!acc[col.group]) acc[col.group] = [];
      acc[col.group].push(col);
      return acc;
    }, {});

    return grouped; // only collections with a group
  } catch (error) {
    console.error("Error fetching collections by group:", error);
    return {};
  }
}

// ----------------------
// Reusable Cart Functions
// ----------------------

/** Create a new cart and return it */
export async function createCart() {
  const data = await shopify.request(CREATE_CART);
  return data.cartCreate.cart;
}

/** Fetch a cart by ID */
export async function fetchCart(id) {
  const data = await shopify.request(GET_CART, { id });
  return data.cart;
}

/** Add product variant to cart */
export async function addToCart(cartId, variantId, quantity = 1) {
  const data = await shopify.request(ADD_TO_CART, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return data.cartLinesAdd.cart;
}

/** Remove line item from cart */
export async function removeFromCart(cartId, lineId) {
  const data = await shopify.request(REMOVE_FROM_CART, {
    cartId,
    lineIds: [lineId],
  });
  return data.cartLinesRemove.cart;
}

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
