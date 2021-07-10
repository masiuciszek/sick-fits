import styled from "@emotion/styled"

import {pxToRem} from "./css-helpers"
import {borderRadius, colors, fonts} from "./styled-record"

export const PostWrapper = styled.article`
  border: 2px solid red;
  max-width: 950px;
  margin: ${pxToRem(40)} auto ${pxToRem(10)};
`

export const PostNavigation = styled.section`
  display: flex;
  justify-content: space-between;
  padding: ${pxToRem(20)} ${pxToRem(6)};

  a,
  p {
    display: block;
    border: 1px solid ${colors.colorTextPrimary};
    padding: 0.2rem;
    font-size: 17px;
    font-family: ${fonts.operaorMono};
    border-radius: ${borderRadius.borderRadiusS};
    background-color: ${colors.colorGray300};
    min-width: ${pxToRem(90)};
    text-align: center;
    outline: none;
  }
  a {
    color: ${colors.colorHighlight};
    transition: 200ms ease-out background-color, 1200ms ease-out color;
    &:hover {
      background-color: ${colors.colorGray900};
      color: ${colors.colorBgBackground};
    }
  }
  p {
    cursor: not-allowed;
    opacity: 0.5;
    text-decoration: line-through;
    font-family: ${fonts.operaorMonoHco};
    color: ${colors.colorTextText};
  }
`
