import {colors} from "@styles/styled-record"
import {motion} from "framer-motion"

const Moon = () => (
  <motion.svg
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    transition={{delay: 0.2}}
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill={colors.colorBgBackground}
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none"></rect>
    <path
      d="M216.66238,152.64951A92.03175,92.03175,0,0,1,103.35039,39.338l.00255.00078A92.01376,92.01376,0,1,0,216.66147,152.64624Z"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    ></path>
  </motion.svg>
)

export default Moon
