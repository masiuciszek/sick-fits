import styled from "@emotion/styled"
import {colors} from "@styles/styled-record"
import {useRouter} from "next/router"
import Link from "next/link"
import routes from "../../data/routes.json"
import {css} from "@emotion/react"
import {pxToRem} from "@styles/css-helpers"

const Nav = styled.nav`
  display: flex;
  align-items: center;
`

const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  border: 2px solid red;
  padding: 0.5rem;
  flex: 1;
  height: 100%;
  align-items: center;
`
const listItemStyles = (active: boolean) => css`
  position: relative;
  &:after {
    content: "";
    background-color: ${colors.colorTextPrimary};
    position: absolute;
    transition: 200ms linear width;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
  }
  &:hover {
    :after {
      width: 100%;
    }
  }

  a {
    color: ${colors.colorTextText};
    display: inline-block;
    position: relative;
    z-index: 1;
    &:after {
      content: "";
      position: absolute;
      top: ${pxToRem(2)};
      left: ${pxToRem(-1)};
      background-color: ${active ? colors.colorHighlight : null};
      opacity: 0.7;
      height: ${pxToRem(12)};
      width: ${pxToRem(12)};
      z-index: -1;
    }
  }
`

const getActiveLink = (pathName: string, routerPathName: string) => pathName === routerPathName

const Navigation = (): JSX.Element => {
  const router = useRouter()
  return (
    <Nav data-testid="components-app-navigation">
      <NavList>
        {routes.map(({name, path}) => (
          <li
            key={name}
            className={getActiveLink(path, router.pathname) ? "active" : "non-active"}
            css={css`
              ${listItemStyles(getActiveLink(path, router.pathname))};
            `}
          >
            <Link href={path}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </NavList>
    </Nav>
  )
}
export default Navigation
