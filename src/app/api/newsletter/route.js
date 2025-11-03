import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ success: false, error: "Email is required" });
  }

  try {
    const response = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Revision: "2024-10-15",
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email,
                    },
                  },
                ],
              },
            },
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID,
                },
              },
            },
          },
        }),
      }
    );

    // Safely parse JSON if available
    let data = null;
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      console.error("Klaviyo API error:", JSON.stringify(data, null, 2));
      throw new Error(JSON.stringify(data));
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Klaviyo error:", err.message);
    return NextResponse.json({ success: false, error: err.message });
  }
}
