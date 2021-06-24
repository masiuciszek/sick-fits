import {colors} from "@styles/styled-record"
import {motion} from "framer-motion"

const Cmd = () => (
  <motion.svg
    initial={{opacity: 0, rotate: -5, x: 20}}
    animate={{opacity: 1, rotate: 0, x: 0}}
    exit={{opacity: 0, rotate: 5, x: -20}}
    transition={{delay: 0.25, stiffness: 50}}
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke={colors.colorHighlight}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-command"
  >
    <motion.path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></motion.path>
  </motion.svg>
)

export default Cmd
