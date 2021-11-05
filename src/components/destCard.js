import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import styled from "styled-components"
import Button from "./Blocks/button"

const Card = styled.div`
  background: #eee;
  width: 100%;
  margin: 10px;
  color: var(--secondary);
  display: flex;
  flex-direction: column;
  position: relative;

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
    height: 300px;
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

const GymCount = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--secondary);
  color: #fff;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Info = styled.p`
  margin-bottom: 0;
  font-weight: bold;
`

const Excerpt = styled.p`
  margin-top: 15px;
`

export default function DestCard({ dest, thirds }) {
  return (
    <Card key={dest.title} thirds={thirds}>
      <GatsbyImage
        image={getImage(dest.featuredImage.node.localFile)}
        alt={dest.title}
      />
      <GymCount>{dest.ACF_Destinations.gyms.length}</GymCount>
      <CardContent>
        <Title>{dest.title}</Title>
        <Excerpt>{parse(dest.ACF_Destinations.shortDescription)}</Excerpt>
      </CardContent>
      <Button
        url={`/destination/${dest.slug}`}
        text="Jetzt informieren und buchen"
      />
    </Card>
  )
}