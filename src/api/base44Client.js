const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
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

export const base44 = {
  entities: {
    Product: {
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
                    }
                  }
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
          compare_price: node.compareAtPriceRange?.minVariantPrice?.amount
            ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
            : null,
          image_url: node.images.edges[0]?.node.url || '',
          category: node.collections.edges[0]?.node.handle || 'uncategorized',
        }));
      },

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
                  }
                }
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
          long_description: node.description,
          price: parseFloat(node.priceRange.minVariantPrice.amount),
          compare_price: node.compareAtPriceRange?.minVariantPrice?.amount
            ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
            : null,
          image_url: node.images.edges[0]?.node.url || '',
          images: node.images.edges.map(({ node: img }) => img.url),
          category: node.collections.edges[0]?.node.handle || 'uncategorized',
          frustration: null,
          freedom: null,
        }];
      },
    },
  },
};