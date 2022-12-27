import type { GetPageBySlugQuery } from '~/_generated/types';
import { convertHeroTeaserFragment } from './hero-teaser';
import { convertTextBlockFragment } from './text-block';

export const convertPage = (pageData: GetPageBySlugQuery) => {
  const { pageCollection } = pageData;
  const contentItems = pageCollection?.items[0]?.contentCollection?.items;

  return contentItems?.map((item) => {
    // eslint-disable-next-line no-underscore-dangle
    switch (item?.__typename) {
      case 'HeroTeaser':
        return convertHeroTeaserFragment(item);
      case 'TextBlock':
        return convertTextBlockFragment(item);
      default:
        return null;
    }
  });
};
