import {css} from "@emotion/react"
import {colors} from "@styles/styled-record"
import {FC} from "react"

const styles = css`
  color: ${colors.colorHighlight};
  background: transparent;
`

const Highlighter: FC = ({children}) => (
  <mark
    css={css`
      ${styles};
    `}
  >
    {children}
  </mark>
)

export default Highlighter
