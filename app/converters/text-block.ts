import type { TextBlockFragmentFragment } from '~/_generated/types';

export type TextBlock = {
  type: 'TextBlock';
  headline: string;
};

export const convertTextBlockFragment = (
  textBlock: TextBlockFragmentFragment,
): TextBlock => ({
  // eslint-disable-next-line no-underscore-dangle
  type: 'TextBlock',
  headline: textBlock.headline ?? '',
});
