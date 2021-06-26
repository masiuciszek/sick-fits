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
// import Moon from "@components/icons/moon"
// import Sun from "@components/icons/sun"
import {colors, sizes} from "@styles/styled-record"
import useToggle from "@hooks/toggle"
import useMediaQuery from "@hooks/media-query"
import MenuDialog from "@components/menu/menu-dialog"
import AnimateWrapper from "@components/common/animate-wrapper"
import Tooltip from "@components/common/tooltip"
import dynamic from "next/dynamic"
import useHasMounted from "@hooks/has-mounted"
import {css} from "@emotion/react"

const Sun = dynamic(() => import("../icons/sun"), {ssr: true})
const Moon = dynamic(() => import("../icons/moon"), {ssr: true})

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
  const {state: showMenu, toTrue: openMenu, toFalse: closeMenu, toggle: toggleMenu} = useToggle()
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
          openMenu={openMenu}
          handleTheme={handleTheme}
          storedTheme={storedTheme}
        />
        {isAboveTablet && <Navigation />}
      </StyledHeader>

      <AnimateWrapper isOn={showMenu}>
        <MenuDialog closeMenu={closeMenu} />
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
  z-index: 2;
  @media ${below.mobileL} {
    position: static;
  }
  button {
    position: relative;
  }
`
interface ButtonWrapperProps {
  showMenu: boolean
  openMenu: () => void
  storedTheme: ThemeValue
  handleTheme: () => void
}

function ButtonWrapper({showMenu, openMenu, storedTheme, handleTheme}: ButtonWrapperProps) {
  const hasMounted = useHasMounted()
  return (
    <ButtonWrapperStyles>
      <Tooltip
        title="ctr+k"
        ariaLabel={showMenu ? "close menu" : "open menu"}
        incomingStyles={css`
          left: -45%;
        `}
      >
        <Button onClick={openMenu}>
          <Cmd />
        </Button>
      </Tooltip>
      <Tooltip
        title={`${storedTheme === "dark" ? "light" : "dark"}`}
        ariaLabel={`switch theme to ${storedTheme === "dark" ? "light" : "dark"}`}
      >
        {hasMounted && storedTheme === "dark" ? (
          <Button onClick={handleTheme}>
            <Sun />
          </Button>
        ) : (
          <Button onClick={handleTheme}>
            <Moon />
          </Button>
        )}
      </Tooltip>
    </ButtonWrapperStyles>
  )
}
