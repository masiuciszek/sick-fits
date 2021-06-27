/* eslint-disable @typescript-eslint/no-var-requires */
import {render, cleanup, screen} from "@testing-library/react"
import Navigation from "../nav"

const useRouter = jest.spyOn(require("next/router"), "useRouter")
afterAll(() => {
  jest.clearAllMocks()
  cleanup()
})

describe("nav", () => {
  test("renders with all the expected routes", async () => {
    useRouter.mockImplementation(() => ({pathname: "/blog"}))
    render(<Navigation />)

    // expected routes should exist in the document
    expect(screen.getByText(/blog/i).closest("a")).toHaveAttribute("href", "/blog")
    expect(screen.getByText(/about/i).closest("a")).toHaveAttribute("href", "/about")
    expect(screen.getByText(/bites/i).closest("a")).toHaveAttribute("href", "/bites")
    expect(screen.getByText(/contact/i).closest("a")).toHaveAttribute("href", "/contact")
  })

  test("active class and non active class for route /blog", () => {
    useRouter.mockImplementation(() => ({pathname: "/blog"}))
    render(<Navigation />)

    expect(screen.getByText(/blog/i).parentElement).toHaveClass("active")
    expect(screen.getByText(/about/i).parentElement).toHaveClass("non-active")
    expect(screen.getByText(/bites/i).parentElement).toHaveClass("non-active")
    expect(screen.getByText(/contact/i).parentElement).toHaveClass("non-active")
  })
})
