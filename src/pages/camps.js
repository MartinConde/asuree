import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import ImageHeader from "../components/Blocks/ImageHeader"
import Row from "../components/Blocks/row"
import GymCard from "../components/Cards/gymCard"
import IntroText from "../components/HomePage/introText"
import Layout from "../components/layout"
import LoadingIndicator from "../components/Search/loadingIndicator"
import Searchbar from "../components/Search/searchBar"
import SEO from "../components/seo"
import { myContext } from "../context/provider"

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

export default function SearchResults({ data }) {
  return (
    <myContext.Consumer>
      {context => (
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
              title={data.wpPage.ACF_CampsPage.introTitle}
              content={data.wpPage.ACF_CampsPage.introContent}
            />
          </Row>
          <Row id="camps">
            <Searchbar noBtn />
            <CardsWrapper>
              {context.isGymResult.length === 0 && (
                <NoResults>
                  Leider nischt jefunden, versuch doch ma ne andre Suche
                </NoResults>
              )}
              {context.isGymResult ? (
                context.isGymResult.map(result => (
                  <GymCard gym={result} thirds />
                ))
              ) : (
                <LoadingIndicator />
              )}
            </CardsWrapper>
          </Row>
        </Layout>
      )}
    </myContext.Consumer>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: { eq: "camps" }) {
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
      ACF_CampsPage {
        introTitle
        introContent
      }
      ACF_Global {
        lightHeader
      }
    }
  }
`
