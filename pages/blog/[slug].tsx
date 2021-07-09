// import {getAllPosts, getPostBySlug} from "lib/api"
// import markDownToHtml from "lib/markdown-to-html"
// import {GetStaticPaths, GetStaticProps} from "next"
import {useRouter} from "next/router"
// import {ParsedUrlQuery} from "querystring"
// import fs from "fs"
// import matter from "gray-matter"
// import {MDXRemote} from "next-mdx-remote"
// import {serialize} from "next-mdx-remote/serialize"

const PostPage = () => {
  const router = useRouter()
  return <h1>{router.query.slug} </h1>
}
export default PostPage

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
