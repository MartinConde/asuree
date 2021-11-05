import React from "react"
import { myContext } from "../context/provider"
import styled from "styled-components"
import Layout from "../components/layout"
import Row from "../components/Blocks/row"
import ImageHeader from "../components/ImageHeader"
import LoadingIndicator from "../components/Search/loadingIndicator"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import DestCard from "../components/destCard"
import IntroText from "../components/HomePage/introText"

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const NoResults = styled.div`
  padding: 20px;
  text-align: center;
`

export default function Destinations({ data }) {
  const destins = data.allWpDestination.edges.map(({ node }) => node)

  const bigCities = destins.filter(function (e) {
    return e.ACF_Destinations.gyms
  })

  console.log(bigCities)
  return (
    <Layout>
      <SEO title="home" />
      <ImageHeader
        image={data.wpPage.featuredImage.node.localFile}
        imagealt={data.wpPage.featuredImage.node.altText}
        title={data.wpPage.title}
      />

      <Row>
        <IntroText
          title={data.wpPage.ACF_DestPage.introTitle}
          content={data.wpPage.ACF_DestPage.introContent}
        />
      </Row>

      <Row>
        <CardsWrapper>
          {bigCities.map(result => (
            <DestCard dest={result} thirds />
          ))}
        </CardsWrapper>
      </Row>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: { eq: "destinations" }) {
      id
      title
      featuredImage {
        node {
          id
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
      ACF_DestPage {
        introTitle
        introContent
      }
    }
    allWpDestination(sort: {order: ASC, fields: title}) {
      edges {
        node {
          ...DestinationFragment
        }
      }
    }
  }
`
