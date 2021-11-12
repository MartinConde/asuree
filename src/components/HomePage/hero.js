import React, { useState, useEffect } from "react"
import SearchBar from "../Search/searchBar"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import parse from 'html-react-parser'


const HeroWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  margin-bottom: var( --row-mgbtm);
`

const HeroContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  height: 100vh;
  display: flex;
    align-items: center;
    justify-content: center;
  
  @media(min-width:1200px) {
    
    padding: 0;
    text-align: left;
    height: auto;

    > div:first-child {
      width: 65%;
  }
  }
`

const HeroBg = styled.div`
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


`

const FighterImg = styled.div`
  // margin-bottom: -35px;
  margin: 0 auto -35px auto;
  position: relative;
  z-index: -1;
  max-width: 50vw;
  max-width: 300px;
  display: none;
  

  @media(min-width: 1200px) {
    display: block;
    padding-left: 2vw;
    max-width: 100%;
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

  @media(min-width:1200px) {
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
  max-width: 500px;
  margin: 0 auto;

  br {
    display: none;
  }

  @media(min-width:1200px) {
    font-size: 24px;
    max-width: 100%;

    br {
      display: block;
    }
  }
`

const Hero = () => {
  const herodata = useStaticQuery(graphql`
  query HeroQuery {
    wpPage( slug: {eq: "home"}) {
    ACF_Home {
      heroH1Large
      heroH1Small
      heroText
      heroBackground {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      heroFighter {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
  }
`)

  const breakpoints = useBreakpoint();

  return (
    <HeroWrapper>
      <HeroContent>
        <div>
          <MainTitle>
            <small>{herodata.wpPage.ACF_Home.heroH1Small}</small> {herodata.wpPage.ACF_Home.heroH1Large}
          </MainTitle>
          <IntroText>
            {parse(herodata.wpPage.ACF_Home.heroText)}
          </IntroText>
        </div>
        <FighterImg>
        <GatsbyImage image={getImage(herodata.wpPage.ACF_Home.heroFighter.localFile)} alt="dsdfsfd" />
        </FighterImg>
      </HeroContent>
      <SearchBar withButton />

      <HeroBg>
      <GatsbyImage image={getImage(herodata.wpPage.ACF_Home.heroBackground.localFile)} alt="dsdfsfd" />
      </HeroBg>
    </HeroWrapper>
  )
}

export default Hero
