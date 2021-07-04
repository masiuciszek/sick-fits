import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {above} from "@styles/media-query"
import {colors, sizes} from "@styles/styled-record"
import socialMedia from "../../data/social-data.json"

const footerStyles = css`
  min-height: ${sizes.footerHeight};
  display: flex;

  align-items: center;
`

const FooterGroup = styled.section`
  display: grid;
  grid-template-columns: 1fr;

  margin: 0 auto;
  .say-hi {
    flex: 1 0 20%;
    text-align: center;
    padding: 0.5rem 0;
    small {
      border-bottom: 1px solid ${colors.colorTextText};
    }
    span {
      color: ${colors.colorTextPrimary};
    }
  }

  width: ${pxToRem(725)};
  @media ${above.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`

const FooterList = styled.ul`
  display: flex;
  margin: 0 auto;
  width: 100%;
  justify-content: space-evenly;
  padding: 0.5rem 0;
  margin-top: auto;

  li {
    a {
      font-size: ${pxToRem(16)};
    }
  }
`

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer
      css={css`
        ${footerStyles};
        border: 2px solid red;
      `}
    >
      <FooterGroup>
        <div className="say-hi">
          <small>
            <span>Say hi</span> to me on{" "}
          </small>
        </div>
        <FooterList>
          {socialMedia.map(({name, url}) => (
            <li key={name}>
              <a href={url}>{name}</a>
            </li>
          ))}
        </FooterList>
        <div
          css={css`
            text-align: center;
            display: inline-block;

            padding: 0.5rem 0;
            small {
              font-size: ${pxToRem(10)};
            }
            @media ${above.tablet} {
              grid-column: span 2;
            }
          `}
        >
          <small>
            &#169; {currentYear} Copyright Marcell Ciszek Druzysnki. All rights reserved. Built with
            Next JS
          </small>
        </div>
      </FooterGroup>
    </footer>
  )
}

export default Footer
