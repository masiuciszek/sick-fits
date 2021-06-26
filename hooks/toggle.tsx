import {useState} from "react"

interface Toggle {
  state: boolean
  toggle: () => void
  toTrue: () => void
  toFalse: () => void
}

const useToggle = (initialState = false): Toggle => {
  const [state, setState] = useState(initialState)

  const toTrue = (): void => {
    setState(true)
  }
  const toFalse = (): void => {
    setState(false)
  }
  const toggle = (): void => {
    setState((prev) => !prev)
  }

  return {state, toggle, toTrue, toFalse}
}

export default useToggle
