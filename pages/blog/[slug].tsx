// import {getAllPosts, getPostBySlug} from "lib/api"
// import markDownToHtml from "lib/markdown-to-html"
// import {GetStaticPaths, GetStaticProps} from "next"
import {GetStaticPaths, GetStaticProps} from "next"
import {useRouter} from "next/router"
// import {ParsedUrlQuery} from "querystring"
import fs from "fs"
import path from "path"
import {getPostBySlug} from "lib/api"
import {MDXRemote} from "next-mdx-remote"
import {serialize} from "next-mdx-remote/serialize"

const PostPage = ({postData}) => {
  const router = useRouter()

  console.log("postData", postData)
  return <h1>{router.query.slug} </h1>
}
export default PostPage

// export type GetStaticProps<
//   P extends { [key: string]: any } = { [key: string]: any },
//   Q extends ParsedUrlQuery = ParsedUrlQuery
// > = (
//   context: GetStaticPropsContext<Q>
// ) => Promise<GetStaticPropsResult<P>> | GetStaticPropsResult<P>

export const getStaticProps: GetStaticProps = async ({params}: any) => {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "updated",
    "tags",
    "keywords",
    "content",
  ])

  console.log({post})

  const mdxSource = await serialize(post.content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: post,
  })

  // console.log("mdxSource", mdxSource)

  return {
    props: {
      postData: mdxSource,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = fs
    .readdirSync(path.join(process.cwd(), "posts"))
    .map((p) => p.replace(/\.mdx?$/, ""))

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

// interface Props {
//   post: any
//   content: string
// }
// interface Params extends ParsedUrlQuery {
//   slug: string
// }

// export const getStaticProps: GetStaticProps<any, Params> = async ({params}) => {
//   const slug = params.slug as string
//   console.log("slug", slug)
//   const post = getPostBySlug(slug, ["title"])

//   // const content = await markDownToHtml(post.content || "")

//   return {
//     props: {
//       // ...post,
//       // content,
//       a: "",
//     },
//   }
// }

// export const getStaticPaths = async () => {
//   const posts = getAllPosts({fields: ["slug"]})

//   console.log("posts", posts)
//   return {
//     paths: posts.map(({slug}) => ({params: {slug}})),
//     fallback: true,
//   }
// }
