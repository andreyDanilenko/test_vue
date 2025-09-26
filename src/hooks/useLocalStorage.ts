import { ref, watch } from 'vue'

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const storedValue = ref<T>(defaultValue)

  const getStoredValue = (): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error)
      return defaultValue
    }
  }

  const setStoredValue = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  storedValue.value = getStoredValue()

  watch(storedValue, (newValue) => {
    setStoredValue(newValue)
  }, { deep: true })

  return storedValue
}
