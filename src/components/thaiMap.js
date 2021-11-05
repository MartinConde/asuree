import React, { useState } from "react"
import styled from "styled-components"
import parse from "html-react-parser"
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

  @media (min-width: 1200px) {
    display: flex;
    align-items: center;
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

  @media (min-width: 1200px) {
    margin: -17vh 0;
    position: relative;
    width: auto;
    height: auto;
    opacity: 1;
    z-index: 9;
  }

  path {
    outline: none;
    transition: 0.3s all ease-out;
    stroke: var(--primary) !important;
  }

  .rsm-annotation path {
    fill: none;
    stroke: var(--tertiary) !important;
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
  padding: 75px 20px;

  @media (min-width: 1200px) {
    height: calc(100% + 25vmin);
    max-height: 130%;
    padding: 20px;
  }

  h2 {
    color: #fff;

    @media (min-width: 1200px) {
      margin-left: -11vw;
      color: var(--secondary);
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

  // const GymMarkers = mapsdata.allWpGym.edges.map(
  //   ({ node }) => node.ACF_Gyms.location
  // )

  // const filteredGymMarkers = Array.from(
  //   GymMarkers.reduce((m, o) => m.set(o.state, o), new Map()).values()
  // )

  // Get all destinations and filter out the ones that have gyms
  const destins = mapsdata.allWpDestination.edges.map(({ node }) => node)

  const bigCities = destins.filter(function (e) {
    return e.ACF_Destinations.gyms
  })

  // Get name of destinations with gym and check with location state
  const destnames = bigCities.map(dest => dest.title)

  const selectedDest = destins.filter(function (e) {
    return e.title === location
  })

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
            (breakpoints.xs && 450) ||
            (breakpoints.l && 250) ||
            (!breakpoints.l && 200)
          }
          height={
            (breakpoints.xxs && 800) ||
            (breakpoints.xs && 1100) ||
            (breakpoints.l && 1125) ||
            (!breakpoints.l && 900)
          }
          style={{
            width:
              (breakpoints.xxs && "300") ||
              (breakpoints.xs && "400") ||
              (!breakpoints.l && "600px"),
            height: "auto",
            maxHeight: "1200px",
          }}
        >
          <ZoomableGroup
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
                    stroke: "#FF5533",
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
                    fill="#F53"
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
        {location ? (
          selectedDest.map(selected => (
            <div key={selected.title}>
              <div>
                <p>
                  {selected && selected.title} with{" "}
                  {selected && selected.ACF_Destinations.gyms.length} gyms{" "}
                </p>
                {parse(selected && selected.ACF_Destinations.shortDescription)}

                <Button
                  url="/"
                  text={`Zu allen gyms in ${selected && selected.title}`}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Wähle wat auf der Karte aus</p>
        )}
      </DestWrapper>
    </Container>
  )
}
export default ThaiMap
