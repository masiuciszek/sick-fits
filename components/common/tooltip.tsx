import {css} from "@emotion/react"
import styled from "@emotion/styled"
import useToggle from "@hooks/toggle"
import {pxToRem} from "@styles/css-helpers"
import {borderRadius, colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import React from "react"

interface Props {
  title: string
  ariaLabel: string
}

const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
`

const Tooltip: React.FC<Props> = ({title, ariaLabel, children}) => {
  const {state: isOn, toFalse, toTrue} = useToggle()
  return (
    <Wrapper onMouseEnter={toTrue} onMouseLeave={toFalse}>
      {isOn && (
        <motion.span
          aria-label={ariaLabel}
          initial={{opacity: 0, y: 10, scale: 0.5}}
          animate={{opacity: 1, y: 0, scale: 1}}
          exit={{opacity: 0, y: -10, scale: 0.5}}
          css={css`
            position: absolute;
            top: -25%;
            left: -25%;
            font-size: ${pxToRem(14)};
            pointer-events: none;
            white-space: nowrap;
            z-index: 6;
            background-color: ${colors.colorGray300};
            padding: 0.2rem;
            border-radius: ${borderRadius.borderRadiusM};
            z-index: -1;
          `}
          aria-hidden={true}
        >
          {title}
        </motion.span>
      )}
      {children}
    </Wrapper>
  )
}
export default Tooltip
