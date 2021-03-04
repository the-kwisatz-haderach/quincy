import React, { ReactElement } from 'react'
import { Filter } from './types'

interface Props {
  filter: Filter
  onSelectItem: (item: Filter['value']) => void
}

const FilterButton: React.FC<Props> = ({
  filter,
  onSelectItem,
}): ReactElement => {
  return (
    <button
      className={`${
        filter.isSelected ? 'bg-green-800' : ''
      } bg-green-600 transition-colors focus:outline-none hover:bg-green-800 text-white py-2 px-3 rounded-3xl text-sm`}
      onClick={() => {
        onSelectItem(filter.value)
      }}
    >
      {filter.label ?? filter.value}
    </button>
  )
}

export default FilterButton
