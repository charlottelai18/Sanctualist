// Shopify Storefront API client
const SHOPIFY_STORE_DOMAIN = 'sanctualist.myshopify.com';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'YOUR_TOKEN_HERE';

export async function shopifyFetch(query) {
  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    }
  );
  return response.json();
}

export const base44 = {
  entities: {
    Product: {
      list: async () => [],
    },
    Order: {
      list: async () => [],
    },
  },
};