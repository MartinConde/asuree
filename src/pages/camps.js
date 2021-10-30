import React from "react"
import { myContext } from "../context/provider"
import styled from "styled-components"
import Layout from "../components/layout"
import ImageHeader from "../components/ImageHeader"
import { graphql } from 'gatsby'
import SEO from "../components/seo"
import Searchbar from "../components/Search/searchBar"
import GymCard from '../components/gymCard'
import LoadingIndicator from "../components/Search/loadingIndicator"

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

export default function SearchResults({data}) {
  console.log(data)
  return (
    <myContext.Consumer>
      {context => (
        <Layout>
          <SEO title="home" />
          <ImageHeader image={data.wpPage.featuredImage.node.localFile} imagealt={data.wpPage.featuredImage.node.altText} title={data.wpPage.title} />
          <Searchbar />
          <CardsWrapper>
            {context.isGymResult.length === 0 && <div>nottting</div>}
            {context.isGymResult ? (
              context.isGymResult.map(result => (
                <GymCard gym={result} />
              ))
            ) : (
              <LoadingIndicator />
            )}
          </CardsWrapper>
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
  }
  }
`
