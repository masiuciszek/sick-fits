import {Fragment} from "react"
import {useHotkeys} from "react-hotkeys-hook"
import styled from "@emotion/styled"
import MarcellLogo from "@components/icons/marcell-logo"
import Navigation from "./nav"
import {above} from "@styles/media-query"
import Link from "next/link"
import Cmd from "@components/icons/cmd"
import useTheme, {ThemeValue} from "@hooks/theme"
import Button from "@components/elements/button"
// import Moon from "@components/icons/moon"
// import Sun from "@components/icons/sun"
import {colors, sizes} from "@styles/styled-record"
import useToggle from "@hooks/toggle"
import useMediaQuery from "@hooks/media-query"
// import MenuDialog from "@components/menu/menu-dialog"
import AnimateWrapper from "@components/common/animate-wrapper"
import Tooltip from "@components/common/tooltip"
import dynamic from "next/dynamic"
import useHasMounted from "@hooks/has-mounted"
import {css} from "@emotion/react"

const Sun = dynamic(() => import("../icons/sun"))
const Moon = dynamic(() => import("../icons/moon"))
const MenuDialog = dynamic(() => import("../menu/menu-dialog"))

const StyledHeader = styled.header`
  max-height: ${sizes.headerHeight};
  background-color: ${colors.colorBgNavigation};
`
const HeaderContentContainer = styled.aside`
  display: grid;
  max-width: ${sizes.maxWidth};
  margin: 0 auto;
  grid-template-columns: 1fr;
  @media ${above.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
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
        <HeaderContentContainer>
          <LogoWrapper>
            <Tooltip
              title="home"
              ariaLabel="home page"
              incomingStyles={css`
                z-index: 1;
                left: 5%;
              `}
            >
              <Link href="/">
                <a>
                  <MarcellLogo />
                </a>
              </Link>
            </Tooltip>
          </LogoWrapper>
          {isAboveTablet && <Navigation />}
          <ButtonWrapper
            showMenu={showMenu}
            openMenu={openMenu}
            handleTheme={handleTheme}
            storedTheme={storedTheme}
          />
        </HeaderContentContainer>
      </StyledHeader>

      <AnimateWrapper isOn={showMenu}>
        <MenuDialog closeMenu={closeMenu} />
      </AnimateWrapper>
    </Fragment>
  )
}

export default Header

const ButtonWrapperStyles = styled.div`
  border: 2px solid red;
  display: flex;
  justify-content: space-evenly;
  z-index: 2;
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
