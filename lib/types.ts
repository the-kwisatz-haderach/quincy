import { StoryblokComponent, StoryData } from 'storyblok-js-client'

export type StoryType = 'page'

export type StoryBlokComponentType = 'teaser' | 'grid'

// Stories
export type Story<Fields extends Record<string, unknown> = {}> = StoryData<
  StoryContent<StoryBlokComponentType, Fields>
>

export type HomeStory = Story<{ body: StoryBlokComponent[] }>
export type AboutStory = Story<{ body?: StoryBlokComponent[] }>
export type ContactStory = Story<{ body?: StoryBlokComponent[] }>

export type Stories = HomeStory | AboutStory | ContactStory

// Story content
export type StoryContent<
  Type extends StoryBlokComponentType,
  Fields extends Record<string, unknown>
> = StoryblokComponent<Type> & Fields

export type TeaserBlok = StoryContent<'teaser', { headline: string }>
export type GridBlok = StoryContent<'grid', { columns: { name: string }[] }>

export type StoryBlokComponent = TeaserBlok | GridBlok
