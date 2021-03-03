import React, { ReactElement } from 'react'
import SbEditable from 'storyblok-react'
import {
  StoryBlokComponentType,
  StoryBlokComponent,
  TeaserBlok,
} from '../../lib/types'
import { Grid } from '../Grid'

export interface Props {
  blok: StoryBlokComponent
}

const Teaser: React.FC<TeaserBlok> = ({ headline }) => <div>{headline}</div>

const components: {
  [key in StoryBlokComponentType]: React.FC<any>
} = {
  teaser: Teaser,
  grid: Grid,
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
