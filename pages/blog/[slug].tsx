import {PostItemType} from "@components/blog/types"
import Seo from "@components/common/seo"
import {css} from "@emotion/react"
import {
  PostNavigation as PostNavigationStyles,
  PostWrapper,
} from "@styles/[slug]-styles"
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

const getPostIndex = (postSlugs: string[], slug: string) => {
  const currentPostIndex = postSlugs.findIndex((p) => p === slug)
  const previousPosSlug = postSlugs[currentPostIndex - 1]
  const nextPostSlug = postSlugs[currentPostIndex + 1]

  return {currentPostIndex, previousPosSlug, nextPostSlug}
}

const getFrontMatter = (scope: Record<string, unknown>) => {
  const frontMatter = {} as FrontMatter
  switch (true) {
    case scope?.title:
      frontMatter.title = scope.title as string
      break
    case scope?.updated:
      frontMatter.date = scope.date as string
      break
    case scope?.date:
      frontMatter.date = scope.date as string
      break
    case scope?.tags:
      frontMatter.tags = scope.tags as string[]
      break
    case scope?.keywords:
      frontMatter.keywords = scope.keywords as string[]
      break
    case scope?.spoiler:
      frontMatter.spoiler = scope.spoiler as string
      break
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
    // TODO: Fix
    return <div>...loading</div>
  }
  const {currentPostIndex, previousPosSlug, nextPostSlug} = getPostIndex(
    postSlugs,
    router.query.slug as string,
  )
  const {title, spoiler} = getFrontMatter(postData?.scope ?? {})

  return (
    <Fragment>
      <Seo
        title={`Blog post ${title}`}
        description={`About blog post ${title}. ${spoiler}`}
      />
      <PostWrapper>
        <MDXRemote {...postData} components={{}} />
        <PostNavigation
          currentPostIndex={currentPostIndex}
          previousPosSlug={previousPosSlug}
          nextPostSlug={nextPostSlug}
          postSlugs={postSlugs}
        />
      </PostWrapper>
    </Fragment>
  )
}
export default PostPage

interface PostNavigationProps {
  currentPostIndex: number
  previousPosSlug: string
  nextPostSlug: string
  postSlugs: string[]
}
const PostNavigation = ({
  currentPostIndex,
  previousPosSlug,
  nextPostSlug,
  postSlugs,
}: PostNavigationProps) => {
  return (
    <PostNavigationStyles>
      {currentPostIndex > 0 ? (
        <Link href={`/blog/${previousPosSlug}`}>
          <a>{previousPosSlug}</a>
        </Link>
      ) : (
        <p>previous post</p>
      )}

      {currentPostIndex < postSlugs.length - 1 ? (
        <Link href={`/blog/${nextPostSlug}`} css={css``}>
          <a> {nextPostSlug} </a>
        </Link>
      ) : (
        <p>no more posts</p>
      )}
    </PostNavigationStyles>
  )
}

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
    fields: ["slug", "updated"],
    sort: "DESC",
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
