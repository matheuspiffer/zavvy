import { useState, useEffect, useRef } from 'react'
import { Input } from '@zavvy/ui'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Buscar...' }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value)
  const onChangeRef = useRef(onChange)

  // Keep ref updated with latest callback
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  // Debounce search - uses ref to avoid dependency issues
  useEffect(() => {
    if (localValue === value) return

    const timer = setTimeout(() => {
      onChangeRef.current(localValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, value])

  // Sync with external value
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <Input
      type="search"
      placeholder={placeholder}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      className="w-[250px]"
    />
  )
}
