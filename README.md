# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Prerequistes

1. Download and install latest Version of NodeJS (>=16.13.0). If node was installed via Homebrew you just need to update it.

2. Create Contentful account(if you're not familiar with the concept of a headless CMS, I highly recommend to check out the [documentation of Contentful](https://www.contentful.com/developers/docs/).).

3. Setup Cloudflare account together with a Cloudflare Pages project. For more information you can check out the [cloudflare documentation](https://developers.cloudflare.com/pages/get-started/).

## Development

### Setup secrets

1. Create a `.env` and `.dev.vars` file in the root directory of your project.
2. Generate API tokens in Contentful (`Settings -> API Keys`):

```bash
CONTENTFUL_SPACE="YOUR_SPACE_ID"
CONTENTFUL_ENVIRONMENT="master"
CONTENTFUL_DELIVERY_ACCESS_TOKEN="YOUR_DELIVERY_ACCESS_TOKEN"
CONTENTFUL_PREVIEW_ACCESS_TOKEN="YOUR_PREVIEW_ACCESS_TOKEN"
```

3. Paste your API keys into both files (`.env` and `.dev.vars`).

Don't share your secrets!

### Install dependencis

```sh
npm install
```

### Generate types

Generate typescript types from the Contentful GraphQL API:

```sh
npm run codegen
```

You'll find a `_generated` folder inside the `app` (this file should _NOT_ be modified/changed by you).

### Spin up dev server

You will be utilizing Wrangler for local development to emulate the Cloudflare runtime. This is already wired up in your package.json as the `dev` script:

```sh
# start the remix dev server and wrangler
npm run dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!

## Deployment

Cloudflare Pages are currently only deployable through their Git provider integrations.

If you don't already have an account, then [create a Cloudflare account here](https://dash.cloudflare.com/sign-up/pages) and after verifying your email address with Cloudflare, go to your dashboard and follow the [Cloudflare Pages deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything).

Configure the "Build command" should be set to `npm run build`, and the "Build output directory" should be set to `public`.

## Contentful

Contentful is a headless content management system (CMS). You upload your content (be it text, images, or video) to Contentful, and from there can organize and edit it as you desire. What sets Contentful apart from other CMSes is that it’s not page-based. In other CMSes, you adapt your content to the software. With Contentful, it’s the other way around. This concept is called content modeling.

### Contentful Preview

In addition to the Content Delivery API (CDA) for published content, is the Preview API for previewing unpublished content as though it were published. It maintains the same behaviour and parameters as the CDA, but delivers the latest draft for entries and assets.

### Setup content preview in Contentful

Before you can use the Content preview feature of Contentful you need to configure it under `Settings -> Content preview`

1. Click on `Add content preview`
2. Define a name under `General information` (e.g. Page preview)
3. Check the `page` checkbox
4. Enter preview URL: https://your-domain.dev/{entry.fields.slug}?preview=true
5. Hit save button.

**You can trigger the preview by appending `?preview=true` query paramter to your current URL.**
