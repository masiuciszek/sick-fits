import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {above} from "@styles/media-query"
import Hash from "@components/icons/hash"
import Link from "next/link"
import {
  borderRadius,
  colors,
  elevations,
  fonts,
  sizes,
} from "@styles/styled-record"
import {formatDate} from "@utils/helpers"
import {FC} from "react"
import {PostItemType} from "./types"

const StyledItem = styled.li`
  width: 100%;
  transition: 300ms ease-in-out background-color, box-shadow 300ms ease-in-out;
  padding: ${pxToRem(10)};
  margin-bottom: ${pxToRem(10)};
  border-radius: ${borderRadius.borderRadiusM};
  &:hover {
    background-color: ${colors.colorGray200};
    box-shadow: ${elevations.shadowMd};
  }
  @media ${above.tablet} {
    width: ${pxToRem(600)};
  }
  .title-and-date {
    font-size: ${sizes.h3};
    color: ${colors.colorTextPrimary};
  }
  .spoiler {
    margin-bottom: ${pxToRem(10)};
  }
`

const TagsList = styled.ul`
  margin-bottom: ${pxToRem(10)};
  display: flex;
  align-items: center;
  li:not(:last-child) {
    display: flex;
    background-color: ${colors.colorTextPrimary};
    color: ${colors.colorTextWhite};
    padding: ${pxToRem(2)};
    font-size: ${pxToRem(12)};
    min-width: ${pxToRem(65)};
    align-items: center;
    justify-content: space-between;
    margin-left: ${pxToRem(5)};
    box-shadow: ${elevations.shadowMd};
    border-radius: ${borderRadius.borderRadiusM};
  }
  .list-item-link {
    margin-left: ${pxToRem(25)};
    a {
      font-family: ${fonts.operaorMonoHco};
      display: inline-block;
      position: relative;
      transition: 200ms ease-in-out opacity;
      &:after {
        content: "";
        background-color: ${colors.colorTextPrimary};
        position: absolute;
        transition: 200ms linear width;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
      }
      &:hover {
        opacity: 0.75;
        :after {
          width: 90%;
        }
      }
    }
  }
`

const PostItem: FC<PostItemType> = ({title, spoiler, updated, tags, slug}) => (
  <StyledItem>
    <p className="title-and-date">
      {title} {formatDate(updated)}{" "}
    </p>
    <p className="spoiler">{spoiler}</p>
    <TagsList>
      {tags.map((tag) => (
        <li key={tag}>
          <Hash /> {tag}
        </li>
      ))}
      <li className="list-item-link">
        <Link href={`/posts/${slug}`}>
          <a>To {title} &#8594;</a>
        </Link>
      </li>
    </TagsList>
  </StyledItem>
)

export default PostItem
