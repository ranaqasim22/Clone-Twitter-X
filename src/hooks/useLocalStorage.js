import { useCallback, useState } from 'react'

function readValue(key, initialValue) {
  if (typeof window === 'undefined') return initialValue

  try {
    const savedValue = window.localStorage.getItem(key)
    return savedValue === null ? initialValue : JSON.parse(savedValue)
  } catch {
    return initialValue
  }
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => readValue(key, initialValue))

  const setValue = useCallback((value) => {
    setStoredValue((currentValue) => {
      const nextValue = value instanceof Function ? value(currentValue) : value
      try {
        window.localStorage.setItem(key, JSON.stringify(nextValue))
      } catch {
        // State still updates when storage is unavailable or full.
      }
      return nextValue
    })
  }, [key])

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // Keep the in-memory reset when storage is unavailable.
    }
    setStoredValue(initialValue)
  }, [initialValue, key])

  return { storedValue, setValue, removeValue }
}
