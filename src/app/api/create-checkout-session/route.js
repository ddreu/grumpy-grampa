import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { lineItems } = await req.json();

    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lines: lineItems.map((item) => ({
          merchandiseId: item.variantId,
          quantity: parseInt(item.quantity, 10),
        })),
      },
    };

    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const result = await response.json();
    console.log("Shopify cartCreate result:", JSON.stringify(result, null, 2));

    const userErrors = result.data?.cartCreate?.userErrors || [];
    if (userErrors.length > 0) {
      return NextResponse.json(
        { error: "Shopify userErrors", details: userErrors },
        { status: 400 }
      );
    }

    const checkoutUrl = result.data?.cartCreate?.cart?.checkoutUrl;
    if (checkoutUrl) {
      return NextResponse.json({ checkoutUrl });
    } else {
      return NextResponse.json(
        { error: "Failed to create checkout", result },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error creating cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
