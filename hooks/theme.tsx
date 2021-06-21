import {useEffect} from "react"
import useLocalStorage from "./local-storage"

type ThemeValue = "dark" | "light"

const useTheme = (themeKey = "theme", themeValue: ThemeValue = "light") => {
  const {storedValue, setValue} = useLocalStorage(themeKey, themeValue)

  const handleTheme = () => {
    const nextTheme = storedValue === "light" ? "dark" : "light"
    setValue(nextTheme)
  }

  useEffect(() => {
    document.body.dataset.theme = storedValue
  }, [storedValue])

  return {storedTheme: storedValue, setTheme: setValue, handleTheme}
}

export default useTheme
