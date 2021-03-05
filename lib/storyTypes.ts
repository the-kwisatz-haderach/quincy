import { StoryData } from 'storyblok-js-client'
import {
  StoryBlokComponent,
  StoryBlokComponentType,
  StoryContent,
} from './blokTypes'
import { GlobalSettings, Post } from './types'

export type StoryType = string | 'page' | 'post' | 'global'

export type Story<Fields extends Record<string, unknown> = {}> = StoryData<
  StoryContent<StoryBlokComponentType, Fields>
> & { default_full_slug: string }

export type PageStory = Story<{ body?: StoryBlokComponent[] }>
export type PostStory = Story<Post>
export type GlobalStory = Story<GlobalSettings>

export type Stories = PageStory | PostStory | GlobalStory
