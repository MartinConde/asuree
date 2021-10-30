import React, {useState} from "react"
import FsLightbox from "fslightbox-react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const GalleryWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #eee;
  flex-wrap: wrap;
`

const GalleryItem = styled.div`
  display: flex;
  width: 50%;
  height: 300px;
`

export default function Gallery({ gyms, galOpen, toggler, slide }) {

  

  return (
    <GalleryWrapper>
      <FsLightbox
        toggler={toggler}
        sources={gyms && gyms.map((gym, i) => (
          <div className="galFull" key={i}>
            <GatsbyImage image={getImage(gym.localFile)} alt="sfdssf" />
          </div>
        ))}
        slide={slide}
      />

      {gyms && gyms.map((gym, i) => (
        <div key={`gym-${i}`}>
          <GatsbyImage
            onClick={galOpen}
            image={getImage(gym.localFile)}
            alt="sfdssf"
          />
        </div>
      ))}
    </GalleryWrapper>
  )
}