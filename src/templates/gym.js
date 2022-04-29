import FsLightbox from "fslightbox-react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import React, { useEffect, useState } from "react"
import { Link as SmoothLink } from "react-scroll"
import styled from "styled-components"
import Button from "../components/Blocks/button"
import ImageHeader from "../components/Blocks/ImageHeader"
import AcomCard from "../components/Cards/acomCard"
import GMap from "../components/DetailPages/gmap"
import Layout from "../components/layout"
import SEO from "../components/seo"

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
    top: 150px;
    margin-top: 40px;
    left: 0;
    height: 100%;
    padding-left: 80px;
  }

  @media (max-width: 1299px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 9;
    transition: 0.3s all ease-out;

    &.closed {
      transform: translateY(75px);

      a {
        height: 48px;
      }

      .priceDetails {
        opacity: 0;
      }
    }

    &.open {
      transform: translateY(0);
    }

    .smallMap {
      display: none;
    }
  }
`

const SideBarContent = styled.div`
  width: 100%;
  border: 1px solid #6f6f6f;
  text-align: left;

  .priceInfo p {
    padding: 0 20px 25px 20px;
    margin: 0;
  }

  > a {
    width: 100%;
    text-transform: uppercase;
    transform-origin: center center;
    transition: 0.3s all ease-out;
  }

  .priceInfo {
    display: block;
    /* padding: 0 20px 20px 20px; */
    color: var(--light-text);
    font-size: 15px;
    text-align: left;
  }

  @media (max-width: 1299px) {
    display: flex;
    align-items: flex-start;
    width: 100%;
    border: none;
    border-top: 1px solid var(--secondary);

    a {
      width: 40%;
      height: 122px;

      svg {
        display: none;
      }
    }
    .priceInfo {
      display: none;
    }
  }
`

const SideBarTop = styled.div`
  padding: 15px;
  h3 {
    margin: 0;
  }

  .priceDetails {
    color: var(--light-text);
    font-size: 15px;
    text-align: left;

    p {
      margin-bottom: 5px;
    }
  }

  @media (max-width: 1299px) {
    width: 60%;
    padding: 10px;
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

const HashWrapperMap = styled.div`
  display: none;

  @media (min-width: 1200px) {
    background: var(--secondary);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    a {
      width: calc(50% - 10px);
      text-align: center;
    }

    a:last-child {
      width: 100%;
    }
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

    &.small {
      font-size: 18px;
    }
  }
`

export default function GymTemplate({ data }) {
  const gym = data.allWpGym.edges[0].node

  const [open, setOpen] = useState(false)

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
    <Layout light={gym.ACF_Global.lightHeader} btmSpaceSmall>
      <SEO title="home" />

      <ImageHeader
        image={gym.featuredImage.node.localFile}
        imagealt={gym.title}
        title={gym.title}
        galBtn
        openGal={() => openLightboxOnSlide(1)}
        light={gym.ACF_Global.lightHeader}
        showIcons
        showGalBtn
        location={gym.ACF_Gyms.destinations.map(
          destination => destination.title
        )}
        level={gym.ACF_Gyms.level.map(level => level).join(", ")}
        owner={gym.ACF_Gyms.owner}
      />

      <HashWrapper>
        <StyledHashLink
          activeClass="active"
          to="info"
          spy={true}
          smooth={true}
          offset={-200}
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
          location
        </StyledHashLink>
        <StyledHashLink
          activeClass="active"
          to="unterkuenfte"
          spy={true}
          smooth={true}
          offset={-175}
          duration={500}
        >
          unterkünfte
        </StyledHashLink>
      </HashWrapper>

      <MainContentWrapper>
        <Main>
          <Section firstSec name="info">
            <h1>{gym.ACF_Gyms.untertitel}</h1>
            {parse(gym.ACF_Gyms.description)}
            <GalleryWrapper>
              {gym.ACF_Gyms.galpreview.slice(0, 4).map((gym, i) => (
                <GalleryItem
                  key={`gym-${i}`}
                  onClick={() => openLightboxOnSlide(i + 1)}
                >
                  <GatsbyImage image={getImage(gym.localFile)} alt="dsdfsfd" />
                </GalleryItem>
              ))}
            </GalleryWrapper>
          </Section>

          <Section name="location">
            <h3>Location</h3>
            {gym.ACF_Gyms.location.streetAddress}
            <GMap
              latitude={gym.ACF_Gyms.location.latitude}
              longitude={gym.ACF_Gyms.location.longitude}
              height="400px"
              iconWidth={120}
              iconHeight={70}
              showMarker
              circRadius={15}
            />
            <Link to={`/destination/${gym.ACF_Gyms.destinations[0].slug}`}>
              Alle Gyms dieser Provinz anschauen
            </Link>
          </Section>
          <Section name="unterkuenfte">
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
        </Main>

        <SideBar
          onClick={() => setOpen(!open)}
          className={open ? "open" : "closed"}
        >
          <SideBarContent>
            <SideBarTop>
              <h3>
                Ab CHF{" "}
                {Number(gym.ACF_Gyms.price) +
                  Number(
                    gym.ACF_Gyms.accommodations[0].ACF_Accommodations.preis
                  ) *
                    7}{" "}
                <small>pro Woche *</small>
              </h3>
              <div className="priceDetails">
                <p>*Inklusive günstiger Unterkunft</p>
                <p>*Exklusive Administrationsaufwand von 990 CHF und Flügen</p>
              </div>
            </SideBarTop>
            <Button url="/anfrage" text="Jetzt buchen" />
            <div className="smallMap">
              <GMap
                latitude={gym.ACF_Gyms.location.latitude}
                longitude={gym.ACF_Gyms.location.longitude}
                height="300px"
                zoom={5}
                circRadius={50000}
                uioptions={{ disableDefaultUI: true }}
              />
            </div>
            <HashWrapperMap>
              <StyledHashLink
                className="small"
                activeClass="active"
                to="info"
                spy={true}
                smooth={true}
                offset={-200}
                duration={500}
              >
                Info
              </StyledHashLink>
              <StyledHashLink
                className="small"
                activeClass="active"
                to="location"
                spy={true}
                smooth={true}
                offset={-150}
                duration={500}
              >
                location
              </StyledHashLink>
              <StyledHashLink
                className="small"
                activeClass="active"
                to="unterkuenfte"
                spy={true}
                smooth={true}
                offset={-175}
                duration={500}
              >
                unterkünfte
              </StyledHashLink>
            </HashWrapperMap>
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
