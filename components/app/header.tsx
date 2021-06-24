import styled from "@emotion/styled"
import MarcellLogo from "@components/icons/marcell-logo"
import Navigation from "./nav"
import {above, below} from "@styles/media-query"
import Link from "next/link"
import Cmd from "@components/icons/cmd"
import useTheme from "@hooks/theme"
import Button from "@components/elements/button"
import Moon from "@components/icons/moon"
import Sun from "@components/icons/sun"
import {colors, elevations, sizes} from "@styles/styled-record"

const StyledHeader = styled.header`
  border: 2px solid red;
  max-height: ${sizes.headerHeight};
  display: flex;
  flex-flow: row wrap;
  background-color: ${colors.colorBgNavigation};
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
  top: 1.5rem;
  width: 10rem;
  display: flex;
  justify-content: space-between;
  /* box-shadow: ${elevations.shadow2Xl}; */

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
        <Button>
          <Cmd />
        </Button>
        <Button onClick={handleTheme}>{storedTheme === "dark" ? <Sun /> : <Moon />}</Button>
      </ButtonWrapper>
      <Navigation />
    </StyledHeader>
  )
}

export default Header
