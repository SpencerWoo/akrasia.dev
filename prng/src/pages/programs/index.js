import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Programs">
      {
        data.allDirectory.nodes.map((node) => (
          <article key={node.id}>

            <h2>
              <Link to={`/programs/${node.name}`}>
                {node.name}
              </Link>
            </h2>
          </article>
        ))
      }
    </Layout>
    // <Layout pageTitle="My Blog Posts">
    //   {
    //     data.allMdx.nodes.map(node => (
    //       <article key={node.id}>
    //         <h2>
    //           <Link to={`/blog/${node.frontmatter.slug}`}>
    //             {node.frontmatter.title}
    //           </Link>
    //         </h2>
    //         <p>Posted: {node.frontmatter.date}</p>
    //         <p>{node.excerpt}</p>
    //       </article>
    //     ))
    //   }
    // </Layout>
  )
}

// export const query = graphql`
//   query {
//     allMdx(sort: { frontmatter: { date: DESC }}) {
//       nodes {
//         frontmatter {
//           date(formatString: "MMMM D, YYYY")
//           title
//           slug
//         }
//         id
//         excerpt
//       }
//     }
//   }
// `


export const query = graphql`
  query {
    allDirectory(filter: {relativePath: {regex: "/(languages/)/"}}) {
      nodes {
        id
        name
        relativePath
      }
    }
  }
`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage
