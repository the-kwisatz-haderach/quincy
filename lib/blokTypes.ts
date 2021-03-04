import { Richtext, StoryblokComponent } from 'storyblok-js-client'
import { Grid, Headline, HeroImage, RichTextBlok } from './types'

export type StoryBlokComponentType =
  | string
  | 'teaser'
  | 'grid'
  | 'full-width-content'
  | 'headline'
  | 'hero-image'
  | 'rich-text'

export type StoryContent<
  Type extends StoryBlokComponentType,
  Fields extends Record<string, unknown>
> = StoryblokComponent<Type> & Fields

export type TeaserBlok = StoryContent<'teaser', { headline: string }>
export type GridBlok = StoryContent<'grid', Grid>
export type FullWidthContentBlok = StoryContent<
  'full-width-content',
  { body: Richtext }
>
export type HeadlineBlok = StoryContent<'headline', Headline>
export type HeroImageBlok = StoryContent<'hero-image', HeroImage>

export type StoryBlokComponent =
  | StoryContent<'rich-text', RichTextBlok>
  | GridBlok
  | FullWidthContentBlok
  | HeadlineBlok
  | HeroImageBlok
