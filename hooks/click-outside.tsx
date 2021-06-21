import {useEffect, RefObject} from "react"

type HandlerEvent = MouseEvent | TouchEvent
type Handler = (event: HandlerEvent) => void

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
) => {
  useEffect(() => {
    const listener = (event: HandlerEvent) => {
      const element = ref?.current

      // If we click inside the ref area, do nothing
      if (!element || element.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchcancel", listener)
    // document.addEventListener("touchstart", listener) // for mobile and ipads

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchcancel", listener)
    }
  }, [handler, ref])
}

export default useOnClickOutside
