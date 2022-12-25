import type { LoaderArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { getPageBySlug } from '~/graphql/page';
import type { GetPageBySlugQuery } from '~/generated/types';
import { convertPage } from '~/converters/page';
import { fetchFromGraphQL } from '../../utils/fetch-graphl';

export const loader = async ({ request, context }: LoaderArgs) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  const preview = url.searchParams.get('preview') === 'true';

  const res = await fetchFromGraphQL({
    context,
    query: getPageBySlug,
    variables: { slug, preview },
  });

  type PageResponse = {
    data: GetPageBySlugQuery;
  };

  const { data }: PageResponse = await res.json();
  const convertedData = convertPage(data);

  if (!convertedData) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  /*
   * This is a shortcut for creating `application/json` responses.
   * Converts `data` to JSON and sets the `Content-Type` header.
   */
  return json(convertedData);
};
