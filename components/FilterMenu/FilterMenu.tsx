import React, { ReactElement } from 'react'
import FilterButton from './FilterButton'
import { Filter } from './types'

export interface Props {
  filters: Filter[]
  onSelectItem: (item: Filter['value']) => void
  title?: string
}

export default function FilterMenu({
  filters,
  title,
  onSelectItem,
}: Props): ReactElement {
  return (
    <div>
      {title && <p className="font-normal mb-2">{title}</p>}
      <div className="space-x-1 space-y-1">
        {filters.map((filter) => (
          <FilterButton
            key={filter.key ?? filter.value}
            onSelectItem={onSelectItem}
            filter={filter}
          />
        ))}
      </div>
    </div>
  )
}
