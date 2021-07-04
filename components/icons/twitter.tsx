import {colors} from "@styles/styled-record"
import {motion} from "framer-motion"

interface Props {
  width?: number
  height?: number
}

const Twitter = ({width = 25, height = 25}: Props) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={colors.colorTextText}
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none"></rect>
    <path
      d="M48,200s40-8,48-32c0,0-64-24-48-112,0,0,32,40,80,48V88.00288a40.00668,40.00668,0,0,1,76.67148-16.00327L240,72l-32,32c0,56-40,112-112,112C64,216,48,200,48,200Z"
      fill="none"
      stroke={colors.colorTextText}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    ></path>
  </motion.svg>
)

export default Twitter
