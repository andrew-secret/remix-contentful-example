import type { LoaderArgs, TypedResponse } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import type { HeroTeaser } from '~/converters/hero-teaser';
import type { TextBlock } from '~/converters/text-block';

/**
 * @description This loader fetches from the Resource route using fetch.
 */

type PageLoaderResponse = Promise<TypedResponse<Array<HeroTeaser | TextBlock>>>;

export const loader = async ({
  params,
  request,
}: LoaderArgs): PageLoaderResponse => {
  const { origin } = new URL(request.url);

  const pageBySlug = `${origin}/api/page?slug=${
    params.slug ? params.slug : '/'
  }`;

  const res = await fetch(pageBySlug, {
    method: 'GET',
  });

  return json(await res.json());
};

export default function Page() {
  const pageLoader = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      {pageLoader.map((content, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {content.type === 'TextBlock' && <h2>{content.headline}</h2>}
          {content.type === 'HeroTeaser' && (
            <div>
              <img
                style={{ width: '100%' }}
                alt={content.imageTitle}
                src={content.imageUrl}
              />
              {content.headline}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
