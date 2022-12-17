import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as build from '@remix-run/dev/server-build';

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV + 'foo',
  getLoadContext: (context) => context.env,
});

export function onRequest(context) {
  return handleRequest(context);
}
