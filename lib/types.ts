import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Richtext } from 'storyblok-js-client'
import { StoryBlokComponent } from './blokTypes'

export type StoryBlokLink = {
  id: number
  slug: string
  name: string
  is_folder: boolean
  parent_id: number
  published: boolean
  position: number
  uuid: string
  is_startpage: boolean
  real_path: string
  alternates: { path: string; name: null | string; lang: string }[]
}

export type Color =
  | 'primary-dark'
  | 'primary-light'
  | 'secondary-dark'
  | 'secondary-light'

export type Post = {
  title: string
  image: string
  intro: string
  long_text: Richtext
}

export type Headline = {
  title: string
  description: string
  color: Color
}

export type RichTextBlok = {
  text: Richtext
}

export type HeroImage = {
  title: string
  subtitle: string
  description: string
  image: string
}

export type Grid = {
  columns: StoryBlokComponent[]
  col_count: number
  grid_gap: number
}

export type SocialChannelLink = {
  title: string
  url: string
  icon: IconDefinition
}

export type MenuItem = {
  title: string
  url: string
}

export type GlobalSettings = {
  logo: string
  facebook: string
  instagram: string
  twitter: string
}
