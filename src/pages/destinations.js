import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import ImageHeader from "../components/Blocks/ImageHeader"
import Row from "../components/Blocks/row"
import DestCard from "../components/Cards/destCard"
import IntroText from "../components/HomePage/introText"
import Layout from "../components/layout"
import SEO from "../components/seo"

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (min-width: 1200px) {
    margin-left: -8px;
    margin-right: -12px;
  }
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

  // console.log(bigCities)

  return (
    <Layout light={data.wpPage.ACF_Global.lightHeader}>
      <SEO title="home" />
      <ImageHeader
        image={data.wpPage.featuredImage.node.localFile}
        imagealt={data.wpPage.featuredImage.node.altText}
        title={data.wpPage.title}
        light={data.wpPage.ACF_Global.lightHeader}
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
    wpPage(slug: {eq: "destinations"}) {
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
      ACF_Global {
        lightHeader
      }
    }
    allWpDestination(filter: {status: {eq: "publish"}}, sort: {title: ASC}) {
      edges {
        node {
          ...DestinationFragment
        }
      }
    }
  }
`
