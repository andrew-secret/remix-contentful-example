import { redirect } from '@remix-run/cloudflare';

export async function removeTrailingSlashes(request: Request) {
  const url = new URL(request.url);
  if (url.pathname.endsWith('/') && url.pathname !== '/') {
    throw redirect(url.pathname.slice(0, -1) + url.search);
  }
}
