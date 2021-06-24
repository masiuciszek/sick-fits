import {css, SerializedStyles} from "@emotion/react"
import {FC} from "react"

interface Props {
  title?: string
  incomingStyles?: SerializedStyles
}

const styles = css`
  padding: 0.5rem;
  margin-bottom: 1rem;
`

const Title: FC<Props> = ({children, title, incomingStyles}) => {
  return (
    <section
      css={css`
        ${styles};
        ${incomingStyles};
      `}
    >
      {title ? <h1 data-testid={`components-common-${title}`}>{title}</h1> : children}
    </section>
  )
}

export default Title
