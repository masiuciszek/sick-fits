import Seo from "@components/common/seo"
import Title from "@components/common/title"
import {NextPage} from "next"
import {Fragment} from "react"

const AboutPage: NextPage = () => {
  return (
    <Fragment>
      <Seo
        title="About Page"
        description="About Marcell Ciszek Druzynski and who I am"
      />
      <Title>
        <h1>About</h1>
        <p>Coming soon!</p>
      </Title>
    </Fragment>
  )
}

export default AboutPage
