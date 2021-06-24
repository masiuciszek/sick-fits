import {colors} from "@styles/styled-record"
import {motion} from "framer-motion"

const Wave = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    fill={colors.colorHighlight}
    viewBox="0 0 256 256"
    animate={{rotate: [1, 2, 3, 4, 3, 2, 1]}}
    whileHover={{
      rotate: [1, 2, 3, 4, 3, 2, 1],
    }}
  >
    <motion.rect width="256" height="256" fill="none"></motion.rect>
    <motion.g>
      <motion.path
        d="M119.99332,106.41921l-26-45.03332a20,20,0,0,1,34.641-20l40,69.282"
        fill="none"
        stroke={colors.colorHighlight}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></motion.path>
      <motion.path
        d="M89.35231,133.34742l-38-65.81793a20,20,0,1,1,34.641-20l34,58.88972"
        fill="none"
        stroke={colors.colorHighlight}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></motion.path>
      <motion.path
        d="M153.99332,165.30894a40,40,0,0,1,14.641-54.641l-10-17.32051a20,20,0,1,1,34.641-20l20,34.641a80,80,0,1,1-138.56406,80l-38-65.81793a20,20,0,0,1,34.641-20l18,31.17692"
        fill="none"
        stroke={colors.colorHighlight}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></motion.path>
    </motion.g>
    <motion.path
      d="M81.09415,240.0027A111.54975,111.54975,0,0,1,48,203.99065"
      fill="none"
      stroke={colors.colorTextText}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    ></motion.path>
    <motion.path
      d="M176,31A51.97065,51.97065,0,0,1,221.0258,57.00434"
      fill="none"
      stroke={colors.colorTextText}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    ></motion.path>
  </motion.svg>
)

export default Wave
