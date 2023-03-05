import { useBreakpoint } from "gatsby-plugin-breakpoints"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import IconBar from "./IconBar"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 55vh;
  box-shadow: 0 0 25px rgba(0, 0, 51, 1);
  margin-bottom: var(--row-mgbtm);
  display: flex;
  justify-content: center;
  align-items: flex-end;

  .gatsby-image-wrapper {
    width: 100vw;
    height: 55vh;
    overflow: visible;
    position: absolute;
    top: 0;
    left: 0;
  }

  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 51);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 51, 1) 0%,
      rgba(0, 0, 51, 0) 80%
    );
  }

  @media (min-width: 1300px) {
    height: 55vh;
    .gatsby-image-wrapper {
      height: 55vh;
    }
    &::after {
      background: linear-gradient(
        0deg,
        rgba(0, 0, 51, 1) 0%,
        rgba(0, 0, 51, 0) 40%
      );
    }
  }
`

const Content = styled.div`
  position: relative;
  z-index: 9;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`
const Title = styled.span`
  margin-bottom: 0;
  color: ${props => (props.light ? "#fff" : "var(--secondary)")};
  text-shadow: ${props =>
    props.light ? "4px 4px 1px var(--secondary)" : "2px 2px 1px #fff"};
  font-size: 60px;
  text-align: center;
  font-family: "FIGHTER BRUSH Regular";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 80px;
  }

  @media (min-width: 1300px) {
    font-size: 90px;
  }

  @media (min-width: 1800px) {
    font-size: 110px;
  }
`

export default function ImageHeader({
  image,
  imageAlt,
  title,
  openGal,
  light,
  noTitle,
  location,
  level,
  owner,
  showIcons,
  showGalBtn,
}) {
  // const breakpoints = useBreakpoint()
  return (
    <Wrapper noTitle={noTitle}>
      <GatsbyImage image={getImage(image)} alt={imageAlt ? imageAlt : title} />
      {!noTitle && <Title light={light}>{title}</Title>}
      <Content>
        <IconBar
          location={location}
          level={level}
          owner={owner}
          openGal={openGal}
          showIcons={showIcons}
          showGalBtn={showGalBtn}
        />
      </Content>
    </Wrapper>
  )
}
