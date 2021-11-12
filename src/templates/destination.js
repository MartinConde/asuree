import React, { useState, useEffect } from "react"
import loadable from "@loadable/component"
import styled from "styled-components"
import parse from "html-react-parser"
import FsLightbox from "fslightbox-react"

import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/DetailPages/hero"
// import GMap from "../components/DetailPages/gmap"
import AcomCard from "../components/DetailPages/acomCard"
import ImageHeader from "../components/ImageHeader"
import GymCard from "../components/gymCard"

const GymMap = loadable(() => import("../components/DetailPages/gmap"))

const MainContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  h1,
  h2 {
    font-family: "Oswald Bold";
    color: var(--primary);
  }

  @media (min-width: 1300px) {
    display: flex;
  }
`

const Main = styled.div`
  /* @media (min-width: 1300px) {
    width: 72%;
  } */
`

const Section = styled.div`
  margin-top: ${props => (props.firstSec ? "0" : "30px")};
  padding: 20px 20px 65px 20px;
  border-bottom: 1px solid #ddd7d7;

  @media (min-width: 1300px) {
    margin-top: ${props => (props.firstSec ? "0" : "50px")};
    padding: 20px 20px 75px 20px;
  }
`

const GalleryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* background: #eee; */
  flex-wrap: wrap;
  gap: 12px;
`

const GalleryItem = styled.div`
  display: flex;
  max-width: calc(50% - 9px);
  height: 200px;

  @media (min-width: 768px) {
    max-width: calc(25% - 9px);
  }

  &:hover {
    cursor: pointer;
  }
`

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export default function DestinationTemplate({ data }) {
  const dest = data.allWpDestination.edges[0].node
  

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  })

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    })
  }

  return (
    <Layout light={dest.ACF_Global.lightHeader}>
      <SEO title="home" />
      <ImageHeader
        image={dest.featuredImage.node.localFile}
        imagealt="sdfdsf"
        title={dest.title}
        galBtn
        openGal={() => openLightboxOnSlide(1)}
        light={dest.ACF_Global.lightHeader}
        noTitle
      />
      <MainContentWrapper>
        <Main>
          <Section firstSec>
            <h1>{dest.title}</h1>
            {parse(dest.ACF_Destinations.description)}
            <GalleryWrapper>
              {dest.ACF_Destinations.galpreview
                .slice(0, 5)
                .map((destination, i) => (
                  <GalleryItem
                    key={`destination-${i}`}
                    onClick={() => openLightboxOnSlide(i + 1)}
                  >
                    <GatsbyImage
                      image={getImage(destination.localFile)}
                      alt="dsdfsfd"
                    />
                  </GalleryItem>
                ))}
            </GalleryWrapper>
          </Section>

          <Section>
            <h2>Location</h2>
            {dest.ACF_Destinations.location.streetAddress}
            <GymMap
              latitude={dest.ACF_Destinations.location.latitude}
              longitude={dest.ACF_Destinations.location.longitude}
              zoom={6}
            />
          </Section>

          <Section>
            <h2 id="gyms">Gyms</h2>
            <CardsWrapper>
              {dest.ACF_Destinations.gyms.map(gym => {
                return (
                  <GymCard gym={gym} thirds />
                )
              })}
            </CardsWrapper>
          </Section>
        </Main>
      </MainContentWrapper>

      <FsLightbox
        toggler={lightboxController.toggler}
        sources={dest.ACF_Destinations.gallery.map((destination, i) => (
          <div
            className="galFull"
            key={i}
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GatsbyImage
              image={getImage(destination.localFile)}
              alt="dsdfsfd"
              style={{ width: "100%" }}
            />
          </div>
        ))}
        slide={lightboxController.slide}
      />
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    allWpDestination(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          ...DestinationFragment
        }
      }
    }
  }
`
