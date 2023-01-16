import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

const HistoryPage = () => {
  return (
    <Layout pageTitle="History">
      <p>This project was done in 2011 for my High School project fair.</p>

      <br></br>

      <p>When I put a version of that project online via my college website hosting.</p>

      Handlebars
      
      <br></br>
    </Layout>
  )
}

export const Head = () => <Seo title="History" />

export default HistoryPage
