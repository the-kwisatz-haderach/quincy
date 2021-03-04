import React, { ReactElement } from 'react'
import { PageStory } from '../../lib/storyTypes'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export interface Props {
  story: PageStory
}

export default function Page({ story }: Props): ReactElement {
  return (
    <div>
      {story.content.body
        ? story.content.body.map((blok) => (
            <DynamicBlokComponent key={blok._uid} blok={blok} />
          ))
        : null}
    </div>
  )
}
