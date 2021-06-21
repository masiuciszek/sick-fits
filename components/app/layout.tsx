import styled from "@emotion/styled"
import Header from "./header"
import {FC, Fragment} from "react"

const Main = styled.main``

export const Layout: FC = ({children}) => {
  return (
    <Fragment>
      <Header />
      <Main>{children}</Main>
    </Fragment>
  )
}
