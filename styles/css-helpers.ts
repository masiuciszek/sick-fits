import {css} from "@emotion/react"

import {colors} from "./styled-record"

export const pxToRem = (px: number, baseFont = 16) => `${px / baseFont}rem`
export const remToPx = (rem: number, baseFont = 16) => `${rem * baseFont}px`

export const buttonResetStyles = css`
  cursor: pointer;
  outline: none;
  background-color: none;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  color: ${colors.colorTextText};
`

export const commonGridStyles = css`
  display: grid;
  grid-template-columns: 1fr;
`
