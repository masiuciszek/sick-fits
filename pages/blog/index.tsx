import {getAllPosts} from "../../lib/api"
import {NextPage} from "next"
import {GetStaticProps} from "next"
import styled from "@emotion/styled"
import Title from "@components/common/title"
import Seo from "@components/common/seo"
import {Fragment} from "react"
import {css} from "@emotion/react"
import {PostItemType} from "@components/blog/types"
import PostItem from "@components/blog/post-item"

interface Props {
  posts: PostItemType[]
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
          margin: 1rem auto;
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
