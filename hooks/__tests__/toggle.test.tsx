import {renderHook, act} from "@testing-library/react-hooks"
import useToggle from "../toggle"

describe("useToggle", () => {
  test("should toggle from false to true in a expected way", () => {
    const {result} = renderHook(() => useToggle())

    // initialState is set to false
    expect(result.current.state).toBeFalsy()

    // we now change the state to true
    act(() => {
      result.current.toTrue()
    })

    // state should be true
    expect(result.current.state).toBeTruthy()

    // we set it back to false
    act(() => {
      result.current.toFalse()
    })

    // state should be false
    expect(result.current.state).toBeFalsy()

    // we toggle the current state
    act(() => {
      result.current.toggle()
    })

    // state should be true
    expect(result.current.state).toBeTruthy()

    // we toggle the current state
    act(() => {
      result.current.toggle()
    })

    // state should be false
    expect(result.current.state).toBeFalsy()
  })
})
