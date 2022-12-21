import type { AppLoadContext } from '@remix-run/cloudflare';

/**
 * @name fetchFromGraphQL
 * @external https://css-tricks.com/raw-graphql-querying
 * @description This function is used to fetch data from the GraphQL API.
 * Check out the link above for more information.
 */

type FetchFromGraphQL = {
  context: AppLoadContext;
  query: string;
  variables?: Record<string, any>;
};

export const fetchFromGraphQL = async ({
  context,
  query,
  variables,
}: FetchFromGraphQL) => {
  if (!context.CONTENTFUL_DELIVERY_ACCESS_TOKEN) {
    throw new Error('Contentful access token is missing!');
  }

  if (!context.CONTENTFUL_SPACE) {
    throw new Error('Contentful space id is missing!');
  }

  const body: any = { query };

  if (variables) body.variables = variables;

  const isPreview = variables?.preview;

  const accessToken = isPreview
    ? context.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : context.CONTENTFUL_DELIVERY_ACCESS_TOKEN;

  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${context.CONTENTFUL_SPACE}`,
    {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
    },
  );
};
