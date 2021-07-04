import Intro from "@components/home/intro"
import styled from "@emotion/styled"
import {above} from "@styles/media-query"
import {NextPage} from "next"
import {Fragment} from "react"
import Link from "next/link"
import {buttonStyles} from "@components/elements/button"
import {colors} from "@styles/styled-record"
import HiIAmMarcell from "@components/icons/hi-i-am-marcell"

const HomePageLayout = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;

  @media ${above.tablet} {
    grid-template-columns: 1fr 1fr;
    margin-top: 4rem;
  }
`

const CtaColumn = styled.aside`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-flow: column wrap;
`

const LinkGroup = styled.div`
  width: 100%;
  margin: 2rem auto;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-evenly;
  flex-flow: flow wrap;
  a {
    ${buttonStyles};
    display: block;
    &:hover {
      background-color: ${colors.colorTextPrimary};
    }
  }
  @media ${above.tablet} {
    width: 20rem;
  }
`

const Home: NextPage = () => (
  <Fragment>
    <HomePageLayout>
      <Intro />
      <CtaColumn>
        <HiIAmMarcell />
        <LinkGroup>
          <Link href="/blog">
            <a>blog</a>
          </Link>
          <Link href="/about">
            <a>about</a>
          </Link>
        </LinkGroup>
      </CtaColumn>
    </HomePageLayout>
  </Fragment>
)

export default Home
