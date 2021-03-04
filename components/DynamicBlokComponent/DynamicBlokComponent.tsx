import React, { ReactElement } from 'react'
import SbEditable from 'storyblok-react'
import {
  StoryBlokComponent,
  StoryBlokComponentType,
  TeaserBlok,
} from '../../lib/blokTypes'
import { FullWidthContent } from '../FullWidthContent'
import { GridBlok } from '../GridBlok'
import { Headline } from '../Headline'
import { HeroImage } from '../HeroImage'
import { RichTextBlok } from '../RichTextBlok'

export interface Props {
  blok: StoryBlokComponent
}

const Teaser: React.FC<TeaserBlok> = ({ headline }) => <div>{headline}</div>

const components: {
  [key in StoryBlokComponentType]: React.FC<any>
} = {
  teaser: Teaser,
  grid: GridBlok,
  'full-width-content': FullWidthContent,
  headline: Headline,
  'hero-image': HeroImage,
  'rich-text': RichTextBlok,
}

export default function DynamicBlokComponent({ blok }: Props): ReactElement {
  if (!components[blok.component]) {
    console.error(`Missing component: ${blok.component}.`)
    return <div>There is no component defined for type: {blok.component}.</div>
  }
  const Component = components[blok.component]
  return (
    <SbEditable content={blok}>
      <Component {...blok} />
    </SbEditable>
  )
}
