import {Fragment} from "react"
import Head from "next/head"
import {GlobalStyles} from "@components/app/global-styles"
import {AppProps} from "next/app"
import {DefaultSeo} from "next-seo"
import defaultSeoConfig from "../next.seo.json"
import {Layout} from "@components/app/layout"

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Fragment>
      <GlobalStyles />
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...defaultSeoConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  )
}

export default MyApp
