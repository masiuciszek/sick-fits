import fs from "fs"
import {join} from "path"
import matter from "gray-matter"

const getDirectory = (directory: string) => {
  return join(process.cwd(), directory)
}

const postsDirectory = getDirectory("posts")

export const getPostSlugs = () => {
  return fs.readdirSync(postsDirectory)
}

export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const fixedSlug = slug.replace(/\.mdx$/, "")

  const fullPath = join(postsDirectory, `${fixedSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const {data: frontMatter, content} = matter(fileContents)

  interface Item {
    [key: string]: string
  }

  const items: Item = {}

  for (const field of fields) {
    if (field === "slug") {
      items[field] = fixedSlug
    }
    // if we need the blog content then we can pass it via the field list
    if (content === "content") {
      items[field] = content
    }

    if (frontMatter[field]) {
      items[field] = frontMatter[field]
    }
  }

  return items
}

interface GetPosts {
  fields: string[]
  limit?: number // TODO: When there are more posts
}

export const getAllPosts = ({fields}: GetPosts) => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((p1, p2) => (p1.updated > p2.updated ? -1 : 1))

  return posts
}
