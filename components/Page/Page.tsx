import React, { ReactElement } from 'react'
import { Stories } from '../../lib/types'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export interface Props {
  story: Stories
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
