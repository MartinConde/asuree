import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 75vh;
  box-shadow: 0 0 25px rgba(0, 0, 51, 1);
  margin-bottom: var(--row-mgbtm);

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

const Bar = styled.div`
  color: #fff;

  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`

const BarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;

  svg {
    height: 40px;
    margin-right: 4px;
  }

  @media (min-width: 1300px) {
    padding: 10px 10px 10px 0;
    margin-right: 15px;
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

  @media (min-width: 1300px) {
    padding: 8px 26px;

    svg {
      margin-left: 15px;
    }
  }
`

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-bottom: 0;
  color: ${props => (props.light ? "#fff" : "var(--secondary)")};
  text-shadow: ${props =>
    props.light ? "4px 4px 1px var(--secondary)" : "2px 2px 1px #fff"};
  font-size: 70px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 100px;
  }

  @media (min-width: 1300px) {
    font-size: 110px;
  }
`

export default function Hero({
  image,
  imageAlt,
  location,
  level,
  owner,
  openGal,
  title,
  light,
}) {
  const breakpoints = useBreakpoint()
  return (
    <Wrapper>
      <GatsbyImage image={getImage(image)} alt={imageAlt} />
      <Title light={light}>{title}</Title>
      <Content>
        <Bar>
          <BarItem>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path d="M26.151 24.172c6.042-12.77 21.296-18.221 34.066-12.179 12.774 6.045 18.225 21.296 12.18 34.069L49.274 94.925 26.151 46.062a25.592 25.592 0 010-21.89zm2.468 20.727l20.655 43.639L69.93 44.899c5.399-11.416.53-25.038-10.881-30.435-11.408-5.396-25.026-.531-30.43 10.876a22.902 22.902 0 000 19.559z" />
              <path d="M52.033 23.754a2.56 2.56 0 00-2.562-2.557 2.555 2.555 0 000 5.11 2.558 2.558 0 002.562-2.553z" />
              <path d="M57.116 26.885l-1.944 4.628a3.404 3.404 0 01-5.612 1.009L48.034 30.9a.63.63 0 00-.895-.033c-.026.025-.047.055-.068.076l-1.569 2.076a3.4 3.4 0 00-.688 1.902l-.274 6.307a3.349 3.349 0 01-.498 1.637l-3.552 5.779h-4.231l4.219-6.871a3.357 3.357 0 00.498-1.633l.279-6.498c.033-.691.27-1.357.687-1.91l2.856-3.76c.114-.151.237-.295.38-.417a3.392 3.392 0 014.805.147l1.32 1.409a.63.63 0 001.042-.194l.544-1.282a2.564 2.564 0 01-.484-2.733 2.557 2.557 0 014.711 1.983zM56.45 30.795h2.479a2.556 2.556 0 003.385 1.271 2.556 2.556 0 00-1.055-4.882h-3.295l-1.514 3.611z" />
              <path d="M50.308 42.891l.856 5.754h3.648l-1.143-7.668a3.402 3.402 0 00-1.211-2.136L48.7 35.777a1.802 1.802 0 10-2.278 2.794l2.674 2.185a3.437 3.437 0 011.212 2.135z" />
            </svg>
            <span>{location}</span>
          </BarItem>
          <BarItem>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M23.38 43.16c.18.15.4.22.63.22s.44-.07.63-.22l11.04-8.83a1 1 0 0 0 .38-.78V5.62c0-.55-.45-1-1-1h-22.1c-.55 0-1 .45-1 1v27.93c0 .3.14.59.38.78l11.04 8.83zM13.96 6.62h20.08v26.45L24 41.1l-10.04-8.03V6.62z" />
              <path d="M23.35 17.75c.19.16.42.24.65.24s.46-.08.65-.24l7.73-6.63a.999.999 0 1 0-1.3-1.52L24 15.67 16.92 9.6a.999.999 0 1 0-1.3 1.52l7.73 6.63z" />
              <path d="M23.35 25.48c.19.16.42.24.65.24s.46-.08.65-.24l7.73-6.63a.999.999 0 1 0-1.3-1.52L24 23.4l-7.08-6.07a.999.999 0 1 0-1.3 1.52l7.73 6.63z" />
              <path d="m24.65 33.21 7.73-6.63a.999.999 0 1 0-1.3-1.52L24 31.13l-7.08-6.07a.999.999 0 1 0-1.3 1.52l7.73 6.63c.19.16.42.24.65.24s.46-.08.65-.24z" />
            </svg>
            <span>{level}</span>
          </BarItem>
          {owner && (
            <BarItem>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <path d="M58 56a3 3 0 0 0-2-2.82v-.47A12 12 0 0 0 45.49 40.8L40 40.12v-4.65a14.23 14.23 0 0 0 1.15-.9l4.14 4.14a1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 0-1.42l-4.82-4.82c.06-.15.11-.31.17-.47h.44a4.49 4.49 0 0 0 .5-8.95V20a3 3 0 0 0 0-6 14 14 0 0 0-27.9 0H18a3 3 0 0 0 0 6v.05a4.49 4.49 0 0 0 .5 9h.44c.1.27.22.54.34.81l-4.49 4.48a1 1 0 0 0 0 1.42l3 3a1 1 0 0 0 1.42 0l3.9-3.9c.28.23.59.45.89.66v4.65l-5.49.68A12 12 0 0 0 8 52.71v.47a3 3 0 0 0 0 5.64V63h2v-4h6v4h2V51h-2v2h-6v-.29a10 10 0 0 1 8.76-9.92l6.36-.8A1 1 0 0 0 26 41v-4.37a13.82 13.82 0 0 0 12 0V41a1 1 0 0 0 .88 1l6.36.8A10 10 0 0 1 54 52.71V53h-6v-2h-2v12h2v-4h6v4h2v-4.18A3 3 0 0 0 58 56Zm-42 1H9a1 1 0 0 1 0-2h7Zm31.59-22L46 36.59l-3.43-3.44a14.33 14.33 0 0 0 1.34-1.83ZM48 24.5a2.49 2.49 0 0 1-2.33 2.5 14 14 0 0 0 .33-3v-1.95a2.5 2.5 0 0 1 2 2.45ZM47 17a1 1 0 0 1-1 1h-3.59l2-2H46a1 1 0 0 1 1 1Zm-20.41-1-2 2h-2.18l2-2Zm2.82 0h2.18l-2 2h-2.18Zm5 0h2.18l-2 2h-2.18Zm5 0h2.18l-2 2h-2.18ZM32 3a12 12 0 0 1 12 11H20.05A12 12 0 0 1 32 3ZM17 17a1 1 0 0 1 1-1h3.59l-2 2H18a1 1 0 0 1-1-1Zm-1 7.5a2.5 2.5 0 0 1 2-2.45V24a14 14 0 0 0 .33 3A2.49 2.49 0 0 1 16 24.5Zm2.5 12.09L16.91 35l3.37-3.37a13.39 13.39 0 0 0 1.39 1.79ZM20 24v-4h24v4a12 12 0 0 1-24 0Zm35 33h-7v-2h7a1 1 0 0 1 0 2Z" />
                <path d="M40 54h2v2h-2zm-18 0h2v2h-2z" />
              </svg>
              <span>{owner}</span>
            </BarItem>
          )}
        </Bar>
        {breakpoints.l ? (
          <GalerieBtn onClick={openGal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 21">
              <path d="M22.176 20.569H2.41c-1.285 0-2.41-1.045-2.41-2.41v-13.9c0-1.286 1.045-2.411 2.41-2.411h19.686c1.285 0 2.41 1.044 2.41 2.41v13.98c.08 1.286-1.045 2.33-2.33 2.33zM2.41 3.053c-.642 0-1.124.482-1.124 1.205v13.98c0 .643.562 1.206 1.205 1.206h19.685c.643 0 1.205-.563 1.205-1.205V4.259c0-.643-.562-1.206-1.205-1.206H2.41z" />
              <path d="M15.668 16.953c-3.134 0-5.705-2.57-5.705-5.704s2.571-5.705 5.705-5.705c3.133 0 5.704 2.571 5.704 5.705 0 3.133-2.57 5.704-5.704 5.704zm0-10.284c-2.491 0-4.5 2.008-4.5 4.5 0 2.49 2.009 4.499 4.5 4.499 2.49 0 4.499-2.009 4.499-4.5 0-2.49-2.009-4.5-4.5-4.5zM7.955 4.982h-4.5v1.205h4.5V4.982zM5.865 0H4.66v2.49h1.205V0z" />
              <path d="M15.668 13.578c-1.366 0-2.41-1.044-2.41-2.41s1.044-2.41 2.41-2.41 2.41 1.044 2.41 2.41-1.125 2.41-2.41 2.41zm0-3.535c-.643 0-1.205.562-1.205 1.205s.562 1.205 1.205 1.205 1.205-.562 1.205-1.205c-.08-.723-.563-1.205-1.205-1.205z" />
            </svg>
          </GalerieBtn>
        ) : (
          <GalerieBtn onClick={openGal}>
            <span>Alle Bilder anschauen </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 21">
              <path d="M22.176 20.569H2.41c-1.285 0-2.41-1.045-2.41-2.41v-13.9c0-1.286 1.045-2.411 2.41-2.411h19.686c1.285 0 2.41 1.044 2.41 2.41v13.98c.08 1.286-1.045 2.33-2.33 2.33zM2.41 3.053c-.642 0-1.124.482-1.124 1.205v13.98c0 .643.562 1.206 1.205 1.206h19.685c.643 0 1.205-.563 1.205-1.205V4.259c0-.643-.562-1.206-1.205-1.206H2.41z" />
              <path d="M15.668 16.953c-3.134 0-5.705-2.57-5.705-5.704s2.571-5.705 5.705-5.705c3.133 0 5.704 2.571 5.704 5.705 0 3.133-2.57 5.704-5.704 5.704zm0-10.284c-2.491 0-4.5 2.008-4.5 4.5 0 2.49 2.009 4.499 4.5 4.499 2.49 0 4.499-2.009 4.499-4.5 0-2.49-2.009-4.5-4.5-4.5zM7.955 4.982h-4.5v1.205h4.5V4.982zM5.865 0H4.66v2.49h1.205V0z" />
              <path d="M15.668 13.578c-1.366 0-2.41-1.044-2.41-2.41s1.044-2.41 2.41-2.41 2.41 1.044 2.41 2.41-1.125 2.41-2.41 2.41zm0-3.535c-.643 0-1.205.562-1.205 1.205s.562 1.205 1.205 1.205 1.205-.562 1.205-1.205c-.08-.723-.563-1.205-1.205-1.205z" />
            </svg>
          </GalerieBtn>
        )}
      </Content>
    </Wrapper>
  )
}
