// import matchMediaPolyfill from "mq-polyfill"
import {cleanup, render} from "@testing-library/react"
import MatchMediaMock from "jest-matchmedia-mock"
import preloadAll from "jest-next-dynamic"
import matchMediaPolyfill from "mq-polyfill"

import {below} from "../../../styles/media-query"
import Header from "../header"

let matchMedia: MatchMediaMock
beforeAll(() => {
  matchMediaPolyfill(window)
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event("resize"))
  }
})

beforeAll(async () => {
  matchMedia = new MatchMediaMock()
  await preloadAll()
})

afterEach(() => {
  cleanup()
  matchMedia.clear()
})

describe("header", () => {
  test("should ", () => {
    render(<Header />)
    matchMedia.useMediaQuery(below.laptop)
    // window.resizeTo(1200, 1000)
    // window.matchMedia(above.laptop)

    // screen.debug()
  })
})
