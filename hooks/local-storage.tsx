import {useState} from "react"

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const storedItem = typeof window !== "undefined" ? window.localStorage.getItem(key) : null
      return storedItem ? JSON.parse(storedItem) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((value: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      typeof window !== "undefined"
        ? window.localStorage.setItem(key, JSON.stringify(valueToStore))
        : null
    } catch (error) {
      console.error(error)
    }
  }
  return {storedValue, setValue}
}

export default useLocalStorage
