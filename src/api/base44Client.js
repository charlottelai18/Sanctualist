// @ts-ignore
const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
// @ts-ignore
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

export async function shopifyFetch(query, variables = {}) {
  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  return response.json();
}

// Helper: parse compare_price safely (Shopify returns "0.0" when not set)
function parseComparePrice(amount) {
  const parsed = parseFloat(amount || 0);
  return parsed > 0 ? parsed : null;
}

// Helper: parse a metafield value by type
function parseMeta(metafield) {
  if (!metafield) return null;
  const { type, value } = metafield;
  if (type === 'list.single_line_text_field') {
    try { return JSON.parse(value); } catch { return null; }
  }
  if (type === 'number_decimal' || type === 'number_integer') {
    return parseFloat(value);
  }
  return value; // single_line_text_field, multi_line_text_field, etc.
}

export const base44 = {
  entities: {
    Product: {
      // Used by the Shop/listing page — fetches basic info + rating metafields
      list: async () => {
        const data = await shopifyFetch(`{
          products(first: 50) {
            edges {
              node {
                id
                title
                handle
                description
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                collections(first: 5) {
                  edges {
                    node {
                      handle
                      title
                    }
                  }
                }
                rating: metafield(namespace: "custom", key: "rating") {
                  value
                  type
                }
                review_count: metafield(namespace: "custom", key: "review_count") {
                  value
                  type
                }
              }
            }
          }
        }`);

        return data.data.products.edges.map(({ node }) => ({
          id: node.handle,
          name: node.title,
          handle: node.handle,
          description: node.description,
          price: parseFloat(node.priceRange.minVariantPrice.amount),
          compare_price: parseComparePrice(node.compareAtPriceRange?.minVariantPrice?.amount),
          image_url: node.images.edges[0]?.node.url || '',
          category: node.collections.edges[0]?.node.handle || 'uncategorized',
          rating: parseMeta(node.rating),
          review_count: parseMeta(node.review_count),
        }));
      },

      // Used by the Product Detail page — fetches all fields including metafields
      filter: async ({ id }) => {
        const handle = id;
        const data = await shopifyFetch(`
          query getProduct($handle: String!) {
            product(handle: $handle) {
              id
              title
              handle
              description

              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }

              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }

              collections(first: 5) {
                edges {
                  node {
                    handle
                    title
                  }
                }
              }

              # --- Metafields (set these up in Shopify Admin → Settings → Custom Data → Products) ---
              dimensions: metafield(namespace: "custom", key: "dimensions") {
                value
                type
              }
              features: metafield(namespace: "custom", key: "features") {
                value
                type
              }
              frustration: metafield(namespace: "custom", key: "frustration") {
                value
                type
              }
              freedom: metafield(namespace: "custom", key: "freedom") {
                value
                type
              }
              long_description: metafield(namespace: "custom", key: "long_description") {
                value
                type
              }
              rating: metafield(namespace: "custom", key: "rating") {
                value
                type
              }
              review_count: metafield(namespace: "custom", key: "review_count") {
                value
                type
              }
            }
          }
        `, { handle });

        const node = data.data.product;
        if (!node) return [];

        return [{
          id: node.handle,
          name: node.title,
          handle: node.handle,
          description: node.description,
          // Falls back to Shopify description if no custom long_description metafield set
          long_description: parseMeta(node.long_description) || node.description,
          price: parseFloat(node.priceRange.minVariantPrice.amount),
          compare_price: parseComparePrice(node.compareAtPriceRange?.minVariantPrice?.amount),
          image_url: node.images.edges[0]?.node.url || '',
          images: node.images.edges.map(({ node: img }) => img.url),
          // Shows collection title (e.g. "Morning Routine") instead of handle
          category: node.collections.edges[0]?.node.title || node.collections.edges[0]?.node.handle || 'uncategorized',
          // Metafields
          dimensions: parseMeta(node.dimensions),
          features: parseMeta(node.features),      // expects List type → parses to array
          frustration: parseMeta(node.frustration),
          freedom: parseMeta(node.freedom),
          rating: parseMeta(node.rating),
          review_count: parseMeta(node.review_count),
        }];
      },
    },
  },
};