import { gql } from '~/utils/gql-identity-tag';

export const getPageBySlug = gql`
  fragment TextBlockFragment on TextBlock {
    headline
  }

  fragment HeroTeaserFragment on HeroTeaser {
    headline
    image {
      title
      url
    }
  }

  query getPageBySlug($slug: String, $preview: Boolean) {
    pageCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
      items {
        contentCollection(limit: 100) {
          __typename
          items {
            __typename
            ...TextBlockFragment
            ...HeroTeaserFragment
          }
        }
      }
    }
  }
`;
