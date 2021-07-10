import {css,SerializedStyles} from "@emotion/react"
import {pxToRem} from "@styles/css-helpers"
import {colors} from "@styles/styled-record"
import Link from "next/link"
import {FC} from "react"

interface Props {
  path: string
  name: string
  active?: boolean
  incomingStyles?: SerializedStyles
}

interface ListItemProps {
  incomingStyles?: SerializedStyles
}

const ListItem: FC<ListItemProps> = ({children, incomingStyles}) => (
  <li
    css={css`
      position: relative;
      text-transform: capitalize;
      &:after {
        content: "";
        background-color: ${colors.colorTextPrimary};
        position: absolute;
        transition: 200ms linear width;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
      }
      &:hover {
        :after {
          width: 100%;
        }
      }
      ${incomingStyles};
    `}
  >
    {children}
  </li>
)

const RouteLink = ({path, name, active, incomingStyles}: Props) => (
  <ListItem incomingStyles={incomingStyles}>
    <Link href={path}>
      <a
        css={css`
          & {
            color: ${colors.colorTextText};
            display: inline-block;
            position: relative;
            z-index: 1;
            cursor: pointer;
            &:after {
              content: "";
              position: absolute;
              top: ${pxToRem(2)};
              left: ${pxToRem(-1)};
              background-color: ${active ? colors.colorHighlight : null};
              opacity: 0.7;
              height: ${pxToRem(12)};
              width: ${pxToRem(12)};
              z-index: -1;
            }
          }
        `}
      >
        {name}
      </a>
    </Link>
  </ListItem>
)

export default RouteLink
