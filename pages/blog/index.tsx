import {getAllPosts} from "../../lib/api"
import {NextPage} from "next"
import {GetStaticProps} from "next"
import styled from "@emotion/styled"
import Title from "@components/common/title"
import Seo from "@components/common/seo"
import {FC, Fragment} from "react"
import {formatDate} from "@utils/helpers"
import {css} from "@emotion/react"
import {colors, sizes} from "@styles/styled-record"
import Link from "next/link"
import {above} from "@styles/media-query"

interface PostItem {
  title: string
  spoiler: string
  date?: string
  updated: string
  tags: string[]
  keywords?: string[]
  slug: string
}

interface Props {
  posts: PostItem[]
}

const PostsList = styled.ul`
  border: 2px solid red;
  display: flex;
  justify-content: center;
`

const BlogPage: NextPage<Props> = ({posts}) => {
  return (
    <Fragment>
      <Seo title="All posts" />
      <Title
        incomingStyles={css`
          border: 2px solid red;
          text-align: center;
        `}
      >
        <h1>All posts</h1>
      </Title>
      <PostsList>
        {posts.map((post) => (
          <PostItem key={post.title} {...post} />
        ))}
      </PostsList>
    </Fragment>
  )
}

const PostItem: FC<PostItem> = ({title, spoiler, updated, tags, slug}) => (
  <li
    css={css`
      border: 2px solid red;
      width: 100%;
      @media ${above.tablet} {
        width: 700px;
      }
      .title-and-date {
        font-size: ${sizes.h3};
        color: ${colors.colorTextPrimary};
      }
    `}
  >
    <p className="title-and-date">
      {title} {formatDate(updated)}{" "}
    </p>
    <p>{spoiler}</p>

    {tags.map((tag) => (
      <div key={tag}>{tag}</div>
    ))}

    <Link href={`/posts/${slug}`}>
      <a>to {title} &#8594;</a>
    </Link>
  </li>
)

export default BlogPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts({
    fields: ["title", "spoiler", "updated", "tags", "slug"],
  })
  return {
    props: {
      posts,
    },
  }
}
