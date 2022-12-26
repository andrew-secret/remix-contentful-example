import type {
  LoaderArgs,
  LoaderFunction,
  TypedResponse,
} from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useCatch, useLoaderData, Link } from '@remix-run/react';
import React from 'react';
import type { HeroTeaser } from '~/converters/hero-teaser';
import type { TextBlock } from '~/converters/text-block';
import { httpMiddleware } from '~/utils/http';

type PageLoaderData = Array<HeroTeaser | TextBlock>;
type PageLoaderResponse = Promise<TypedResponse<PageLoaderData>>;

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderArgs): PageLoaderResponse => {
  await httpMiddleware(request);
  const { origin, searchParams } = new URL(request.url);
  const preview = searchParams.get('preview') === 'true';

  const pageBySlugEndpoint = `${origin}/api/page?slug=${
    params['*'] ? params['*'] : '/'
  }${preview ? '&preview=true' : ''}`;

  const res = await fetch(pageBySlugEndpoint, {
    method: 'GET',
  });

  if (res.status === 404) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return json(await res.json());
};

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>{caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
      <Link to="/">Go to main page</Link>
    </div>
  );
}

export default function Page() {
  const pageLoader: PageLoaderData = useLoaderData<typeof loader>();

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
