import ReactDOM from "react-dom"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {motion} from "framer-motion"
import {above} from "@styles/media-query"
import {pxToRem} from "@styles/css-helpers"
import {useRef} from "react"
import useOnClickOutside from "@hooks/click-outside"
import routes from "../../data/routes.json"
import styled from "@emotion/styled"
import {useRouter} from "next/router"
import {getActiveLink} from "@utils/helpers"
import RouteLink from "@components/elements/route-link"

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

const Body = styled(motion.section)`
  position: fixed;
  overflow: hidden;
  width: 100%;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid ${colors.colorHighlight};
  padding: 0.2rem;
  background-color: ${colors.colorBgBackground};
  color: ${colors.colorBgBackground};
  @media ${above.tablet} {
    width: ${pxToRem(650)};
    transform: translateX(-50%);
  }
  border-radius: ${borderRadius.borderRadiusM};
  box-shadow: ${elevations.shadowXl};
`

const bodyVariants = {
  initial: {
    scale: 0.8,
    opacity: 0,
    x: "-50%",
  },

  animate: {
    scale: 1,
    opacity: 1,
  },

  exit: {
    scale: 0.5,
    opacity: 0,
    transition: {duration: 0.15, delay: 0.1},
  },
}
interface Props {
  closeMenu: () => void
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  padding: 0.2rem;
  width: 90%;
  margin: 0 auto;
`
const Label = styled.label`
  width: 100%;
  border: 2px solid red;
`

const Input = styled.input`
  width: 100%;
  background: transparent;
  height: 2.5rem;
  border: 2px solid ${colors.colorBgBlack};
  border-radius: ${borderRadius.borderRadiusM};
  padding: 0 0.5rem;
  outline: none;
  font-size: 1.2rem;
  &::placeholder {
    opacity: 0.7;
    font-size: 1.1rem;
  }
  &:focus {
    border-color: ${colors.colorTextPrimary};
    &::placeholder {
      opacity: 1;
    }
  }
  -webkit-appearance: textfield;
  ::-webkit-search-cancel-button,
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
`

const RoutesWrapper = styled.ul`
  border: 2px solid red;
  padding: 1rem 0.2rem;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`

const MenuDialog = ({closeMenu}: Props) => {
  const ref = useRef(null)
  useOnClickOutside(ref, closeMenu)

  const router = useRouter()
  const activeLink = getActiveLink(router.pathname)

  return ReactDOM.createPortal(
    <Overlay
      data-testid="components-app-MenuDialog"
      role="dialog"
      tabIndex={-1}
      aria-label="search"
      initial={{backgroundColor: colors.colorBgBackground}}
      animate={{backgroundColor: colors.colorBgOverlay}}
      exit={{backgroundColor: colors.colorBgBackground}}
    >
      <Body
        ref={ref}
        initial={bodyVariants["initial"]}
        animate={bodyVariants["animate"]}
        exit={bodyVariants["exit"]}
        variants={bodyVariants}
        transition={{
          ease: "easeOut",
          duration: 0.2,
        }}
      >
        <Form>
          <Label htmlFor="blog-post-search">
            <Input
              autoComplete="off"
              type="search"
              placeholder="search for a blog post"
              id="blog-post-search"
              name="search"
            />
          </Label>
        </Form>

        <RoutesWrapper>
          <RouteLink name="home" path="/" active={activeLink("/")} />
          {routes.map(({name, path}) => (
            <RouteLink key={name} name={name} path={path} active={activeLink(path)} />
          ))}
        </RoutesWrapper>
      </Body>
    </Overlay>,
    document.body,
  )
}

export default MenuDialog
