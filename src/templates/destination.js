import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function DestinationTemplate({ data }) {
  const page = data.allWpDestination.edges[0].node
  return (
    <Layout>
      <SEO title="home" />
      <h1>Destination: {page.title}</h1>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    allWpDestination(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
