import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function AccommodationTemplate({ data }) {
  const page = data.allWpAccommodation.edges[0].node

  return (
    <Layout>
      <SEO title="home" />
      <h1>Accommodation: {page.title}</h1>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    allWpAccommodation(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
