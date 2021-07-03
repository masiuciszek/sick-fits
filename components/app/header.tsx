import {Fragment} from "react"
import {useHotkeys} from "react-hotkeys-hook"
import styled from "@emotion/styled"

import Navigation from "./nav"
import {above, below} from "@styles/media-query"
import Link from "next/link"
import Cmd from "@components/icons/cmd"
import useTheme, {ThemeValue} from "@hooks/theme"
import Button from "@components/elements/button"
// import Moon from "@components/icons/moon"
// import Sun from "@components/icons/sun"
import {colors, fonts, sizes} from "@styles/styled-record"
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
  display: inline-block;
  display: flex;
  align-items: center;
  position: relative;
  border: 2px solid red;
  a {
    display: block;
    font-family: ${fonts.operaorMono};
    font-weight: 700;
    font-size: 2rem;
    color: ${colors.colorTextText};
  }
  @media ${below.tablet} {
    justify-content: center;
  }
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
            <Tooltip title="home" ariaLabel="home-page">
              <Link href="/">
                <a>Marcell.C.D</a>
              </Link>
            </Tooltip>
          </LogoWrapper>
          {isAboveTablet && <Navigation />}
          <ButtonWrapper openMenu={openMenu} handleTheme={handleTheme} storedTheme={storedTheme} />
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
  align-items: center;
  z-index: 2;
  @media ${above.tablet} {
    button {
      margin-top: 0.8rem;
    }
  }
`
interface ButtonWrapperProps {
  openMenu: () => void
  storedTheme: ThemeValue
  handleTheme: () => void
}

function ButtonWrapper({openMenu, storedTheme, handleTheme}: ButtonWrapperProps) {
  const hasMounted = useHasMounted()

  const themeTooltipLabel = hasMounted ? (storedTheme === "dark" ? "Dark" : "Light") : ""

  return (
    <ButtonWrapperStyles>
      <Tooltip
        title="ctr+k"
        ariaLabel="cmd-menu"
        incomingStyles={css`
          left: -45%;
        `}
      >
        <Button onClick={openMenu}>
          <Cmd />
        </Button>
      </Tooltip>
      <Tooltip title={themeTooltipLabel} ariaLabel="control-theme">
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
