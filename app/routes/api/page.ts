import type { LoaderArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { getPageBySlug } from '~/graphql/page';
import type { GetPageBySlugQuery } from '~/generated/types';
import { convertPage } from '~/converters/page';
import { fetchFromGraphQL } from '../../utils/fetch-graphl';

export const loader = async ({ request, context }: LoaderArgs) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  const res = await fetchFromGraphQL({
    context,
    query: getPageBySlug,
    variables: { slug },
  });

  type PageResponse = {
    data: GetPageBySlugQuery;
  };

  // Takes the response stream  and turns it into an JavaScript object.. (more or less I guess..)
  const { data }: PageResponse = await res.json();
  const convertedData = convertPage(data);

  /*
   * This is a shortcut for creating `application/json` responses.
   * Converts `data` to JSON and sets the `Content-Type` header.
   */
  return json(convertedData);
};
