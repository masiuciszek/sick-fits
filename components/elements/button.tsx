import {FC} from "react"
import {css, SerializedStyles} from "@emotion/react"
import {buttonResetStyles} from "@styles/css-helpers"
import {elevations} from "@styles/styled-record"

const styles = css`
  ${buttonResetStyles};
  box-shadow: ${elevations.shadowLg};
  width: 4rem;
`

interface Props {
  incomingStyles?: SerializedStyles
  text?: string
  onClick?: () => void
}

const Button: FC<Props> = ({incomingStyles, text, onClick, children}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      css={css`
        ${styles};
        ${incomingStyles};
      `}
    >
      {text !== undefined ? text : children}
    </button>
  )
}

export default Button
