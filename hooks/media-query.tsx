import {useEffect, useState} from "react"
import useHasMounted from "./has-mounted"

const useMediaQuery = (mediaQuery: string): boolean => {
  const [matches, setMatches] = useState(false)
  const isMounted = useHasMounted()

  useEffect(() => {
    const media = isMounted ? window.matchMedia(mediaQuery) : null
    if (media && matches !== media?.matches) {
      setMatches(media?.matches ?? false)
    }

    const listener = () => {
      setMatches(media?.matches ?? false)
    }

    media?.addEventListener("change", listener)
    return () => media?.removeEventListener("change", listener)
  }, [isMounted, matches, mediaQuery])
  return matches
}

export default useMediaQuery
