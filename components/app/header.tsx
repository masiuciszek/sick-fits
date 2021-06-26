import {Fragment} from "react"
import {useHotkeys} from "react-hotkeys-hook"
import styled from "@emotion/styled"
import MarcellLogo from "@components/icons/marcell-logo"
import Navigation from "./nav"
import {above, below} from "@styles/media-query"
import Link from "next/link"
import Cmd from "@components/icons/cmd"
import useTheme, {ThemeValue} from "@hooks/theme"
import Button from "@components/elements/button"
import Moon from "@components/icons/moon"
import Sun from "@components/icons/sun"
import {colors, sizes} from "@styles/styled-record"
import useToggle from "@hooks/toggle"
import useMediaQuery from "@hooks/media-query"
import MenuDialog from "@components/menu/menu-dialog"
import AnimateWrapper from "@components/common/animate-wrapper"
import Tooltip from "@components/common/tooltip"

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

const Header = () => {
  const {storedTheme, handleTheme} = useTheme()
  const isAboveTablet = useMediaQuery(above.tablet)
  const {state: showMenu, toggle: toggleMenu} = useToggle()

  useHotkeys("ctrl+k", toggleMenu)

  return (
    <Fragment>
      <StyledHeader>
        <LogoWrapper>
          <Link href="/">
            <a>
              <MarcellLogo />
            </a>
          </Link>
        </LogoWrapper>
        <ButtonWrapper
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          handleTheme={handleTheme}
          storedTheme={storedTheme}
        />
        {isAboveTablet && <Navigation />}
      </StyledHeader>

      <AnimateWrapper isOn={showMenu}>
        <MenuDialog />
      </AnimateWrapper>
    </Fragment>
  )
}

export default Header

const ButtonWrapperStyles = styled.div`
  position: fixed;
  right: 3rem;
  top: 1.2rem;
  width: 8rem;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  @media ${below.mobileL} {
    position: static;
  }
  button {
    position: relative;
  }
`
interface ButtonWrapperProps {
  showMenu: boolean
  toggleMenu: () => void
  storedTheme: ThemeValue
  handleTheme: () => void
}

function ButtonWrapper({showMenu, toggleMenu, storedTheme, handleTheme}: ButtonWrapperProps) {
  return (
    <ButtonWrapperStyles>
      <Tooltip title="ctr+k" ariaLabel={showMenu ? "close menu" : "open menu"}>
        <Button onClick={toggleMenu}>
          <Cmd />
        </Button>
      </Tooltip>
      <Tooltip
        title={`${storedTheme === "dark" ? "light" : "dark"}`}
        ariaLabel={`switch theme to ${storedTheme === "dark" ? "light" : "dark"}`}
      >
        <Button onClick={handleTheme}>{storedTheme === "dark" ? <Sun /> : <Moon />}</Button>
      </Tooltip>
    </ButtonWrapperStyles>
  )
}
