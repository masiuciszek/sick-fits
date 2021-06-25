import {Fragment} from "react"
import ReactDOM from "react-dom"
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
import useToggle from "@hooks/toggle"
import useMediaQuery from "@hooks/media-query"
import {AnimatePresence, motion} from "framer-motion"
import {css} from "@emotion/react"

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
  z-index: 10;
  @media ${below.mobileL} {
    position: static;
  }
`

const Header = () => {
  const {storedTheme, handleTheme} = useTheme()
  const isAboveTablet = useMediaQuery(above.tablet)
  const {state: showMenu, toggle: toggleMenu} = useToggle()

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
        <ButtonWrapper>
          <Button onClick={toggleMenu}>
            <Cmd />
          </Button>
          <Button onClick={handleTheme}>{storedTheme === "dark" ? <Sun /> : <Moon />}</Button>
        </ButtonWrapper>
        {isAboveTablet && <Navigation />}
      </StyledHeader>
      <AnimatePresence>{showMenu && <MenuDialog />}</AnimatePresence>
    </Fragment>
  )
}

export default Header

const Overlay = styled(motion.div)`
  position: fixed;
  background-color: ${colors.colorBgOverlay};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  outline: none;
`

function MenuDialog() {
  return ReactDOM.createPortal(
    <Overlay
      data-testid="components-app-MenuDialog"
      role="dialog"
      tabIndex={-1}
      aria-model="true"
      aria-label="search"
      initial={{backgroundColor: colors.colorBgBackground}}
      animate={{backgroundColor: colors.colorBgOverlay}}
      exit={{backgroundColor: colors.colorBgBackground}}
    >
      <aside>
        <h1>hello</h1>
      </aside>
    </Overlay>,
    document.body,
  )
}
