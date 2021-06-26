import {FC} from "react"
import {css, SerializedStyles} from "@emotion/react"
import {buttonResetStyles} from "@styles/css-helpers"
import {elevations} from "@styles/styled-record"
import {motion} from "framer-motion"

const styles = css`
  ${buttonResetStyles};
  width: 4rem;
`

interface Props {
  incomingStyles?: SerializedStyles
  text?: string
  onClick?: () => void
  config?: Record<string, string | boolean | number | Record<string, string | boolean | number>>
}

const Button: FC<Props> = ({incomingStyles, text, onClick, children, config}) => {
  return (
    <motion.button
      onClick={onClick}
      type="button"
      css={css`
        ${styles};
        ${incomingStyles};
      `}
      {...config}
    >
      {text !== undefined ? text : children}
    </motion.button>
  )
}

export default Button
