import styled from "@emotion/styled"
import MarcellLogo from "@components/icons/marcell-logo"
import Navigation from "./nav"
import {above, below} from "@styles/media-query"
import Link from "next/link"
import Cmd from "@components/icons/cmd"
import {buttonResetStyles} from "@styles/css-helpers"
import useTheme from "@hooks/theme"
import {elements, elevations} from "@styles/styled-record"

const StyledHeader = styled.header`
  border: 2px solid red;
  min-height: 10rem;
  display: flex;
  flex-flow: row wrap;
  background-color: ${elements.background};
  @media ${below.mobileL} {
    flex-flow: column wrap;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
  @media ${above.tablet} {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`

const LogoWrapper = styled.div`
  border: 2px solid red;
  display: inline-block;
  display: flex;
  align-items: center;
  border: 2px solid red;
`

const ButtonWrapper = styled.div`
  position: fixed;
  right: 1rem;
  top: 3.5rem;
  /* border: 2px solid red; */
  width: 8rem;
  display: flex;
  justify-content: space-between;
  /* box-shadow: ${elevations.shadow2Xl}; */
  button {
    ${buttonResetStyles};
  }

  @media ${below.mobileL} {
    position: static;
  }
`

const Header = () => {
  const {storedTheme, handleTheme} = useTheme()

  return (
    <StyledHeader>
      <LogoWrapper>
        <Link href="/">
          <a>
            <MarcellLogo />
          </a>
        </Link>
      </LogoWrapper>
      <ButtonWrapper>
        <button>
          <Cmd />
        </button>
        <button onClick={handleTheme}>toggle theme</button>
      </ButtonWrapper>
      <Navigation />
    </StyledHeader>
  )
}

export default Header
