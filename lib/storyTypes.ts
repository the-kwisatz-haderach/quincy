import { StoryData } from 'storyblok-js-client'
import {
  StoryBlokComponent,
  StoryBlokComponentType,
  StoryContent,
} from './blokTypes'
import { Post } from './types'

export type StoryType = string | 'page' | 'post'

export type Story<Fields extends Record<string, unknown> = {}> = StoryData<
  StoryContent<StoryBlokComponentType, Fields>
>

export type PageStory = Story<{ body?: StoryBlokComponent[] }>
export type PostStory = Story<Post>

export type Stories = PageStory | PostStory
