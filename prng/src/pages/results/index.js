import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'

const ResultsPage = ({data, children}) => {
  console.log(data, children)
  return (
    <Layout pageTitle="Results">
      {
        // <p> yo </p>
        data.allMdx.nodes.map((node) => (
          <article key={node.id}> 
            {node.frontmatter.title} 
            <GatsbyImage
              image={getImage(node.frontmatter.hero_image)}
              alt=""
            />
            {children}
          </article>))
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx (sort: {frontmatter : {date: ASC}}
            filter: {internal: {contentFilePath: {regex: "/(results/)/"}}}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          hero_image {
	          childImageSharp {
	            gatsbyImageData
	          }
	        }
        }
        id
      }
    }
  }
`

export default ResultsPage