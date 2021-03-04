import { useCallback, useState } from 'react'

const useSet = <T extends any>(initialValues: T[]) => {
  const [values, setValues] = useState(new Set(initialValues))

  const add = useCallback((value: T) => {
    setValues((currentValues) => {
      currentValues.add(value)
      return new Set(currentValues)
    })
  }, [])

  const remove = useCallback((value: T) => {
    setValues((currentValues) => {
      currentValues.delete(value)
      return new Set(currentValues)
    })
  }, [])

  const toggle = useCallback(
    (value: T) => {
      if (values.has(value)) {
        remove(value)
      } else {
        add(value)
      }
    },
    [values]
  )

  return {
    current: values,
    add,
    remove,
    toggle,
  }
}

export default useSet
