// import matchMediaPolyfill from "mq-polyfill"

import {cleanup, render} from "@testing-library/react"

import preloadAll from "jest-next-dynamic"
import Header from "../header"
import matchMediaPolyfill from "mq-polyfill"
import MatchMediaMock from "../../../test/match-media-mock"
import {below} from "../../../styles/media-query"

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
