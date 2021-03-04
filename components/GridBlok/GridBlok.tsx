import React, { ReactElement } from 'react'
import type { GridBlok as GridBlokType } from '../../lib/blokTypes'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export default function GridBlok({
  columns,
  grid_gap,
  col_count,
}: GridBlokType): ReactElement {
  return (
    <div
      className={`contained grid grid-flow-col gap-${grid_gap} grid-cols-${col_count}`}
    >
      {columns.map((col) => (
        <DynamicBlokComponent key={col._uid} blok={col} />
      ))}
    </div>
  )
}
