import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'

const IntroductionPage = () => {
  return (
    <Layout pageTitle="Introduction">
      <p>Something something about entropy.</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, dozing in a bean bag chair"
        src="../images/clifford.jpg"
      />
    </Layout>
  )
}

export const Head = () => <Seo title="Introduction" />

export default IntroductionPage
