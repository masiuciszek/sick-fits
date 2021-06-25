import ReactDOM from "react-dom"
import styled from "@emotion/styled"
import {borderRadius, colors, elevations} from "@styles/styled-record"
import {motion} from "framer-motion"
import {above} from "@styles/media-query"
import {pxToRem} from "@styles/css-helpers"

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
  padding: 0.5rem;
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

const MenuDialog = () =>
  ReactDOM.createPortal(
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
      <Body
        initial={bodyVariants["initial"]}
        animate={bodyVariants["animate"]}
        exit={bodyVariants["exit"]}
        variants={bodyVariants}
        transition={{
          ease: "easeOut",
          duration: 0.2,
        }}
      >
        <h1>hello</h1>
      </Body>
    </Overlay>,
    document.body,
  )

export default MenuDialog
