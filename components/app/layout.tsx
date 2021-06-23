import styled from "@emotion/styled"
import Header from "./header"
import {FC, Fragment} from "react"
import {sizes} from "@styles/styled-record"
import Footer from "./footer"

const Main = styled.main`
  max-width: ${sizes.maxWidth};
  border: 1px solid red;
  margin: 0 auto;
  min-height: calc(
    110vh - ${sizes.headerHeight} * 2
  ); /**Footer and height footer height TIMES header height */
`

export const Layout: FC = ({children}) => {
  return (
    <Fragment>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Fragment>
  )
}
