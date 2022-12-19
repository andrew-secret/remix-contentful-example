import type { HeroTeaserFragmentFragment } from '~/generated/types';

export type HeroTeaser = {
  type: 'HeroTeaser';
  headline: string;
  imageTitle: string;
  imageUrl: string;
};

export const convertHeroTeaserFragment = (
  heroTeaser: HeroTeaserFragmentFragment,
): HeroTeaser => ({
  // eslint-disable-next-line no-underscore-dangle
  type: 'HeroTeaser',
  headline: heroTeaser.headline ?? '',
  imageTitle: heroTeaser.image?.title ?? '',
  imageUrl: heroTeaser.image?.url ?? '',
});
