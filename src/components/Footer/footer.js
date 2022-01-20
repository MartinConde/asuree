import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import LogoFooter from "./logoFooter"

const FooterWrapper = styled.footer`
  position: relative;
  width: 100%;
  overflow: hidden;
  color: #fff;
  margin-bottom: ${props => props.btmSpace ? "169px" : "0px"};
`

const FooterContent = styled.div`
  text-align: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 75px 20px;

  a {
    color: #fff;
  }

  a:hover {
    color: var(--primary);
  }
`

const LogoWrapper = styled.div`
  margin-bottom: 20px;
`

const ProvinceWrapper = styled.div``

const Provinces = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;

  a {
    padding: 5px;
    margin: 0 10px;
    display: block;
    text-align: center;
    /* width: 33.3%; */
  }
`

const ContactInfo = styled.div`
margin-bottom: 20px;
  span {
    display: block;
  }
`

const ContactIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  a {
    margin: 0 10px;
  }

  svg {
    height: 28px;
    max-width: 35px;
  }

  path {
    fill: #fff;
    transition: 0.25s all ease-out;
  }

  a:hover path {
    fill: var(--primary);
  }
`

const BottomWrapper = styled.div`
  text-align: center;
  padding: 20px;
  color: #cbc5c5;
  font-size: 16px;
  font-family: "Oswald";

  a {
    color: #cbc5c5;
  }

  a:hover {
    color: var(--primary);
  }

  .copySep {
      display: none;
  }

  .copyTop {
      display: block;
  }

  @media(min-width: 768px) {
      .copySep {
          display: contents;
      }
      .copyTop {
      display: inline-block;
  }
  }
`

// const SectionTitle = styled.p`
//   font-size: 22px;
//   font-family: "Oswald Bold";
//   margin-bottom: 5px;
// `

const BgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 34, 0.95);
    /* background: linear-gradient(180deg, rgba(0,0,51,.8) 0%, rgba(0,0,51,0.9) 50%, rgba(0,0,51,.8) 100%); */
  }

  .gatsby-image-wrapper {
    width: 100vw !important;
  }
`

const Footer = ({btmSpace}) => {
  const provinces = useStaticQuery(graphql`
    query ProvinceQuery {
      allWpDestination(sort: { fields: title, order: ASC }) {
        edges {
          node {
            ...DestinationFragment
          }
        }
      }
      wp {
        seitenweiteDaten {
          globalOptions {
            fieldGroupName
            footerBackground {
              id
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 1920, height: 500)
                }
              }
            }
          }
        }
      }
    }
  `)

  const footerBg = getImage(
    provinces.wp.seitenweiteDaten.globalOptions.footerBackground.localFile
  )

  console.log(
    provinces.wp.seitenweiteDaten.globalOptions.footerBackground.localFile
  )

  return (
    <FooterWrapper btmSpace={btmSpace}>
      <FooterContent>
        <LogoWrapper>
          <LogoFooter />
        </LogoWrapper>
        <ContactInfo>
          <span>
            E-Mail: <a href="mailto:hello@asuree.com">hello@asuree.com</a>
          </span>
          <span>
            <Link to="/anfrage">Anfrageformular</Link>
          </span>
        </ContactInfo>
        <ContactIcons>
          <a href="#" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 26 25"
            >
              <path
                fill="#000"
                d="M13.076 6.08a6.414 6.414 0 0 0-6.415 6.415 6.414 6.414 0 0 0 6.415 6.414 6.414 6.414 0 0 0 6.414-6.414 6.414 6.414 0 0 0-6.414-6.415Zm0 10.578a4.163 4.163 0 1 1 4.164-4.164 4.162 4.162 0 0 1-4.164 4.164Z"
              />
              <path
                fill="#000"
                d="M18.225.079c-2.3-.108-7.996-.103-10.298 0C5.904.173 4.119.662 2.68 2.1.277 4.504.584 7.744.584 12.495c0 4.862-.27 8.027 2.097 10.395 2.413 2.412 5.7 2.096 10.394 2.096 4.817 0 6.48.003 8.183-.656 2.315-.899 4.063-2.968 4.234-6.686.108-2.301.102-7.997 0-10.299C25.286 2.957 22.93.295 18.225.08Zm3.64 21.22c-1.575 1.576-3.761 1.435-8.82 1.435-5.208 0-7.296.077-8.82-1.45-1.756-1.747-1.438-4.553-1.438-8.806 0-5.755-.59-9.9 5.185-10.195C9.3 2.236 9.69 2.22 13.031 2.22l.047.031c5.55 0 9.906-.58 10.167 5.194.06 1.318.073 1.714.073 5.049-.001 5.148.097 7.249-1.452 8.805Z"
              />
              <path
                fill="#000"
                d="M19.744 7.326a1.499 1.499 0 1 0 0-2.998 1.499 1.499 0 0 0 0 2.998Z"
              />
            </svg>
          </a>
          <a href="#" target="_blank">
            <svg
              width="13"
              height="25"
              viewBox="0 0 13 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2188 4.15104H12.501V0.176042C12.1073 0.121875 10.7531 0 9.17604 0C5.88542 0 3.63125 2.06979 3.63125 5.87396V9.375H0V13.8187H3.63125V25H8.08333V13.8198H11.5677L12.1208 9.37604H8.08229V6.31458C8.08333 5.03021 8.42917 4.15104 10.2188 4.15104Z"
                fill="black"
              />
            </svg>
          </a>
          <a href="#" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 26 25"
            >
              <path
                fill="#000"
                d="M21.857 3.63A12.39 12.39 0 0 0 13.059 0a12.454 12.454 0 0 0-8.811 3.627C1.88 5.971.574 9.085.57 12.384v.006c0 1.997.525 4.012 1.521 5.851L.605 25l6.837-1.555a12.513 12.513 0 0 0 5.612 1.333h.005c3.317 0 6.446-1.288 8.81-3.627 2.37-2.346 3.677-5.455 3.678-8.757.001-3.279-1.31-6.391-3.69-8.764Zm-8.798 19.197h-.005c-1.75 0-3.483-.44-5.013-1.27l-.323-.176-4.546 1.034.987-4.488-.19-.328c-.946-1.632-1.446-3.434-1.446-5.21C2.526 6.635 7.253 1.95 13.058 1.95a10.452 10.452 0 0 1 7.421 3.062c2.011 2.003 3.118 4.624 3.117 7.38-.002 5.753-4.73 10.434-10.537 10.434Z"
              />
              <path
                fill="#000"
                d="M9.66 6.927h-.547c-.19 0-.5.071-.761.356-.262.285-1 .974-1 2.374 0 1.401 1.024 2.755 1.166 2.945.143.19 1.976 3.156 4.88 4.297 2.413.948 2.904.76 3.428.712.523-.047 1.69-.688 1.928-1.353s.238-1.234.166-1.354c-.071-.118-.262-.19-.547-.332-.286-.142-1.686-.842-1.948-.938-.262-.095-.452-.142-.643.143-.19.285-.751.943-.918 1.133-.166.19-.333.214-.619.072-.285-.143-1.196-.45-2.287-1.419-.85-.755-1.439-1.717-1.606-2.002-.166-.285-.017-.439.126-.58a8.7 8.7 0 0 0 .444-.469c.143-.166.184-.285.28-.475.094-.19.047-.356-.025-.498-.071-.143-.62-1.55-.873-2.114-.214-.474-.44-.49-.643-.498Z"
              />
            </svg>
          </a>
        </ContactIcons>
        <ProvinceWrapper>
          <Provinces>
            {provinces.allWpDestination.edges.map(
              ({ node }) =>
                node.ACF_Destinations.gyms && (
                  <Link key={node.title} to={`/destination/${node.slug}`}>
                    {node.title}
                  </Link>
                )
            )}
          </Provinces>
        </ProvinceWrapper>
      </FooterContent>

      <BottomWrapper>
        <span className="copyTop">© {new Date().getFullYear()} Asuree, Alle Rechte vorbehalten </span><span className="copySep"> |</span>{" "}
        <Link to="/">Impressum</Link> | <Link to="/">Datenschutz</Link>
      </BottomWrapper>
      <BgWrapper>
        <GatsbyImage image={getImage(footerBg)} alt="footerBG" />
      </BgWrapper>
    </FooterWrapper>
  )
}

export default Footer
