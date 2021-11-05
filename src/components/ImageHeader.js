import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 75vh;
  box-shadow: 0 0 25px rgba(0, 0, 51, 1);
  margin-bottom: var( --row-mgbtm);

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

const GalerieBtn = styled.button`
  display: flex;
  align-items: center;
  background: rgba(12, 178, 247, 0.46);
  border-radius: 0;
  border: none;
  border-radius: 0;
  color: #fff;
  padding: 10px;
  transition: 0.3s all ease-out;

  svg {
    height: 30px;
  }

  &:hover {
    cursor: pointer;
    background: rgba(12, 178, 247, 1);
  }

  @media(min-width: 1300px) {
    padding: 8px 26px;

    svg {
      margin-left: 15px;
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
  title,
  galBtn,
  openGal
}) {
  const breakpoints = useBreakpoint()
  return (
    <Wrapper galBtn={galBtn}>
      <GatsbyImage image={getImage(image)} alt={imageAlt} />

      <Content>
       <Title>{title}</Title>
       {galBtn && <GalerieBtn onClick={openGal}>
            <span>Alle Bilder anschauen </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 21">
              <path d="M22.176 20.569H2.41c-1.285 0-2.41-1.045-2.41-2.41v-13.9c0-1.286 1.045-2.411 2.41-2.411h19.686c1.285 0 2.41 1.044 2.41 2.41v13.98c.08 1.286-1.045 2.33-2.33 2.33zM2.41 3.053c-.642 0-1.124.482-1.124 1.205v13.98c0 .643.562 1.206 1.205 1.206h19.685c.643 0 1.205-.563 1.205-1.205V4.259c0-.643-.562-1.206-1.205-1.206H2.41z" />
              <path d="M15.668 16.953c-3.134 0-5.705-2.57-5.705-5.704s2.571-5.705 5.705-5.705c3.133 0 5.704 2.571 5.704 5.705 0 3.133-2.57 5.704-5.704 5.704zm0-10.284c-2.491 0-4.5 2.008-4.5 4.5 0 2.49 2.009 4.499 4.5 4.499 2.49 0 4.499-2.009 4.499-4.5 0-2.49-2.009-4.5-4.5-4.5zM7.955 4.982h-4.5v1.205h4.5V4.982zM5.865 0H4.66v2.49h1.205V0z" />
              <path d="M15.668 13.578c-1.366 0-2.41-1.044-2.41-2.41s1.044-2.41 2.41-2.41 2.41 1.044 2.41 2.41-1.125 2.41-2.41 2.41zm0-3.535c-.643 0-1.205.562-1.205 1.205s.562 1.205 1.205 1.205 1.205-.562 1.205-1.205c-.08-.723-.563-1.205-1.205-1.205z" />
            </svg>
          </GalerieBtn>}
      </Content>
    </Wrapper>
  )
}
