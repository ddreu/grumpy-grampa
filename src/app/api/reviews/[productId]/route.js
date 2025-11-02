import { NextResponse } from "next/server";

export async function GET(req, context) {
  const params = await context.params; // ✅ await the params property
  const { productId } = params;

  try {
    // 1️⃣ Fetch Judge.me products to find matching Judge.me product ID
    const productsRes = await fetch(
      `https://judge.me/api/v1/products?shop_domain=${process.env.JUDGEME_SHOP_DOMAIN}&api_token=${process.env.JUDGEME_API_TOKEN}`
    );

    if (!productsRes.ok) {
      console.error("Failed to load Judge.me products");
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    const productsData = await productsRes.json();
    const match = productsData.products?.find(
      (p) => String(p.external_id) === String(productId)
    );

    if (!match) {
      console.warn(
        "No matching Judge.me product found for Shopify ID:",
        productId
      );
      return NextResponse.json({ reviews: [], averageRating: 0, count: 0 });
    }

    const judgeMeProductId = match.id;

    // 2️⃣ Fetch reviews using Judge.me’s product ID
    const reviewsRes = await fetch(
      `https://judge.me/api/v1/reviews?shop_domain=${process.env.JUDGEME_SHOP_DOMAIN}&api_token=${process.env.JUDGEME_API_TOKEN}&product_id=${judgeMeProductId}`,
      { cache: "no-store" }
    );

    if (!reviewsRes.ok) {
      console.error("Failed to load reviews:", await reviewsRes.text());
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 }
      );
    }

    const data = await reviewsRes.json();
    const reviews = data.reviews || [];
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        : 0;

    return NextResponse.json({
      reviews,
      averageRating,
      count: reviews.length,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
