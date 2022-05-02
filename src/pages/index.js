import { graphql } from "gatsby"
import parse from "html-react-parser"
import React, { Suspense, useEffect, useState } from "react"
import BgRow from "../components/Blocks/bgRow"
import IconBox from "../components/Blocks/iconBox"
import Row from "../components/Blocks/row"
import FaveGyms from "../components/Cards/faveGyms"
import Hero from "../components/HomePage/hero"
import IntroText from "../components/HomePage/introText"
import Layout from "../components/layout"
import SEO from "../components/seo"

const InterMap = React.lazy(() => import("../components/HomePage/thaiMap"))

export default function Home({ data }) {
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 200)
    })
    return function cleanup() {
      setScroll(true)
    }
  }, [])

  return (
    <Layout light={data.wpPage.ACF_Global.lightHeader}>
      <SEO title="home" />
      <Hero />
      <Row>
        <IntroText
          title={data.wpPage.ACF_Home.introTitle}
          content={data.wpPage.ACF_Home.introContent}
        />
      </Row>
      <BgRow
        bgImage={data.wpPage.ACF_Home.iconBackground.localFile}
        bgImageAlt="dsfsdfsdf"
        overlay
      >
        <IconBox
          title={data.wpPage.ACF_Home.icon1.iconTitel1}
          content={data.wpPage.ACF_Home.icon1.iconContent1}
          icon={data.wpPage.ACF_Home.icon1.icon}
        />
        <IconBox
          title={data.wpPage.ACF_Home.icon2.iconTitel2}
          content={data.wpPage.ACF_Home.icon2.iconContent2}
          icon={data.wpPage.ACF_Home.icon2.icon}
        />
          
        <IconBox
          title={data.wpPage.ACF_Home.icon3.iconTitel3}
          content={data.wpPage.ACF_Home.icon3.iconContent3}
          icon={data.wpPage.ACF_Home.icon3.icon}
        />
      
        <IconBox
          title={data.wpPage.ACF_Home.icon4.iconTitel4}
          content={data.wpPage.ACF_Home.icon4.iconContent4}
          icon={data.wpPage.ACF_Home.icon4.icon}
        />
         
      </BgRow>

      <Row>
        <IntroText
          title={data.wpPage.ACF_Home.introTitle}
          content={data.wpPage.ACF_Home.introContent}
          mBtm
        />
        <FaveGyms faves={data} />
      </Row>

      <BgRow
        fullWidth
        withPadding
        bgImage={data.wpPage.ACF_Home.mapRowBg.localFile}
        bgImageAlt="dsfsdfsdf"
        overlay
        hideMob
      >
        {typeof window !== "undefined" && (
          <Suspense fallback={<div>Loading..</div>}>
            {scroll && <InterMap />}
          </Suspense>
        )}
      </BgRow>
    </Layout>
  )
}
export const pageQuery = graphql`
  query {
    wpPage(slug: { eq: "home" }) {
      id
      title
      ACF_Home {
        introContent
        introTitle
        iconBackground {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
        icon1 {
          iconTitel1
          iconContent1
          icon
        }
        icon2 {
          iconTitel2
          iconContent2
          icon
        }
        icon3 {
          iconTitel3
          iconContent3
          icon
        }
        icon4 {
          iconTitel4
          iconContent4
          icon
        }
        mapRowBg {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        } 
      }
      ACF_Global {
        lightHeader
      }
    }
    allWpDestination(filter: {status: {eq: "publish"}}) {
      edges {
        node {
          title
          slug
          ACF_Destinations {
            gyms {
              ... on WpGym {
                title
                slug
                ACF_Gyms {
                  accommodations {
                    ... on WpAccommodation {
                      title
                      slug
                    }
                  }
                }
              }
            }
          }
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
`
