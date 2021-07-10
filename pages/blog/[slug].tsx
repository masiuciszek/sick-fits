import Seo from "@components/common/seo"
import {getAllPosts, getPostBySlug} from "lib/api"
import {serializeMdx} from "lib/markdown-to-html"
import {GetStaticPaths, GetStaticProps} from "next"
import Link from "next/link"
import {useRouter} from "next/router"
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote"
import {ParsedUrlQuery} from "querystring"
import {FC, Fragment} from "react"
// import {PostItemType} from "@components/blog/types"

// interface FrontMatter extends PostItemType {
//   date: string
//   keywords: string[]
// }

interface Props {
  postData: MDXRemoteSerializeResult
  postSlugs: string[]
}

const PostPage: FC<Props> = ({postData, postSlugs}) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>...loading</div>
  }

  const currentPostIndex = postSlugs.findIndex((p) => p === router.query.slug)

  return (
    <Fragment>
      <Seo
        title={`Blog post ${router.query.slug}`}
        description={`About blog post ${router.query.slug}, and the whole story`}
      />
      <div>
        <MDXRemote {...postData} components={{}} />
        <div className="post-navigation">
          {currentPostIndex > 0 && (
            <Link href={`/blog/${postSlugs[currentPostIndex - 1]}`}>
              <a>prev</a>
            </Link>
          )}

          {currentPostIndex < postSlugs.length - 1 && (
            <Link href={`/blog/${postSlugs[currentPostIndex + 1]}`}>
              <a>next</a>
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  )
}
export default PostPage

interface Result {
  postData: MDXRemoteSerializeResult<Record<string, unknown>>
}
interface Params extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps<Result, Params> = async ({
  params,
}) => {
  const slug = params?.slug ?? "http"
  const post = getPostBySlug(slug, [
    "content",
    "title",
    "updated",
    "created",
    "tags",
  ])
  const allPosts = getAllPosts({
    fields: ["slug"],
  })

  const mdxSource = await serializeMdx({
    post,
    content: post.content,
  })

  return {
    props: {
      postData: mdxSource,
      postSlugs: allPosts.map(({slug}) => slug),
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts({fields: ["slug"]})

  return {
    paths: posts.map(({slug}) => ({params: {slug}})),
    fallback: true,
  }
}
