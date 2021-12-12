import React, { useState, useEffect } from "react"
import styled from "styled-components"
import parse from "html-react-parser"
import FsLightbox from "fslightbox-react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import GMap from "../components/DetailPages/gmap"
import ImageHeader from "../components/ImageHeader"
import GymCard from "../components/gymCard"
import {
  Link as SmoothLink,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll"

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

  @media(min-width: 1200px) {
    margin-left: -8px;
    margin-right: -8px;
  }
`

const HashWrapper = styled.div`
  background: var(--secondary);
  display: flex;
  justify-content: center;
  margin-top: -40px;
  position: -webkit-sticky;
  position: sticky;
  top: 102px;
  z-index: 9;
  margin-bottom: 50px;
  border-top: 1px solid #fff;

  @media (min-width: 1200px) {
    margin-top: -100px;
    top: 85px;
  }
`

const StyledHashLink = styled(SmoothLink)`
  padding: 5px 10px;
  margin: 2px 5px;
  text-transform: uppercase;
  font-size: 17px;
  color: #fff;

  &.active,
  &:hover {
    color: var(--primary);
    cursor: pointer;
  }

  @media (min-width: 1200px) {
    font-size: 22px;
  }
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
        showGalBtn
        openGal={() => openLightboxOnSlide(1)}
        light={dest.ACF_Global.lightHeader}
      />
      <HashWrapper>
        <StyledHashLink
          activeClass="active"
          to="info"
          spy={true}
          smooth={true}
          offset={-175}
          duration={500}
        >
          Info
        </StyledHashLink>
        <StyledHashLink
          activeClass="active"
          to="location"
          spy={true}
          smooth={true}
          offset={-150}
          duration={500}
        >
          Location
        </StyledHashLink>
        <StyledHashLink
          activeClass="active"
          to="gyms"
          spy={true}
          smooth={true}
          offset={-150}
          duration={500}
        >
          Gyms
        </StyledHashLink>
      </HashWrapper>
      <MainContentWrapper>
        <Main>
          <Section firstSec name="info">
            <h1>
              {dest.title} - {dest.ACF_Destinations.sloganMain}
            </h1>
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

          <Section name="location">
            <h2>Location</h2>
            {dest.ACF_Destinations.location.streetAddress}
            <GMap
              latitude={dest.ACF_Destinations.location.latitude}
              longitude={dest.ACF_Destinations.location.longitude}
              zoom={8}
              height="500px"
              iconWidth={120}
              iconHeight={70}
              showMarker
              circRadius={15}
            />
          </Section>

          <Section name="gyms">
            <h2 id="gyms">Gyms</h2>
            <CardsWrapper>
              {dest.ACF_Destinations.gyms.map(gym => {
                return <GymCard gym={gym} thirds key={gym.title} />
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
