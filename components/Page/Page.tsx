import React, { ReactElement } from 'react'
import { Stories } from '../../lib/types'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export interface Props {
  story: Stories
}

export default function Page({ story }: Props): ReactElement {
  return (
    <div>
      <h1>{story.name}</h1>
      <div>
        {story.content.body
          ? story.content.body.map((blok) => (
              <DynamicBlokComponent key={blok._uid} blok={blok} />
            ))
          : null}
      </div>
    </div>
  )
}
