import {getAllPosts} from "../../lib/api"
import {NextPage} from "next"
import {GetStaticProps} from "next"
import styled from "@emotion/styled"

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

const PostsList = styled.ul``

const BlogPage: NextPage<Props> = ({posts}) => (
  <div>
    <h1>blog</h1>
    <PostsList>
      {posts.map(({title, spoiler, updated, tags, slug}) => (
        <li key={title}>
          {title}
          {spoiler}
          {updated}
          {tags.map((tag) => (
            <div key={tag}>{tag}</div>
          ))}
          {slug}
        </li>
      ))}
    </PostsList>
  </div>
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
