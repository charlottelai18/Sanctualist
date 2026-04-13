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
          id: node.id,
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
    },
  },
};