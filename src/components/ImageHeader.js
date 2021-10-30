import React, { useState } from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 75vh;
  box-shadow: 0 0 25px rgba(0, 0, 51, 1);

  .gatsby-image-wrapper {
    width: 100%;
    height: 75vh;
  }

  &::after {
    content: "";
    position: absolute;
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
  position: absolute;
  left: 0;
  bottom: 5px;
  padding: 15px;
  width: 100%;
  max-width: 1200px;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  path {
    fill: #fff;
  }

  @media (min-width: 1300px) {
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    padding: 0;
  }
`
const Title = styled.h1``


export default function ImageHeader({
  image,
  imageAlt,
  title
}) {
  const breakpoints = useBreakpoint()
  return (
    <Wrapper>
      <GatsbyImage image={getImage(image)} alt={imageAlt} />

      <Content>
       <Title>{title}</Title>
      </Content>
    </Wrapper>
  )
}
