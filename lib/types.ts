import { StoryblokComponent, StoryData } from 'storyblok-js-client'

export enum StoryType {
  PAGE = 'page',
}

export type StoryBlokComponentType = 'teaser' | 'grid'

// Stories
export type Story<Fields extends Record<string, unknown> = {}> = StoryData<
  StoryContent<StoryBlokComponentType, Fields>
>

export type PageStory = Story<{ body: StoryBlokComponent[] }>

// Story content
export type StoryContent<
  Type extends StoryBlokComponentType,
  Fields extends Record<string, unknown>
> = StoryblokComponent<Type> & Fields

export type TeaserBlok = StoryContent<'teaser', { headline: string }>
export type GridBlok = StoryContent<'grid', { columns: { name: string }[] }>

export type StoryBlokComponent = TeaserBlok | GridBlok
