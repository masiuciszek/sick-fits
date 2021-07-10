import styled from "@emotion/styled"
import {sizes} from "@styles/styled-record"
import {FC, Fragment} from "react"

import Footer from "./footer"
import Header from "./header"

const Main = styled.main`
  max-width: ${sizes.maxWidth};
  margin: 0 auto;
  min-height: calc(
    110vh - ${sizes.headerHeight} * 2
  ); /**Footer and height footer height TIMES header height */
  margin-bottom: 2rem;
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
