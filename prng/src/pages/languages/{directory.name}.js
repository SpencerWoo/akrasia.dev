import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const LanguagesPost = (props) => {
  // path: "/programs/go"
  // params: { name: "go" }

  const {params, path, data} = props
  const language = params['name']
  // console.log(props);
  // const image = getImage(data.mdx.frontmatter.hero_image)

  // const regLang = `/(languages/${language})/`

  // console.log(regLang);

  // const query = useStaticQuery(graphql`
  // query ($regLang: String){
  //   allFile(filter: {relativePath: {regex: $regLang}}) {
  //     nodes {
  //       name
  //       relativePath
  //     }
  //   }
  // }
  // `)

  // console.log("=====")
  // console.log(query);
  // console.log(data);

  return (
    <Layout pageTitle={language}>
      <p> test </p>

    </Layout>
    // <Layout pageTitle={data.mdx.frontmatter.title}>
    //   <p>{data.mdx.frontmatter.date}</p>
    //   <GatsbyImage
    //     image={image}
    //     alt={data.mdx.frontmatter.hero_image_alt}
    //   />
    //   <p>
    //     Photo Credit:{" "}
    //     <a href={data.mdx.frontmatter.hero_image_credit_link}>
    //       {data.mdx.frontmatter.hero_image_credit_text}
    //     </a>
    //   </p>
    //   {children}
    // </Layout>
  )
}

// export const query = graphql`
//   query ($id: String) {
//     directory(id: {eq: $id}) {
//       id
//       name
//       relativePath
//     }
//   }
// `

// const query = graphql`
//   query ($regLang: String){
//     allFile(filter: {relativePath: {regex: $regLang}}) {
//       nodes {
//         name
//         relativePath
//       }
//     }
//   }
//   `

// export const query = graphql`
//   query($id: String) {
//     mdx(id: {eq: $id}) {
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//         hero_image_alt
//         hero_image_credit_link
//         hero_image_credit_text
//         hero_image {
//           childImageSharp {
//             gatsbyImageData
//           }
//         }
//       }
//     }
//   }
// `

export const Head = ({ data }) => <Seo title='TODO' />

export default LanguagesPost
