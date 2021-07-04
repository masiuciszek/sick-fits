import {colors} from "@styles/styled-record"

const Linkedin = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill={colors.colorTextText}
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <rect
        x="40"
        y="40"
        width="176"
        height="176"
        rx="8"
        strokeWidth="16"
        stroke={colors.colorTextText}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      ></rect>
      <line
        x1="120"
        y1="112.00094"
        x2="120"
        y2="176.00094"
        fill="none"
        stroke={colors.colorTextText}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="88"
        y1="112.00094"
        x2="88"
        y2="176.00094"
        fill="none"
        stroke={colors.colorTextText}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <path
        d="M120,140.00094a28,28,0,1,1,56,0v36"
        fill="none"
        stroke={colors.colorTextText}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
      <circle cx="88" cy="79.99998" r="12"></circle>
    </svg>
  )
}

export default Linkedin
