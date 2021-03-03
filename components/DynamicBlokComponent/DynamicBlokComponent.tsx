import React, { ReactElement } from 'react'
import SbEditable from 'storyblok-react'
import {
  StoryBlokComponentType,
  StoryBlokComponent,
  TeaserBlok,
} from '../../lib/types'
import { FullWidthContent } from '../FullWidthContent'
import { Grid } from '../Grid'
import { Headline } from '../Headline'

export interface Props {
  blok: StoryBlokComponent
}

const Teaser: React.FC<TeaserBlok> = ({ headline }) => <div>{headline}</div>

const components: {
  [key in StoryBlokComponentType]: React.FC<any>
} = {
  teaser: Teaser,
  grid: Grid,
  'full-width-content': FullWidthContent,
  headline: Headline,
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
