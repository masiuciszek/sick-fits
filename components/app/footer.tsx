import {css} from "@emotion/react"
import {sizes} from "@styles/styled-record"

const footerStyles = css`
  min-height: ${sizes.footerHeight};
`

const Footer = () => {
  return (
    <footer
      css={css`
        ${footerStyles};
        border: 2px solid red;
      `}
    >
      <h1>Footer</h1>
    </footer>
  )
}

export default Footer
