// lib/judgeme.js
export async function fetchProductReviews(productId) {
  const shopDomain = process.env.JUDGEME_SHOP_DOMAIN;
  const apiToken = process.env.JUDGEME_API_TOKEN;

  const res = await fetch(
    `https://judge.me/api/v1/reviews?shop_domain=${shopDomain}&api_token=${apiToken}&product_id=${productId}`,
    { next: { revalidate: 60 } } // cache for 1 min
  );

  if (!res.ok) throw new Error("Failed to fetch reviews");
  const data = await res.json();

  // Return reviews and average rating
  const reviews = data.reviews || [];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      : 0;

  return { reviews, averageRating, count: reviews.length };
}

export async function fetchSiteReviews() {
  const shopDomain = process.env.JUDGEME_SHOP_DOMAIN;
  const apiToken = process.env.JUDGEME_API_TOKEN;

  const res = await fetch(
    `https://judge.me/api/v1/reviews?shop_domain=${shopDomain}&api_token=${apiToken}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch site reviews");
  const data = await res.json();

  const reviews = data.reviews || [];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      : 0;

  return { reviews, averageRating, count: reviews.length };
}
