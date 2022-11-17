import React, { useState, useEffect } from "react"
import SearchBar from "../Search/searchBar"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import parse from "html-react-parser"

const HeroWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  margin-bottom: var(--row-mgbtm);
  overflow: hidden;

  @media (min-height: 736px) and (max-width: 767px) {
    height: 100vh;
  }

  @media (min-width: 768px) {
    height: 60vh;
    min-height: 60vh;
  }

  @media (min-width: 992px) and (orientation: landscape) {
    height: 70vh;
    min-height: 70vh;
  }

  @media (min-width: 1200px) {
    overflow: visible;
    min-height: 90vh;
  }

  @media (min-width: 1600px) {
    min-height: 80vh;
  }

  @media (min-width: 2200px) {
    min-height: 60vh;
  }
`

const HeroContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 20px 20px;
  text-align: center;
  /* height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row-reverse;
    
    .mainContent {
      text-align: left;
      margin-right: auto;
      padding: 0 50px;
    }
  }

  @media (min-width: 992px) and (orientation: landscape) {
    .mainContent {
      width: 50%;
      max-width: 500px;
      
    }
  }

  @media (min-width: 1200px) {
    padding: 0;
    text-align: left;
    height: auto;

    /* > div:first-child {
      width: 65%;
    } */

    .mainContent {
      width: 50%;
      max-width: 700px;
    }
  }
`

const HeroBg = styled.div`
  /* display: none; */

  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -5;
  opacity: 0.3;

  .gatsby-image-wrapper {
    height: 80vh;
  }

  .gatsby-image-wrapper img {
    object-position: bottom;
  }

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -5;

    .gatsby-image-wrapper {
      height: 80vh;
    }

    .gatsby-image-wrapper img {
      object-position: bottom;
    }
  }
`

const FighterImg = styled.div`
  margin: 0 auto -40px -50px;
  position: relative;
  z-index: -1;
  max-width: 50vw;
  max-width: 350px;

  @media (min-width: 768px) {
    margin: 0 auto -40px -50px;
  }

  @media (min-width: 992px) and (orientation: landscape) {
    max-width: 450px;
  }

  @media (min-width: 1200px) {
    padding-right: 2vw;
    max-width: 40vw;
    margin: 0 auto 0 0;
  }

  @media (min-width: 1600px) {
    padding-right: 2vw;
    max-width: 35vw;
    margin: 0 auto 0 -150px;
  }

  @media (min-width: 2200px) {
    padding-right: 2vw;
    max-width: 30vw;
  }
`

const MainTitle = styled.h1`
  font-size: 50px;
  color: #000033;
  line-height: 0.7;

  small {
    display: block;
    font-size: 30px;
  }

  @media (min-width: 1200px) {
    font-size: 127px;

    small {
      font-size: 85px;
    }
  }
`
const IntroText = styled.div`
  font-size: 18px;
  font-family: "Oswald Bold";
  line-height: 1.5;
  /* max-width: 500px; */
  margin: 0 auto;

  br {
    display: none;
  }

  @media (min-width: 1200px) {
    font-size: 24px;
    max-width: 100%;

    br {
      display: block;
    }
  }
`

const HashTag = styled.div`
  display: none;

  @media (min-width: 1200px) {
    display: block;
    position: absolute;
    font-family: "FIGHTER BRUSH Regular", -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
    font-size: 12vw;
    z-index: -1;
    top: 50%;
    left: 0;
    transform: rotate(90deg) translate(-5%, 70%);
    opacity: 0.3;
    font-size: 15vmin;
    top: 40%;
  }

  @media (min-width: 1600px) {
    font-size: 18vmin;
    top: 50%;
  }

  @media (min-width: 2200px) {
    font-size: 16vmin;
    top: 60%;
  }
`

const Hero = () => {
  const herodata = useStaticQuery(graphql`
    query HeroQuery {
      wpPage(slug: { eq: "home" }) {
        ACF_Home {
          heroH1Large
          heroH1Small
          heroText
          heroBackground {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
              }
            }
          }
          heroFighter {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  `)

  const breakpoints = useBreakpoint()

  return (
    <HeroWrapper>
      <HeroContent>
        <div className="mainContent">
          <MainTitle>
            <small>{herodata.wpPage.ACF_Home.heroH1Small}</small>{" "}
            {herodata.wpPage.ACF_Home.heroH1Large}
          </MainTitle>
          <IntroText>{parse(herodata.wpPage.ACF_Home.heroText)}</IntroText>
        </div>
        <FighterImg>
          <GatsbyImage
            image={getImage(herodata.wpPage.ACF_Home.heroFighter.localFile)}
            alt="dsdfsfd"
          />
        </FighterImg>
        <HashTag>
          <span>#TRAINREAL</span>
        </HashTag>
      </HeroContent>
      <SearchBar withButton />

      <HeroBg>
        <GatsbyImage
          image={getImage(herodata.wpPage.ACF_Home.heroBackground.localFile)}
          alt="dsdfsfd"
        />
      </HeroBg>
    </HeroWrapper>
  )
}

export default Hero
