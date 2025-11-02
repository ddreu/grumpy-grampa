import { NextResponse } from "next/server";
import { fetchSiteReviews } from "@/lib/judgeme";

export async function GET() {
  try {
    const reviews = await fetchSiteReviews();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
