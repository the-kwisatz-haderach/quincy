import { Richtext, StoryblokComponent } from 'storyblok-js-client'
import { Headline, HeroImage } from './types'

export type StoryBlokComponentType =
  | string
  | 'teaser'
  | 'grid'
  | 'full-width-content'
  | 'headline'
  | 'hero-image'

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
export type HeroImageBlok = StoryContent<'hero-image', HeroImage>

export type StoryBlokComponent =
  | TeaserBlok
  | GridBlok
  | FullWidthContentBlok
  | HeadlineBlok
  | HeroImageBlok
