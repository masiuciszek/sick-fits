import {colors} from "@styles/styled-record"
import React from "react"

interface Props {
  height?: number
  width?: number
}

const Brackets: React.FC<Props> = ({height = 20, width = 20}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={height}
      height={width}
      fill={colors.colorTextText}
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <path
        d="M80,40c-64,0,0,88-64,88,64,0,0,88,64,88"
        fill="none"
        stroke={colors.colorTextText}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
      <path
        d="M176,40c64,0,0,88,64,88-64,0,0,88-64,88"
        fill="none"
        stroke={colors.colorHighlight}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
    </svg>
  )
}
export default Brackets
