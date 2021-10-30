import React, { useState, useEffect } from "react"
import styled from "styled-components"
import parse from "html-react-parser"
import FsLightbox from "fslightbox-react"
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"

import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/DetailPages/hero"
import GMap from "../components/DetailPages/gmap"

import Map from "../components/DetailPages/map"
import TabContent from "../components/DetailPages/Tabs/tabContent"
import Tabs from "../components/DetailPages/Tabs/tabsButtons"
import AttributeBar from "../components/DetailPages/attributeBar"
import Gallery from "../components/DetailPages/gallery"
import AcomCard from "../components/DetailPages/acomCard"

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
  margin-top: 30px;
  padding: 20px 20px 65px 20px;
  border-bottom: 1px solid #ddd7d7;

  @media (min-width: 1300px) {
    margin-top: 105px;
    padding: 20px 20px 125px 20px;
  }
`

const SideBar = styled.div`
  @media (min-width: 1300px) {
    width: 28%;
    position: -webkit-sticky;
    position: sticky;
    top: 100px;
    margin-top: 105px;
    left: 0;
    height: 100%;
    padding-left: 80px;
  }
`

const SideBarContent = styled.div`
  width: 100%;
  border: 1px solid #6f6f6f;
  padding: 20px;
  text-align: center;
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
  background: #eee;
  flex-wrap: wrap;
  gap: 12px;
`

const GalleryItem = styled.div`
  display: flex;
  width: calc(50% - 9px);
  height: 200px;

  @media (min-width: 768px) {
    width: calc(25% - 9px);
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
    localStorage.setItem(
      "gymData",
      JSON.stringify(gym)
    )
  }, [data])

  return (
    <Layout light>
      <SEO title="home" />

      <Hero
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
          <Section>
            <h1>{gym.title}</h1>
            {parse(gym.ACF_Gyms.description)}
            <GalleryWrapper>
              {gym.ACF_Gyms.gallery.slice(0, 5).map((gym, i) => (
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
            <h2>Location</h2>
            {gym.ACF_Gyms.location.streetAddress}
            <GMap
              latitude={gym.ACF_Gyms.location.latitude}
              longitude={gym.ACF_Gyms.location.longitude}
            />
          </Section>
          <Section>
            <h2>Unterkünfte</h2>
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

          <h1>Training</h1>

          <h1>Reviews</h1>
        </Main>

        <SideBar>
          <SideBarContent>
            <h3>
              Ab CHF 420<small>pro Woche</small>
            </h3>
            <Link to={`/anfrage`}>
              Jetzt buchen
            </Link>
            <p>sfsfgdfgfdgdfgdgf</p>
            <p>sfsfgdfgfdgdfgdgf</p>
          </SideBarContent>
        </SideBar>
      </MainContentWrapper>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={gym.ACF_Gyms.gallery.map((gym, i) => (
          <div className="galFull" key={i}>
            <GatsbyImage image={getImage(gym.localFile)} alt="dsdfsfd" />
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
