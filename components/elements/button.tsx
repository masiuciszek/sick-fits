import {css, SerializedStyles} from "@emotion/react"
import {buttonResetStyles} from "@styles/css-helpers"

const styles = css`
  ${buttonResetStyles}
`

interface Props {
  incomingStyles?: SerializedStyles
  text: string
  onClick?: () => void
}

const Button = ({incomingStyles, text, onClick}: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      css={css`
        ${styles};
        ${incomingStyles};
      `}
    >
      {text}
    </button>
  )
}

export default Button
