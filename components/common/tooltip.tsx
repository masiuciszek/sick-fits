import {css, SerializedStyles} from "@emotion/react"
import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {borderRadius, colors} from "@styles/styled-record"
import {AnimationControls, motion, useAnimation} from "framer-motion"
import {RefObject, useRef} from "react"

interface Props {
  title: string
  ariaLabel: string
  incomingStyles?: SerializedStyles
}

const Wrapper = styled(motion.div)`
  position: relative;
`

const variants = {
  start: {
    scale: 1,
    y: 2,
    opacity: 1,
  },
  initial: {
    scale: 0.75,
    y: 10,
    opacity: 0,
  },
}

const handleToolTipPosition = (ref: RefObject<HTMLSpanElement>) => {
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect()

    if (rect.x < 0) {
      ref.current.style.left = "0"
      ref.current.style.right = "auto"
      ref.current.style.transform = `translateX(${-rect.x + 15}px)`
    } else if (rect.x > window.outerWidth) {
      ref.current.style.left = "auto"
      ref.current.style.right = "0"
      ref.current.style.transform = `translateX(${window.outerWidth - rect.x - 15}px)`
    }
  }
}
const resetPosition = (ref: React.RefObject<HTMLSpanElement>) => {
  if (ref.current) {
    ref.current.style.removeProperty("left")
    ref.current.style.removeProperty("right")
    ref.current.style.removeProperty("transform")
  }
}

const handleShowTooltip = (ref: RefObject<HTMLSpanElement>, controls: AnimationControls) => () => {
  if (ref.current) {
    ref.current.setAttribute("aria-hidden", "false")
    controls.start("start")
    handleToolTipPosition(ref)
  }
}
const handleHideTooltip = (ref: RefObject<HTMLSpanElement>, controls: AnimationControls) => () => {
  if (ref.current) {
    ref.current.setAttribute("aria-hidden", "true")
    controls.start("initial")
    resetPosition(ref)
  }
}

const Tooltip: React.FC<Props> = ({title, ariaLabel, children, incomingStyles}) => {
  const controls = useAnimation()
  const ref = useRef<HTMLSpanElement>(null)

  const showTooltip = handleShowTooltip(ref, controls)
  const hideTooltip = handleHideTooltip(ref, controls)

  return (
    <Wrapper
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      initial="initial"
      animate={controls}
    >
      <motion.span
        ref={ref}
        aria-hidden={true}
        aria-label={ariaLabel}
        variants={variants}
        transition={{
          delay: 0.15,
        }}
        css={css`
          position: absolute;
          right: 0;
          bottom: -40%;
          font-size: ${pxToRem(14)};
          pointer-events: none;
          white-space: nowrap;
          z-index: 6;
          max-width: ${pxToRem(50)};
          background-color: ${colors.colorGray300};
          padding: 0.4rem;
          border-radius: ${borderRadius.borderRadiusM};
          ${incomingStyles};
          user-select: none;
        `}
        role="tooltip"
      >
        {title}
      </motion.span>

      {children}
    </Wrapper>
  )
}
export default Tooltip
