import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import parse from "html-react-parser"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"
import { URLHash } from "@splidejs/splide-extension-url-hash"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Annotation,
} from "react-simple-maps"
import { useStaticQuery, graphql } from "gatsby"
import ThaiPro from "../static/thailand-provinces.json"
import Button from "./Blocks/button"

const Container = styled.div`
  width: 100%;
  position: relative;
  min-height: 70vh;

  @media (min-width: 768px) {
    min-height: 0;
  }

  @media (min-width: 1200px) {
    display: flex;
    align-items: center;
    min-height: 0;
  }
`

const MapWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;

  @media (min-width: 768px) {
    justify-content: flex-end;
    margin-top: 20px;
  }

  @media (min-width: 1200px) {
    margin: -16vh 0;
    position: relative;
    width: auto;
    height: auto;
    opacity: 1;
    z-index: 9;
  }

  @media (min-width: 1500px) {
    margin: -28vh 0;
  }

  @media (min-width: 2200px) {
    margin: -21vh 0;
  }

  path {
    outline: none;
    transition: 0.3s all ease-out;
    stroke: var(--primary) !important;
  }

  .rsm-annotation path {
    fill: none;
    stroke: var(--primary) !important;
  }

  .rsm-annotation text {
    fill: var(--primary) !important;
  }

  .current.rsm-annotation path {
    fill: none;
    stroke: var(--tertiary) !important;
  }

  .current.rsm-annotation text {
    fill: var(--tertiary) !important;
  }

  .rsm-annotation:hover {
    cursor: pointer;
  }

  .noGyms {
    pointer-events: none;
    fill: var(--secondary) !important;
  }

  .hasGyms {
    fill: var(--primary) !important;
  }

  .hasGyms:hover {
    fill: var(--tertiary) !important;
    cursor: pointer;
  }
  .current {
    fill: var(--tertiary) !important;
  }
`

const DestWrapper = styled.div`
  color: #fff;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 20px 20px;

  @media (min-width: 1200px) {
    height: calc(100% + 25vmin);
    max-height: 130%;
    padding: 20px;
  }

  h2 {
    color: #fff;
    text-align: center;

    @media (min-width: 1200px) {
      text-align: left;
      margin-left: -13vw;
      margin-top: -6vh;
      color: var(--secondary);
    }

    @media (min-width: 1500px) {
      margin-top: -7vh;
      margin-top: -3vh;
    }

    @media (min-width: 2200px) {
      margin-left: -10vw;
    }
  }

  > div {
    margin: auto;
    width: 100%;
  }

  div > div {
    margin: 0 auto;
    max-width: 650px;
  }

  .splide__list {
    display: flex;
  }

  .splide__slide {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 475px;
  }

  @media (min-width: 1200px) {
    .splide__slide {
      min-height: 0;
      height: auto;
    }
  }

  .splide__arrow,
  .splide__arrow:hover {
    background: rgba(255, 255, 255, 0);
    width: auto;
    height: auto;
    opacity: 1;
  }

  .splide__arrow svg {
    fill: #fff;
    height: 65px;
    width: 65px;
    transition: 0.3s all ease-out;
  }

  .splide__arrow:hover svg {
    fill: var(--primary);
  }

  .splide__arrow--next {
    top: -35px;
    right: 0;
  }
  .splide__arrow--prev {
    top: -35px;
    left: 0;
  }

  @media (min-width: 400px) {
    .splide__arrow--next {
      top: -35px;
      right: 20px;
    }
    .splide__arrow--prev {
      top: -35px;
      left: 20px;
    }
  }

  @media (min-width: 1024px) {
    .splide__arrow--next {
      top: 50%;
      right: -20px;
    }
    .splide__arrow--prev {
      top: 50%;
      left: -30px;
    }
  }
`

const ThaiMap = () => {
  const breakpoints = useBreakpoint()

  const mapsdata = useStaticQuery(graphql`
    query MapsQuery {
      allWpDestination {
        edges {
          node {
            ...DestinationFragment
          }
        }
      }
      allWpGym {
        edges {
          node {
            ...GymFragment
          }
        }
      }
    }
  `)

  const [location, setLocation] = useState("Bangkok")

  const destins = mapsdata.allWpDestination.edges.map(({ node }) => node)

  const bigCities = destins.filter(function (e) {
    return e.ACF_Destinations.gyms
  })

  // Get name of destinations with gym and check with location state
  const destnames = bigCities.map(dest => dest.title)

  const selectedDest = destins.filter(function (e) {
    return e.title === location
  })
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      const current = ref.current.splide.Components.Slides.filter(
        `[data-splide-hash="${selectedDest[0].title}"]`
      )
      ref.current.splide.on("mounted", function () {
        ref.current.splide.go(current[0].index)
      })
    }
  }, [])

  useEffect(() => {
    if (ref.current) {
      const current = ref.current.splide.Components.Slides.filter(
        `[data-splide-hash="${selectedDest[0].title}"]`
      )

      ref.current.splide.go(current[0].index)
    }
  }, [location])

  useEffect(() => {
    if (ref.current) {
      ref.current.splide.on("mounted move", function () {
        const current = ref.current.splide.Components.Slides.filter(
          Slide => Slide.index === ref.current.splide.index.index
        )
        const index = ref.current.splide.index

        // const next = ref.current.splide.Components.Slides.filter(
        //   Slide => Slide.index === ref.current.splide.index + 1
        // )

        // const prev = ref.current.splide.Components.Slides.filter(
        //   Slide => Slide.index === ref.current.splide.index - 1
        // )

        // console.log(next)

        setLocation(ref.current.slides[index].dataset.splideHash)
      })
    }
  }, [ref.current])

  // const GymMarkers = mapsdata.allWpGym.edges.map(
  //   ({ node }) => node.ACF_Gyms.location
  // )

  // const filteredGymMarkers = Array.from(
  //   GymMarkers.reduce((m, o) => m.set(o.state, o), new Map()).values()
  // )

  // Get all destinations and filter out the ones that have gyms

  const handleFilter = ({ constructor: { name } }) => {
    return name !== "MouseEvent"
  }

  return (
    <Container>
      <MapWrapper>
        <ComposableMap
          projection="geoAlbers"
          projectionConfig={{
            rotate: [-99, 26, 4.5],
            scale: 3000,
          }}
          // width={breakpoints.l ? 250 : 200}
          // height={breakpoints.l ? 1125 : 900}
          width={
            (breakpoints.xxs && 450) ||
            (breakpoints.xs && 550) ||
            (breakpoints.l && 500) ||
            (!breakpoints.l && 100)
          }
          height={
            (breakpoints.xxs && 800) ||
            (breakpoints.xs && 900) ||
            (breakpoints.l && 825) ||
            (!breakpoints.l && 1100)
          }
          style={{
            width:
              (breakpoints.xxs && "300px") ||
              (breakpoints.xs && "400px") ||
              (breakpoints.l && "400px") ||
              (!breakpoints.l && "600px"),
            height: "auto",
            maxHeight: "1200px",
          }}
        >
          <ZoomableGroup
            filterZoomEvent={handleFilter}
            center={[0, 0]}
            // translateExtent={[
            //   [0, -0],
            //   [200, 900],
            // ]}
            translateExtent={[
              [0, -0],
              [breakpoints.xs ? 415 : 200, 900],
            ]}
            minZoom={1}
            maxZoom={1}
          >
            <Geographies geography={ThaiPro}>
              {({ geographies }) =>
                geographies.map((geo, i) => (
                  <Geography
                    className={
                      (destnames.includes(geo.properties.NAME_1)
                        ? "hasGyms "
                        : "noGyms ") +
                      (geo.properties.NAME_1 === location && "current")
                    }
                    onClick={() => {
                      const { NAME_1 } = geo.properties
                      setLocation(NAME_1)
                    }}
                    style={{
                      default: {
                        fill: "var(--secondary)",
                        outline: "none",
                      },
                      hover: {
                        fill: "var(--tertiary) !important",
                        outline: "none",
                      },
                      pressed: {
                        fill: "var(--tertiary)",
                        outline: "none",
                      },
                    }}
                    key={i}
                    geography={geo}
                  />
                ))
              }
            </Geographies>
            {!breakpoints.l &&
              bigCities.map(gymMarker => (
                <Annotation
                  className={
                    gymMarker.ACF_Destinations.location.state === location &&
                    "current"
                  }
                  onClick={() => {
                    setLocation(gymMarker.ACF_Destinations.location.state)
                  }}
                  subject={[
                    gymMarker.ACF_Destinations.location.longitude,
                    gymMarker.ACF_Destinations.location.latitude,
                  ]}
                  dx={100}
                  dy={10}
                  curve={-0.2}
                  connectorProps={{
                    stroke: "var(--primary)",
                    strokeWidth: 3,
                    strokeLinecap: "round",
                    fill: "rgba(0,0,0,0) !important",
                  }}
                  key={gymMarker.ACF_Destinations.location.state}
                >
                  <text
                    x="8"
                    textAnchor="start"
                    alignmentBaseline="middle"
                    fill="var(--primary)"
                  >
                    {gymMarker.ACF_Destinations.location.state}
                  </text>
                </Annotation>
              ))}
          </ZoomableGroup>
        </ComposableMap>
      </MapWrapper>

      <DestWrapper>
        <h2>Provinzen</h2>
        {/* {location ? (
          selectedDest.map(selected => (
            <div key={selected.title}>
              <div>
                <p>
                  {selected && selected.title} with{" "}
                  {selected && selected.ACF_Destinations.gyms.length} gyms{" "}
                </p>
                {parse(selected && selected.ACF_Destinations.shortDescription)}

                <Button
                  url={`/destination/${selected.slug}#gyms`}
                  text={`Zu allen gyms in ${selected && selected.title}`}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Wähle wat auf der Karte aus</p>
        )} */}

        <Splide
          onArrowsMounted={(splide, prev, next) => {
          }}
          ref={ref}
          options={{
            type: "fade",
            speed: 1000,
            width: 800,
            arrows: true,
            rewind: true,
            pagination: false,
            autoHeight: true,
            arrowPath:
              "M33.25 18.64c.34 1.13-.61 1.07-2 2.74-.16.19-.26.35-.41.5l-3.16 3.71c-.23.32-.2.19-.33.44l5.82-5c.36-.37.56-.57.91-.91s.51-.77 1.16-.88c0 .83-.16.75-.54 1.19a35.59 35.59 0 0 0-2.53 2.82l3.24-2.72c.38-.41.15-.25.57-.34.44 1-.63.82-1.36 2.47.94-.05.78-.42 1.64-.69 0 0-.06-.06 0-.07.45-.19-.08-.12-.09-.15l-.17-.4a3.13 3.13 0 0 0 .7-.5c.79-.65 1.38-.28.42.6a9.45 9.45 0 0 0-.8.85 4.44 4.44 0 0 0 2.31-1.08 19.85 19.85 0 0 0-2.63-2.1c-.57-.37-.9-.61-1.45-1s-1-.68-1.42-1l-1.55 1.95c-.56.68-1.1 1.15-1.68 1.82a47.27 47.27 0 0 0-3.16 3.81l1.59-1.42a4.15 4.15 0 0 1 .75-.77l.43-.34Zm-13.91 2.59-.75.86a2.62 2.62 0 0 0 .75-.86Zm-2.6-14.56c0 .82-.12 1.52-.17 2.34-.06 1.21-.42 1.4-.13 1.86l2.09-3.08a4.21 4.21 0 0 0-1.79-1.12Zm1.06 4.13a3.21 3.21 0 0 0-1 1c-.24.33-.64.53-.63 1.16a11.29 11.29 0 0 0 1.63-2.16Zm-6.26 3.74c-.71 1.19-2.61 2.82-2.88 3.71.58-.19.5-.26 1.17-.88l2.72-2.78Zm-2.47.39a.56.56 0 0 1 0 .12c-.14.35 0 .16-.27.47s-.37.44-.63.75a9.1 9.1 0 0 0-1.2 1.61 12.93 12.93 0 0 0 2-1.73l1.81-1.55.07-.1H9.27Zm-2-.5C6.87 16.2 4.87 17 4.91 18l.48-.33c.14-.1.14-.09.28-.2l1.1-1.17c.74-.74 1.48-1.08 1.86-1.76Zm-1.7 0c.41.88-.32.84-.45 1.58.38-.36 1.22-.82 1.52-1.46l-.11-.06Zm.71 7a2.8 2.8 0 0 0-.56.64l-1.33 2a5.22 5.22 0 0 0-1 1.51l1.63-.24s.07-.19.09-.24.07-.21.17-.43l.5.17c.67-.12 3.65-3.07 3.75-3.12l.37.58c.53-.86 1.66-2.06 2.14-2.78.31-.48.65-.89 1-1.41l.68-.83.11-.2c.25-.5.18-.56-.14-.81A3.25 3.25 0 0 0 15 14.49h-1.5a19.2 19.2 0 0 1-2 2.81 12.46 12.46 0 0 0-2 2.76l2.54-2.16.16-.15c.18-.12.08-.11.33-.09l-3 2.93c-.55.55-1 1-1.5 1.56-1.36 1.4-.59 1.42-1.51 1.49a1.57 1.57 0 0 1-.08-.43c0-.3 0-.21.12-.35s0 .07.26-.22a36.92 36.92 0 0 0 4.19-5.15c.4-.54 1.32-1.39 1.44-2ZM3.47 16l1.64-1.66h-.57l-.06.09-.48.79c-.19.31-.33.48-.53.78Zm0 0-.38.55Zm-1.53 2.63A8.37 8.37 0 0 0 4 16.36a9.87 9.87 0 0 0-2.06 2.27Zm0 0-.64.19c0-.87 1.17-2.05 2.08-3.49A7.92 7.92 0 0 0 1.65 17c-.85 1.12-.87.6-1 2.43a40.15 40.15 0 0 0 .4 6.22h1.16c.41-.39.56-.83 1-1.29 1.93-2.1.42-1.21 1.28-2.23l5.73-6.56c-1 .37-3.43 2.87-4.19 3.67s-1.39 1.32-2 2C3 22.31 2.86 23 2.26 23.2c-.35-.8.56-1.49 1.05-2l3.08-3.32a9.92 9.92 0 0 0 1.37-1.81c-.91.18-2.38 2.09-3.15 2.77a16.53 16.53 0 0 0-1.52 1.38c-.67.71-.95 1.25-1.55 1.24-.09-.93 3.26-3.14 4.37-5.75a12.13 12.13 0 0 0-2.31 2.14C2.61 18.94 2 20 1.46 20.14c-.25-.7.26-.95.48-1.51Zm1.77-4.35a10.39 10.39 0 0 0-2.84 0v2.48a19.27 19.27 0 0 0 1.53-2c.16.38 0 .39-.17.72a2.77 2.77 0 0 0 1.48-1.2Zm15.92-1.9c.37-1.06 1.37-1.76 1.74-2.85-.69-.48-1.51-.92-2.18-1.34a3.84 3.84 0 0 0-1.26 1.47c.63-.23.63-.54 1-.21.55.57-.49 1.42-.76 1.71l-1.88 2.38c-.23.45-.18.61-.47.92-.49.53-.47.18-.58 1 .92-.48 1.77-1.82 3.21-2.78l-4.19 4.48c-1.59 1-1.83 2.11-3 3.43a11.42 11.42 0 0 0-2 3.21l.83-.33a4.93 4.93 0 0 1-1.08 1l-.91.6c-1 .17-.17-1.09 0-1.57-.56 0-2.08 1.41-2.55 1.89a.9.9 0 0 0-.09.1 43.46 43.46 0 0 0 5.23.05c1.62-.15 3.26-.48 4.9-.49l6-7.48A14.23 14.23 0 0 0 23.55 15c-1.19.64-2.11 2.21-3.16 2.59A26.14 26.14 0 0 1 23.91 14c.85-.72.89.18.38.85-.32.41-.42.55-.76.93l-1.46 1.74a26.65 26.65 0 0 0-2.73 3.69c1-.43 3-2.89 3.77-3.57s2.74-3.24 3.73-3.57c.57.64-.34 1.41-.77 1.95-.82 1-4.16 5.17-4.47 6.22.59-.28.7-.77 1.2-1.11-.24 1-3.73 4-4.61 5.48-.66 1.08-1.45.42-.7-.39a31.74 31.74 0 0 0 2.92-3.49c.42-.6.71-.94 1.13-1.47 1.09-1.41 3.79-4.74 4.39-5.84-1.21.47-5.81 5.75-7 6.91l-2.22 2.54c.51.91-.14 3.25.22 4.52l6.73-7.82c.85-1 3.78-4 4-4.9-.81.59-1.28 1.26-2.2 1.93.19-.74 1.79-2 2.33-2.63a1.41 1.41 0 0 1 1.07-.69c.1 1.16-2.62 3.62-3.37 4.65-1 1.33-1.66 1.83-2.47 2.87-.28.36-.22.46-.55.84l-2 2.13a6.69 6.69 0 0 0-1.21 1.59 16.87 16.87 0 0 0 2.25-2.08L23 24c0 .53-.22.44-.59.83l-5.61 6.09a7 7 0 0 1 .32 1.9l-.26.66c-.2.52-.08.55-.4 1-.64-1.15-.38-2.71-.34-4.06 0-1.51.11-3.08 0-4.52-1.91.91-11 .08-14.23.45-1 .12-.94.41-1.7-.06l.16-3.2c0-1.15-.23-2.17-.21-3.36s.1-2.39.05-3.52-.4-2 .24-2.92a38.53 38.53 0 0 0 10.12.06 2.1 2.1 0 0 1 .71 0l.3.18c.38.23.69 0 1.1 0s.08.13.83 0a5 5 0 0 1 1-.06c1.53.07 1-.35 1.34-3.69.11-1.24 0-3 .16-4.12.77-.21.67-.1 1.22.32.78.57 1.47.84 2.21 1.45l5.91 3.71c.52.29 1.15.58 1.57.88 1.83 1.28 3.94 2.48 5.7 3.92l4.28 3A12 12 0 0 0 40 20.71c0 1-1.4 1.42-2.62 1.9a12.83 12.83 0 0 0-1.53.76c-.54.29-1 .48-1.53.77-1.89 1.05-3.75 2.37-5.58 3.44-2.86 1.66-5.7 3.43-8.6 5l-2.08 1.29c-.47.37-.21.35-1 .17 0-1 0-.66.64-.95 2.06-1 9.77-5.71 12-7 .75-.43 1.54-.81 2.26-1.26a15.76 15.76 0 0 1 2.19-1.35l-.35-1.23a3.59 3.59 0 0 1-1.11 1.16c-.52.44-.76.87-1.44.84-.16-.38-.05-.54 0-.91a4.33 4.33 0 0 0-1.38 1.11l-2.57 2.31c-.48.48-.84.9-1.59.87-.26-.89.62-1.38 1.16-2.06a16.49 16.49 0 0 0 1.56-2A23.82 23.82 0 0 0 24 28.15c-.27.4-.18.47-.5.8-.53-.17-.38-.08-.62-.55.24-.54.13-.25.48-.6.93-.92 3.9-4.9 5.34-6.41l1.7-1.95c.27-.31 0 .06.25-.32-.38.38-.09.38-.58.19l1.36-1.15c.14-.16.44-.43.62-.59l.67-.84c-1-.4-9.34-6.48-10.91-6.87-.68.65-1.49 2.14-2.18 2.52Z",
          }}
        >
          {bigCities.map(destination => {
            return (
              <SplideSlide
                key={destination.title}
                data-splide-hash={destination.title}
              >
                <h3>
                  {destination.title} - {destination.ACF_Destinations.slogan}
                  {/* <small>{destination.ACF_Destinations.gyms.length} gyms</small> */}
                </h3>
                {parse(destination.ACF_Destinations.shortDescription)}
                <Button
                  url={`/destination/${destination.slug}#gyms`}
                  text={`Zu allen gyms in ${destination.title}`}
                />
              </SplideSlide>
            )
          })}
        </Splide>
      </DestWrapper>
    </Container>
  )
}
export default ThaiMap
