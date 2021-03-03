import React, { ReactElement } from 'react'
import { GridBlok } from '../../lib/types'

export default function Grid({ columns }: GridBlok): ReactElement {
  return (
    <div className="grid gap-5 grid-cols-3">
      {columns.map((col) => (
        <div>{col.name}</div>
      ))}
    </div>
  )
}
