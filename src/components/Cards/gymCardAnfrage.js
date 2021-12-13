import React, { useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import styled from "styled-components"
import Button from "../Blocks/button"

const Card = styled.div`
  background: #eee;
  width: 100%;
  margin: 10px;
  color: var(--secondary);
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: calc(50% - 20px);
  }

  @media (min-width: 1200px) {
    width: ${props =>
      props.thirds ? "calc(33.3% - 20px)" : "calc(50% - 20px)"};
  }

  a {
    width: 100%;
    text-transform: uppercase;
    margin-top: auto;
  }

  .gatsby-image-wrapper {
    width: 100% !important;
  }
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`

const CardContent = styled.div`
  padding: 15px;
`

const Title = styled.h3`
  margin-bottom: 15px;
  margin-top: 15px;
`

const Info = styled.p`
  margin-bottom: 0;
  font-weight: bold;
`

const Excerpt = styled.p`
  margin-top: 15px;
`

export default function GymCardAnfrage({ gym, thirds, clicker }) {
  return (
    <Card key={gym.title} thirds={thirds}>
      <GatsbyImage
        image={getImage(gym.previewImage.node.localFile)}
        alt={gym.title}
      />
      <CardContent>
        <Title>{gym.title}</Title>
        <Info>
          {gym.ACF_Gyms.destinations.map(destination => destination.title)}
        </Info>
        <Info>level: {gym.ACF_Gyms.level.map(level => level).join(", ")}</Info>
        <Excerpt>
          {parse(gym.ACF_Gyms.description.substring(0, 250) + " ...")}
        </Excerpt>
      </CardContent>
      <button onClick={clicker}>Auswählen</button>
    </Card>
  )
}
