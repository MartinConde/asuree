import React from "react"
import styled from "styled-components"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Card = styled.div`
  margin-bottom: 35px;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: ${props => props.minimal && "column"};
  }
`

const CardImage = styled.div`
  width: 100%;
  height: 100%;

  .gatsby-image-wrapper {
    height: 100%;
  }

  @media(min-width: 768px) {
    width: ${props => props.minimal ? "100%" : "45%"};
  }
`

const CardContent = styled.div`
  width: 100%;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  p {
    margin-bottom: 0;
  }

  @media(min-width: 768px) {
    width: ${props => props.minimal ? "100%" : "55%"};
    padding: 15px 0 15px 25px;
  }
`

const CardHeader = styled.div``

const CardTitle = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  h3 {
    margin-bottom: 0;
    margin-right: 10px;
  }

  svg {
    height: 20px;
    margin: 0 2px;
  }
`

const CardPrice = styled.div`
  span {
    font-size: 16px;
    color: #6f6f6f;
  }
`

const CardDesc = styled.div`
margin: 15px 0;
`

const CardAmneties = styled.div`
  display: flex;
  flex-wrap: wrap;

  div {
    width: 50%;
    margin-top: 10px;
    display: flex;
  }
  svg {
    height: 20px;
    min-width: 20px;
    margin-right: 5px;
    margin-top: 3px;
  }

  @media(min-width: 1024px) {
    div {
      width: 33.3%;
    }
  }
`

export default function AcomCard({
  image,
  title,
  preis,
  description,
  amenities,
  sterne,
  minimal
}) {
  return (
    <Card minimal={minimal}>
      <CardImage minimal={minimal}>
        <GatsbyImage image={getImage(image)} alt="test" />
      </CardImage>

      <CardContent minimal={minimal}>
        <CardHeader>
          <CardTitle>
            <h3>{title}</h3>
            <div>
              {sterne > 0 &&
                Array.from(Array(sterne), (e, i) => {
                  return (
                    <svg
                      key={i}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.777 15.21c-.052 0-.105 0-.157-.052l-4.567-2.362-4.515 2.362c-.158.053-.315.053-.42-.052a.567.567 0 01-.158-.368l.84-5.04-3.674-3.57c-.105-.104-.158-.262-.105-.42.105-.104.21-.209.367-.209l5.04-.735L7.685.197c.158-.263.577-.263.682 0l2.258 4.567 5.04.735c.157 0 .262.105.314.262a.408.408 0 01-.105.42L12.2 9.751l.84 5.04c0 .157-.053.315-.158.367.053.053-.052.053-.105.053zm-4.724-3.254c.052 0 .104 0 .157.053l3.99 2.1-.788-4.463c0-.105 0-.262.105-.367l3.255-3.15-4.41-.63c-.105 0-.262-.105-.315-.21L8.052 1.247 6.059 5.289a.354.354 0 01-.315.21l-4.463.63 3.255 3.15c.105.105.158.21.105.367l-.787 4.462 3.99-2.1c.104-.052.157-.052.21-.052z"
                        fill="#000"
                      />
                    </svg>
                  )
                })}
            </div>
          </CardTitle>
          <CardPrice>
            <p>
              Ab CHF {preis} <span>pro Nacht</span>
            </p>
          </CardPrice>
        </CardHeader>
        {description && <CardDesc>{parse(description)}</CardDesc>}
        
        {amenities && 
        <CardAmneties>
          {amenities.map(amnetie => {
            return (
              <div key={amnetie}>
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.777 15.21c-.052 0-.105 0-.157-.052l-4.567-2.362-4.515 2.362c-.158.053-.315.053-.42-.052a.567.567 0 01-.158-.368l.84-5.04-3.674-3.57c-.105-.104-.158-.262-.105-.42.105-.104.21-.209.367-.209l5.04-.735L7.685.197c.158-.263.577-.263.682 0l2.258 4.567 5.04.735c.157 0 .262.105.314.262a.408.408 0 01-.105.42L12.2 9.751l.84 5.04c0 .157-.053.315-.158.367.053.053-.052.053-.105.053zm-4.724-3.254c.052 0 .104 0 .157.053l3.99 2.1-.788-4.463c0-.105 0-.262.105-.367l3.255-3.15-4.41-.63c-.105 0-.262-.105-.315-.21L8.052 1.247 6.059 5.289a.354.354 0 01-.315.21l-4.463.63 3.255 3.15c.105.105.158.21.105.367l-.787 4.462 3.99-2.1c.104-.052.157-.052.21-.052z"
                    fill="#000"
                  />
                </svg>
                {amnetie}
              </div>
            )
          })}
        </CardAmneties>
        }
      </CardContent>
    </Card>
  )
}
