import React from "react"
import {useRouter} from "next/router"

interface Props {
  foo: any
}

const PostPage: React.FC<Props> = ({}) => {
  const router = useRouter()

  console.log(router.query)
  return <h1>{router.query.slug} </h1>
}
export default PostPage
