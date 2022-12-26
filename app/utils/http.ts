import { removeTrailingSlashes } from './remove-slashes';

/**
 * @name httpMiddleware
 * @external https://developer.mozilla.org/en-US/docs/Glossary/Middleware
 * @description Basic middlware for incomming HTTP requests. Good place to handle some redirects...
 * @param request
 */
export async function httpMiddleware(request: Request): Promise<void> {
  await removeTrailingSlashes(request);
}
