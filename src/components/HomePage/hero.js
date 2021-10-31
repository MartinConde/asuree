import * as React from "react"
import SearchBar from "../Search/searchBar"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

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
  
  @media(min-width:1200px) {
    display: flex;
    align-items: center;
    padding: 0;
    text-align: left;

    > div:first-child {
      width: 65%;
  }
  }
`

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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
  

  @media(min-width: 1200px) {
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
const IntroText = styled.p`
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

const Hero = () => (
  <HeroWrapper>
    <HeroContent>
      <div>
        <MainTitle>
          <small>MUAY THAI CAMPS</small> IN THAILAND
        </MainTitle>
        <IntroText>
          ERLEBE DEN NATIONALSPORT THAILANDS IN EINEM EXKLUSIVEN GYM - <br />
          THE ULTIMATE MUAY THAI EXPERIENCE IM LAND DES LÄCHELNS
        </IntroText>
      </div>
      <FighterImg>
        <StaticImage src="../../images/fighta.png" alt="fighta" placeholder="blurred" loading="eager" />
      </FighterImg>
    </HeroContent>
    <SearchBar withButton />
    <HeroBg>
      <StaticImage
        src="../../images/headerhuette.jpg"
        alt="jeilet camp"
        placeholder="blurred"
        loading="eager"
      />
    </HeroBg>
  </HeroWrapper>
)

export default Hero
