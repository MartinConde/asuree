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
import Button from "../components/Blocks/button"

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
  @media (min-width: 1300px) {
    width: 72%;
  }
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

const SideBar = styled.div`
  @media (min-width: 1300px) {
    width: 28%;
    position: -webkit-sticky;
    position: sticky;
    top: 125px;
    margin-top: 40px;
    left: 0;
    height: 100%;
    padding-left: 80px;
  }
`

const SideBarContent = styled.div`
  width: 100%;
  border: 1px solid #6f6f6f;
  text-align: center;

  h3 {
    padding: 20px;
    margin: 0;
  }

  p {
    padding: 0 20px 25px 20px;
    margin: 0;
  }

  a {
    width: 100%;
    text-transform: uppercase;
  }
`

const AcomWrapper = styled.div`
  @media (min-width: 768px) {
    display: grid;
    overflow: hidden;
    grid-template-columns: 1;
    grid-auto-rows: 1fr;
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

export default function GymTemplate({ data }) {
  const gym = data.allWpGym.edges[0].node

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

  useEffect(() => {
    localStorage.setItem("gymData", JSON.stringify(gym))
  }, [data])

  return (
    <Layout light={gym.ACF_Global.lightHeader}>
      <SEO title="home" />

      <Hero
      light={gym.ACF_Global.lightHeader}
      title={gym.title}
        image={gym.featuredImage.node.localFile}
        imageAlt={gym.title}
        location={gym.ACF_Gyms.destinations.map(
          destination => destination.title
        )}
        level={gym.ACF_Gyms.level.map(level => level).join(", ")}
        owner={gym.ACF_Gyms.owner}
        openGal={() => openLightboxOnSlide(1)}
      />

      <MainContentWrapper>
        <Main>
          <Section firstSec>
            <h2>{gym.ACF_Gyms.name}</h2>
            {parse(gym.ACF_Gyms.description)}
            <GalleryWrapper>
              {gym.ACF_Gyms.galpreview.slice(0, 5).map((gym, i) => (
                <GalleryItem
                  key={`gym-${i}`}
                  onClick={() => openLightboxOnSlide(i + 1)}
                >
                  <GatsbyImage image={getImage(gym.localFile)} alt="dsdfsfd" />
                </GalleryItem>
              ))}
            </GalleryWrapper>
          </Section>

          <Section>
            <h3>Location</h3>
            {gym.ACF_Gyms.location.streetAddress}
            <GymMap
              latitude={gym.ACF_Gyms.location.latitude}
              longitude={gym.ACF_Gyms.location.longitude}
            />
            <Link to={`/destination/${gym.ACF_Gyms.destinations[0].slug}`}>
              Alle Gyms dieser Provinz anschauen
            </Link>
          </Section>
          <Section>
            <h3>Unterkünfte</h3>
            <AcomWrapper>
              {gym.ACF_Gyms.accommodations.map(acom => {
                return (
                  <AcomCard
                    key={acom.title}
                    title={acom.title}
                    preis={acom.ACF_Accommodations.preis}
                    image={acom.featuredImage.node.localFile}
                    description={acom.ACF_Accommodations.description}
                    amenities={acom.ACF_Accommodations.amenities}
                    sterne={acom.ACF_Accommodations.sterne}
                  />
                )
              })}
            </AcomWrapper>
          </Section>

          <h3>Training</h3>

          <h3>Reviews</h3>
        </Main>

        <SideBar>
          <SideBarContent>
            <h3>
              Ab CHF 420 <small>pro Woche</small>
            </h3>
            <p>
              We are created to serve a singular purpose, for which we will go
              to any lengths to fulfill!
            </p>
            <Button url="/anfrage" text="Jetzt buchen" />
          </SideBarContent>
        </SideBar>
      </MainContentWrapper>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={gym.ACF_Gyms.gallery.map((gym, i) => (
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
              image={getImage(gym.localFile)}
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
    allWpGym(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          ...GymFragment
        }
      }
    }
  }
`
