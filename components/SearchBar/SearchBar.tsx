import React, {
  ComponentProps,
  ReactElement,
  useCallback,
  useState,
} from 'react'
import { debounce } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

type Props = {
  onTypeQuery: (query: string) => void
} & ComponentProps<'div'>

export default function SearchBar({
  className,
  onTypeQuery,
  ...props
}: Props): ReactElement {
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = useCallback(
    debounce((e) => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      onTypeQuery(e.target.value)
    }, 100),
    []
  )

  return (
    <div {...props} className={`relative ${className}`}>
      <input
        type="text"
        className="placeholder-gray-400 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        onChange={handleSearch}
        placeholder="Sök efter inlägg..."
      />
      {isLoading && (
        <div className="absolute top-0 right-0 w-10 h-full flex justify-center items-center text-gray-400 text-xl">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        </div>
      )}
    </div>
  )
}
