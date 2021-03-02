import React, { ReactElement } from 'react'
import { PageStory } from '../../lib/types'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export interface Props {
  story: PageStory
}

export default function Page({ story }: Props): ReactElement {
  return (
    <div>
      <h1>{story.name}</h1>
      <div>
        {story.content.body.map((blok) => (
          <DynamicBlokComponent blok={blok} />
        ))}
      </div>
    </div>
  )
}
