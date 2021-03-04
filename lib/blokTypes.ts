import { Richtext, StoryblokComponent } from 'storyblok-js-client'
import { Headline } from './types'

export type StoryBlokComponentType =
  | 'teaser'
  | 'grid'
  | 'full-width-content'
  | 'headline'

export type StoryContent<
  Type extends StoryBlokComponentType,
  Fields extends Record<string, unknown>
> = StoryblokComponent<Type> & Fields

export type TeaserBlok = StoryContent<'teaser', { headline: string }>
export type GridBlok = StoryContent<'grid', { columns: { name: string }[] }>
export type FullWidthContentBlok = StoryContent<
  'full-width-content',
  { body: Richtext }
>
export type HeadlineBlok = StoryContent<'headline', Headline>

export type StoryBlokComponent =
  | TeaserBlok
  | GridBlok
  | FullWidthContentBlok
  | HeadlineBlok
