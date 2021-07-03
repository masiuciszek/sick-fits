import {colors} from "@styles/styled-record"
import {motion, useMotionValue} from "framer-motion"

const variants = {
  pressed: {pathLength: 0.05},
  checked: {pathLength: 0},
  unchecked: {pathLength: 1},
}

interface Props {
  isActive: boolean
}

const Cmd = ({isActive}: Props) => {
  const pathLength = useMotionValue(1)
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      stroke={colors.colorHighlight}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      transition={{delay: 0.25, stiffness: 50, duration: 0.7}}
      animate={isActive ? "checked" : "unchecked"}
    >
      <motion.path
        variants={variants}
        transition={{duration: 0.7}}
        style={{pathLength}}
        d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
      ></motion.path>
    </motion.svg>
  )
}

export default Cmd
