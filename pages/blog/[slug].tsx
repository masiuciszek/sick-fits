import {PostItemType} from "@components/blog/types"
import Seo from "@components/common/seo"
import {getAllPosts, getPostBySlug} from "lib/api"
import {serializeMdx} from "lib/markdown-to-html"
import {GetStaticPaths, GetStaticProps} from "next"
import Link from "next/link"
import {useRouter} from "next/router"
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote"
import {ParsedUrlQuery} from "querystring"
import {FC, Fragment} from "react"

type PostItem = Omit<PostItemType, "slug">
interface FrontMatter extends PostItem {
  date: string
  keywords: string[]
}

const getPostIndex = (postSlugs: string[], slug: string) =>
  postSlugs.findIndex((p) => p === slug)

const getFrontMatter = (scope: Record<string, unknown>) => {
  const frontMatter = {} as FrontMatter
  if (scope?.title !== undefined) {
    frontMatter.title = scope.title as string
  }
  if (scope?.date) {
    frontMatter.date = scope.date as string
  }
  if (scope?.updated) {
    frontMatter.updated = scope.updated as string
  }
  if (scope?.tags) {
    frontMatter.tags = scope.tags as string[]
  }
  if (scope?.keywords) {
    frontMatter.keywords = scope.keywords as string[]
  }
  if (scope?.spoiler) {
    frontMatter.spoiler = scope.spoiler as string
  }
  return frontMatter
}
interface Props {
  postData: MDXRemoteSerializeResult
  postSlugs: string[]
}

const PostPage: FC<Props> = ({postData, postSlugs}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>...loading</div>
  }
  const currentPostIndex = getPostIndex(postSlugs, router.query.slug as string)
  const {title, spoiler} = getFrontMatter(postData?.scope ?? {})

  return (
    <Fragment>
      <Seo
        title={`Blog post ${title}`}
        description={`About blog post ${title}. ${spoiler}`}
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
    "date",
    "created",
    "tags",
    "spoiler",
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
