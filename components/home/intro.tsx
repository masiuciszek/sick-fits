import Title from "@components/common/title"
import {css} from "@emotion/react"
import {pxToRem} from "@styles/css-helpers"
import {colors} from "@styles/styled-record"
import Highlighter from "@components/common/highlighter"
import Wave from "@components/icons/wave"
import Link from "next/link"
import styled from "@emotion/styled"

const styles = css`
  background-color: ${colors.colorBgBackground};
  font-size: ${pxToRem(23)};
  padding: 2rem;
  span {
    &:nth-of-type(1) {
      color: ${colors.colorTextText};
    }
    &:nth-of-type(2) {
      color: ${colors.colorGray600};
    }
  }
`

const LinkWrapper = styled.div`
  a {
    color: ${colors.colorTextPrimary};
    display: inline-block;
    position: relative;
    &:after {
      transition: 400ms ease-in-out width;
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: ${colors.colorGray800};
      height: 3px;
      width: 0;
    }
    &:hover {
      &:after {
        width: 90%;
      }
    }
  }
`

const Intro = () => {
  return (
    <Title incomingStyles={styles}>
      <h1>
        <span>
          Hello, I&#39;m Marcell, and this is my personal site/blog.
          <Wave />{" "}
        </span>
        <span>
          {" "}
          Here where I share my thoughts, ideas, and experience as a software engineer and
          everything that is my main focus right now, like <Highlighter>React</Highlighter>,
          <Highlighter>Typescript</Highlighter>, <Highlighter>GraphQL</Highlighter> and{" "}
          <Highlighter>Rust</Highlighter>.
        </span>
      </h1>
      <LinkWrapper>
        <Link href="/about">About me &#8599; </Link>
      </LinkWrapper>
    </Title>
  )
}

export default Intro
