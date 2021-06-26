import {css, SerializedStyles} from "@emotion/react"
import styled from "@emotion/styled"
import useToggle from "@hooks/toggle"
import {pxToRem} from "@styles/css-helpers"
import {borderRadius, colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import React from "react"
import AnimateWrapper from "./animate-wrapper"

interface Props {
  title: string
  ariaLabel: string
  incomingStyles?: SerializedStyles
}

const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
`

const Tooltip: React.FC<Props> = ({title, ariaLabel, children, incomingStyles}) => {
  const {state: isOn, toFalse, toTrue} = useToggle()
  return (
    <Wrapper onMouseEnter={toTrue} onMouseLeave={toFalse}>
      <AnimateWrapper isOn={isOn}>
        <motion.span
          aria-label={ariaLabel}
          initial={{opacity: 0, y: 10, scale: 0.5}}
          animate={{opacity: 1, y: 0, scale: 1}}
          exit={{opacity: 0, y: -10, scale: 0.5}}
          transition={{delay: 0.3}}
          css={css`
            position: absolute;
            /* top: 8%; */
            left: -25%;
            bottom: 10%;

            font-size: ${pxToRem(14)};
            pointer-events: none;
            white-space: nowrap;
            z-index: 6;
            background-color: ${colors.colorGray300};
            padding: 0.2rem;
            border-radius: ${borderRadius.borderRadiusM};
            z-index: -1;
            ${incomingStyles};
            /* user-select: none; */
          `}
          aria-hidden={isOn}
          role="tooltip"
        >
          {title}
        </motion.span>
      </AnimateWrapper>
      {children}
    </Wrapper>
  )
}
export default Tooltip
