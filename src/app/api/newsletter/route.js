import { NextResponse } from "next/server";

const domain = process.env.SHOPIFY_ADMIN_DOMAIN;
const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const ADMIN_API = `https://${domain}/admin/api/2025-10/graphql.json`;

async function shopifyRequest(query, variables = {}) {
  const res = await fetch(ADMIN_API, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

const GET_CUSTOMER_BY_EMAIL = `
  query getCustomerByEmail($email: String!) {
    customers(first: 1, query: $email) {
      nodes {
        id
        email
        acceptsMarketing
      }
    }
  }
`;

const CREATE_CUSTOMER = `
  mutation createCustomer($email: String!) {
    customerCreate(input: {email: $email, acceptsMarketing: true}) {
      customer { id email }
      userErrors { field message }
    }
  }
`;

const UPDATE_CUSTOMER = `
  mutation updateCustomer($id: ID!) {
    customerUpdate(input: {id: $id, acceptsMarketing: true}) {
      customer { id email acceptsMarketing }
      userErrors { field message }
    }
  }
`;

export async function POST(req) {
  const { email } = await req.json();
  if (!email)
    return NextResponse.json({ error: "Email is required" }, { status: 400 });

  try {
    // Check if customer exists
    const data = await shopifyRequest(GET_CUSTOMER_BY_EMAIL, { email });
    const customer = data.data.customers.nodes[0];

    if (customer) {
      const update = await shopifyRequest(UPDATE_CUSTOMER, { id: customer.id });
      return NextResponse.json({
        success: true,
        customer: update.data.customerUpdate.customer,
      });
    } else {
      const create = await shopifyRequest(CREATE_CUSTOMER, { email });
      if (create.data.customerCreate.userErrors.length) {
        return NextResponse.json(
          { error: create.data.customerCreate.userErrors },
          { status: 400 }
        );
      }
      return NextResponse.json({
        success: true,
        customer: create.data.customerCreate.customer,
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
