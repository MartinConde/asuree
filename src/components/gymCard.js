import React, { useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import styled from "styled-components"
import Button from "./Blocks/button"
import ClickerButton from "./Blocks/clickerButton"

const Card = styled.div`
  background: #fff;
  width: 100%;
  margin: 10px;
  color: var(--secondary);
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 15px var(--secondary-trans);

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
    height: 250px !important;
  }

  .gatsby-image-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(180deg, rgba(255,255,255,0) 65%, rgba(255,255,255,1) 100%);
  }
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
`

const CardContent = styled.div`
  padding: 15px 20px;

  @media(min-width: 1200px) {
    padding: 15px 30px;
  }
`

const Title = styled.h3`
  margin-bottom: 15px;
  margin-top: 15px;
`

const Info = styled.p`
  margin-bottom: 0;
  font-weight: bold;
`

const Excerpt = styled.div`
  margin-top: 15px;
`

export default function GymCard({ gym, thirds, isAnfrage, clicker }) {
  return (
    <Card
      key={gym.title}
      thirds={thirds}
      isAnfrage={isAnfrage}
    >
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
      {isAnfrage ? (
        <ClickerButton clicker={clicker} text="Auswählen" />
      ) : (
        <Button url={`/gym/${gym.slug}`} text="Jetzt informieren und buchen" />
      )}
    </Card>
  )
}
