import styled from "@emotion/styled"
import {useRouter} from "next/router"
import routes from "../../data/routes.json"
import RouteLink from "@components/elements/route-link"
import {getActiveLink} from "@utils/helpers"

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

const Navigation = (): JSX.Element => {
  const router = useRouter()
  const activeLink = getActiveLink(router.pathname)
  return (
    <Nav data-testid="components-app-navigation">
      <NavList>
        {routes.map(({name, path}) => (
          <RouteLink key={name} name={name} path={path} active={activeLink(path)} />
        ))}
      </NavList>
    </Nav>
  )
}
export default Navigation
