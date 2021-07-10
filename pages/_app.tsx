import {GlobalStyles} from "@components/app/global-styles"
import {Layout} from "@components/app/layout"
import {AppProps} from "next/app"
import Head from "next/head"
import {DefaultSeo} from "next-seo"
import {Fragment} from "react"

import defaultSeoConfig from "../next.seo.json"

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
