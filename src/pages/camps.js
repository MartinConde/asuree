import React from "react"
import { myContext } from "../context/provider"
import styled from "styled-components"
import Layout from "../components/layout"
import Row from "../components/Blocks/row"
import ImageHeader from "../components/ImageHeader"
import { graphql } from 'gatsby'
import SEO from "../components/seo"
import Searchbar from "../components/Search/searchBar"
import GymCard from '../components/gymCard'
import LoadingIndicator from "../components/Search/loadingIndicator"
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

export default function SearchResults({data}) {
  return (
    <myContext.Consumer>
      {context => (
        <Layout>
          <SEO title="home" />
          <ImageHeader image={data.wpPage.featuredImage.node.localFile} imagealt={data.wpPage.featuredImage.node.altText} title={data.wpPage.title} />
          <Row>
        <IntroText
          title={data.wpPage.ACF_CampsPage.introTitle}
          content={data.wpPage.ACF_CampsPage.introContent}
        />
      </Row>
          <Row id="camps">
          <Searchbar noBtn/>
          <CardsWrapper>
            {context.isGymResult.length === 0 && <NoResults>Leider nischt jefunden, versuch doch ma ne andre Suche</NoResults>}
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
    wpPage(slug: {eq: "camps"}) {
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
  }
  }
`
