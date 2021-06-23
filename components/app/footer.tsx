import {css} from "@emotion/react"
import {sizes} from "@styles/styled-record"

const footerStyles = css`
  max-height: ${sizes.footerHeight};
`

const Footer = () => {
  return (
    <footer
      css={css`
        ${footerStyles};
      `}
    >
      <h1>Footer</h1>
    </footer>
  )
}

export default Footer
