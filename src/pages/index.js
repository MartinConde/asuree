import React, { Suspense, useEffect, useState } from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/HomePage/hero"
import IntroText from "../components/HomePage/introText"
import BgRow from "../components/Blocks/bgRow"
import Row from "../components/Blocks/row"
import IconBox from "../components/Blocks/iconBox"
import FaveGyms from "../components/faveGyms"

const InterMap = React.lazy(() => import("../components/thaiMap"))

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

  console.log(data.wpPage)

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
          content={parse(data.wpPage.ACF_Home.icon1.iconContent1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 90 90"><path d="m44.616 85-11.844-7.513a51.325 51.325 0 0 1-17.437-18.561A51.325 51.325 0 0 1 9 34.258V20.722l1.806-.543A21.86 21.86 0 0 0 25.328 5.92l.295-.92h37.986l.294.918A21.859 21.859 0 0 0 78.425 20.18l1.807.543V34.26c0 8.6-2.19 17.13-6.335 24.666A51.334 51.334 0 0 1 56.46 77.487L44.616 85ZM11.644 22.688V34.26c0 16.717 8.427 32.042 22.544 40.996l10.428 6.614 10.428-6.614c14.117-8.954 22.544-24.28 22.544-40.996V22.69A24.504 24.504 0 0 1 61.701 7.643H27.53a24.503 24.503 0 0 1-15.887 15.044Z"/><path d="M39.484 54.404 28.212 43.132l1.87-1.87 9.402 9.403L59.15 31l1.87 1.87-21.536 21.534Z"/></svg>
        </IconBox>
        <IconBox
          title={data.wpPage.ACF_Home.icon2.iconTitel2}
          content={parse(data.wpPage.ACF_Home.icon2.iconContent2)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90"><path d="m54.688 17.193 2.225.098c.922.043 1.457.292 1.766.885l.813 1.584-3.078-.13-1.726-2.437zM48.506 13.5c.807 0 1.453.5 2.057 1.349l3.318 4.672-5.896-.255.343-.266c1.1-.824-.188-2.453-1.244-1.573l-2.203 1.74-2.99.192c-1.578.098-2.6-.631-3-1.323-.275-.484-.271-.718.4-.912 2.918-.843 4.699-1.301 7.568-3.066.62-.382 1.162-.558 1.647-.558zm.25-2c-.918-.12-1.938.219-2.959.859-2.881 1.808-4.229 2.219-7.453 2.922-.834.187-1.506.9-1.646 1.667-.141.76.084 1.5.496 2.161.828 1.317 2.557 2.395 4.822 2.25l3.256-.203 15.588.667c1.318.057 1.99.942 2.24 2.025.207.922.166 1.818-.49 2.193L50.494 27.6c-1.385.115-1.119 2.219.256 1.984l12.313-1.579c1.197-.155 1.641.615 1.9 1.543.281.984-.191 2.156-1.15 2.681L53.479 34.37c-1.426.188-.979 2.35.406 1.954l10.521-2.178c.693-.146 1.51.323 1.631 1.229.229 1.755-.203 2.427-1.449 2.844l-10.754 3.609c-1.287.421-.637 2.354.641 1.905l10.75-3.615c.703-.238 1.135-.145 1.473.057.344.199.615.574.756 1.048.287.952.025 2.047-.975 2.479L51.943 50l-12.896 5.213a.99.99 0 0 0-.297.192l-3.625 3.297c-.943.907.369 2.344 1.354 1.484L39.969 57l12.734-5.146c.01-.005.016-.011.025-.016l13.34-5.776c-4.262 4.068-7.074 8.276-9.297 14.344l-8.334-2.796c-1.178-.391-1.604 1.578-.635 1.9l8.316 2.787a74.377 74.377 0 0 0-1.395 4.891c-.109.448.098.917.51 1.131l3.063 1.614c1.213.719 2.209-1.183.932-1.771l-2.281-1.205c2.684-10.375 6.043-15.4 12.59-21.208l3.797 2c-7.309 7.198-10.428 15.24-13.209 25.636-.131.474.1.968.541 1.176l8.328 3.814c1.24.615 2.109-1.287.834-1.818l-7.49-3.442c2.746-10.058 5.746-17.584 12.855-24.381l7.863 4.147c1.219.645 2.152-1.126.934-1.771l-14.678-7.797c.307-.864.369-1.833.057-2.656-.422-1.12-1.01-1.808-1.879-2.308.703-1.151.813-2.495.441-3.604a4.016 4.016 0 0 0-1.676-2.135c.666-1.016.879-2.276.682-3.412-.162-.891-.572-1.754-1.287-2.374a3.34 3.34 0 0 0-.807-.5c.412-.933.385-2.09.209-2.938-.309-1.5-1.469-2.975-3.209-3.423l-1.391-2.703c-.313-.608-.766-1.145-1.369-1.479-.609-.333-1.293-.453-2.084-.491l-3.781-.167-1.025-1.442c-.974-1.368-1.98-1.999-3.437-2.181z"/><path fill-rule="evenodd" d="M21.756 38.349c.52.005 1.098.209 1.613.651l1.178 1.009c1.031.885 1.162 2.158.553 2.871-.609.708-1.891.781-2.922-.104L21 41.766c-1.031-.885-1.156-2.161-.547-2.875.307-.354.776-.548 1.303-.542zm3.484-5.536a2.271 2.271 0 0 1 1.66.552l1.928 1.651a2.267 2.267 0 0 1 .244 3.229 2.255 2.255 0 0 1-3.223.24l-1.922-1.651a2.252 2.252 0 0 1-.246-3.219 2.278 2.278 0 0 1 1.559-.802zm3.531-5.631a2.267 2.267 0 0 1 1.66.552l2.672 2.297c.975.838 1.09 2.246.25 3.219a2.257 2.257 0 0 1-3.223.25l-2.672-2.297a2.257 2.257 0 0 1-.246-3.224 2.263 2.263 0 0 1 1.559-.797zm4.276-4.994a2.299 2.299 0 0 1 1.666.557l2.672 2.292a2.264 2.264 0 0 1 .246 3.229 2.25 2.25 0 0 1-3.219.238l-2.672-2.29c-.975-.839-1.09-2.251-.256-3.224a2.309 2.309 0 0 1 1.563-.802zm-.151-1.979a4.26 4.26 0 0 0-2.928 1.479c-.818.953-1.381 2.371-1.203 3.51-1.213.188-2.406.714-3.072 1.479-1 1.152-1.521 2.948-1.006 4.219-.953.163-1.859.626-2.531 1.412-.994 1.162-1.244 2.714-.813 4.084-.912.083-1.775.463-2.406 1.197-1.428 1.662-.975 4.208.76 5.693l.428.37L5.99 51.11c-1.199.615-.256 2.411.932 1.771l7.859-4.147c7.109 6.797 10.115 14.328 12.859 24.381l-7.49 3.442c-1.244.547-.391 2.406.834 1.818l8.318-3.814a1.01 1.01 0 0 0 .557-1.176C27.072 62.99 23.953 54.948 16.65 47.75l3.797-2c6.543 5.808 9.902 10.838 12.584 21.208l-2.281 1.205c-1.275.588-.281 2.489.932 1.771l3.063-1.614a.996.996 0 0 0 .506-1.131c-2.615-10.558-6.025-16.13-12.166-21.838 1.301.234 2.645-.13 3.531-1.167.77-.896.973-2.047.744-3.151a4.262 4.262 0 0 0 3.234-1.484c.803-.932 1.115-2.125.99-3.271 1.125.104 2.463-.756 3.291-1.719a4.29 4.29 0 0 0 .99-3.261c1.15.016 2.469-.776 3.285-1.73a4.298 4.298 0 0 0-.463-6.046l-2.672-2.292a4.26 4.26 0 0 0-3.119-1.021z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M18.9 64.948c1.074 0 1.912.854 1.912 1.921a1.893 1.893 0 0 1-1.912 1.912 1.901 1.901 0 0 1-1.916-1.912 1.91 1.91 0 0 1 1.916-1.921zm0-2c-2.15 0-3.916 1.771-3.916 3.921 0 2.151 1.766 3.912 3.916 3.912 2.152 0 3.922-1.761 3.922-3.912 0-2.15-1.769-3.921-3.922-3.921z" clip-rule="evenodd"/></svg>
        </IconBox>
        <IconBox
          title={data.wpPage.ACF_Home.icon3.iconTitel3}
          content={parse(data.wpPage.ACF_Home.icon3.iconContent3)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M67.89 31.55c.15-.12.3-.24.44-.37a4.378 4.378 0 0 0-1.2-7.05l6.1-13.78c.17-.39.07-.85-.25-1.13a.977.977 0 0 0-1.16-.09l-3.49 2.18c-3.43 2.14-7.92 1.75-10.92-.96-4.22-3.8-10.59-3.8-14.81 0l-.3.27a9.133 9.133 0 0 1-10.52 1.2L26.9 9.1a.97.97 0 0 0-1.15.15.99.99 0 0 0-.21 1.14l6.83 14.03c-.25.16-.49.35-.71.56a4.386 4.386 0 0 0 .43 6.59C22.68 37.62 16.9 48.11 16.9 59.39c0 18.25 14.85 33.1 33.1 33.1s33.1-14.85 33.1-33.1c0-11.28-5.79-21.78-15.21-27.84zM30.83 13.52c4.13 2.29 9.26 1.71 12.78-1.45l.3-.27a9.1 9.1 0 0 1 12.2 0c3.65 3.28 9.1 3.76 13.27 1.16l.79-.49-4.96 11.22h-30.4c-.19 0-.38.01-.57.04l-5.56-11.41 2.15 1.2zm2.23 12.84c.26-.26.58-.46.95-.59.24-.08.5-.13.77-.13h30.43c.15 0 .26.01.42.05 1.17.2 2.03 1.21 2.03 2.4 0 .64-.26 1.25-.72 1.72-.36.36-.81.59-1.28.67-.03 0-.07.01-.1.02-.1.03-.24.03-.34.03H34.79c-.1 0-.25 0-.43-.05-1.17-.2-2.01-1.2-2.01-2.38-.01-.67.25-1.28.71-1.74zM50 90.54c-17.18 0-31.15-13.97-31.15-31.15 0-11.1 5.94-21.39 15.52-26.94h.01c.15.01.28.02.4.02h30.43c.11 0 .24 0 .39-.02h.03c9.58 5.56 15.52 15.85 15.52 26.94 0 17.18-13.97 31.15-31.15 31.15z"/><path d="M54.62 58.62V48.5c3.18.93 4.17 2.74 4.47 3.67.17.51.72.8 1.23.63.51-.17.8-.72.63-1.23-.42-1.31-1.84-3.97-6.33-5.08v-4.35c0-.54-.44-.98-.98-.98s-.98.44-.98.98v3.99c-.81-.1-1.7-.16-2.68-.16-.94 0-1.82.06-2.65.15v-3.98c0-.54-.44-.98-.98-.98s-.98.44-.98.98v4.29c-2.17.49-3.85 1.36-5.03 2.61-1.63 1.74-1.69 3.64-1.68 4.07-.03.42-.03 2.18 1.46 3.86 1.17 1.31 2.93 2.23 5.25 2.78v13c-3.3-.54-4.96-1.63-5.78-2.59-1.1-1.29-.92-2.55-.91-2.59a.984.984 0 0 0-.79-1.14.976.976 0 0 0-1.14.79c-.02.09-.37 2.15 1.3 4.15 1.45 1.73 3.91 2.85 7.32 3.35v4.15c0 .54.44.98.98.98s.98-.44.98-.98v-3.94c.84.06 1.71.11 2.65.11.95 0 1.83-.04 2.68-.1v3.93c0 .54.44.98.98.98s.98-.44.98-.98v-4.15c5.75-.87 8.66-3.56 8.66-8.03 0-1.73-.69-6.87-8.66-8.07zm-4.63-10.7c1 0 1.88.07 2.68.17v10.32c-.54-.03-1.1-.05-1.7-.05-1.39 0-2.58-.09-3.62-.23V48.07c.81-.1 1.69-.15 2.64-.15zm-8.35 7.8c-1.11-1.22-1.02-2.44-1.01-2.47.01-.05.01-.12.01-.17 0-.06-.05-1.43 1.2-2.74.82-.85 2.03-1.48 3.56-1.89v9.29c-1.99-.54-3.12-1.32-3.76-2.02zm8.35 17.36c-.97 0-1.84-.04-2.65-.1V60.1c1.11.14 2.31.21 3.62.21.6 0 1.17.02 1.7.05v12.61c-.81.07-1.7.11-2.67.11zm4.63-.34V60.6c5.96 1 6.71 4.45 6.71 6.08 0 1.33-.01 4.93-6.71 6.06z"/></svg>
        </IconBox>
        <IconBox
          title={data.wpPage.ACF_Home.icon4.iconTitel4}
          content={parse(data.wpPage.ACF_Home.icon4.iconContent4)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 40.188a8 8 0 0 0-8 8v6.585a8 8 0 1 0 16 0v-6.585a8 8 0 0 0-8-8zM201.736 174.3l-29.626 29.626-11.122-11.12a8 8 0 0 0-11.313 0 8 8 0 0 0 0 11.313l16.778 16.777c1.562 1.562 3.61 2.344 5.657 2.344s4.095-.782 5.657-2.344l35.283-35.283a8 8 0 0 0-11.313-11.313zm154.932 18.63h-111.03a8 8 0 1 0 0 16h111.03a8 8 0 1 0 0-16zm-154.932 79.437-29.626 29.627-11.122-11.121a8 8 0 0 0-11.313 0 8 8 0 0 0 0 11.313l16.778 16.778c1.562 1.562 3.61 2.343 5.657 2.343s4.095-.781 5.657-2.343l35.283-35.283a8 8 0 0 0-11.313-11.313zm154.932 18.63h-111.03a8 8 0 1 0 0 16h111.03a8 8 0 1 0 0-16zm0 98.067h-111.03a8 8 0 1 0 0 16h111.03a8 8 0 1 0 0-16zm-175.306-20.726c-15.84 0-28.725 12.886-28.725 28.726s12.886 28.726 28.725 28.726c15.84 0 28.726-12.887 28.726-28.726 0-15.84-12.886-28.726-28.726-28.726zm0 41.452c-7.017 0-12.725-5.709-12.725-12.726s5.708-12.726 12.725-12.726 12.726 5.709 12.726 12.726-5.709 12.726-12.726 12.726z"/><path d="M393.127 60.666h-38.352C342.64 49.294 326.348 42.31 308.446 42.31h-1.836c-2.367-10.061-7.699-19.224-15.423-26.329C281.57 7.136 269.074 2.264 256 2.264s-25.57 4.872-35.187 13.717c-7.724 7.105-13.056 16.268-15.423 26.329h-1.836c-17.902 0-34.195 6.984-46.329 18.356h-38.352c-14.506 0-26.307 11.8-26.307 26.307v396.984c0 14.505 11.801 26.307 26.307 26.307h274.254c14.506 0 26.307-11.802 26.307-26.307V86.973c0-14.506-11.801-26.307-26.307-26.307zM203.554 58.31h8.629a8 8 0 0 0 7.968-7.29C221.816 32.347 237.23 18.265 256 18.265s34.184 14.082 35.849 32.757a8 8 0 0 0 7.968 7.289h8.63c25.853 0 47.345 19.032 51.203 43.82h-207.3c3.858-24.788 25.35-43.82 51.204-43.82zm199.88 425.647c0 5.683-4.623 10.307-10.307 10.307H118.873c-5.684 0-10.307-4.624-10.307-10.307V86.973c0-5.684 4.623-10.307 10.307-10.307h25.683c-.205.359-.394.718-.575 1.076a67.406 67.406 0 0 0-8.248 32.389 8 8 0 0 0 8 8h224.534a8 8 0 0 0 8-8 67.394 67.394 0 0 0-8.396-32.645c-.144-.274-.27-.544-.427-.82h25.683c5.684 0 10.307 4.623 10.307 10.307v396.984z"/></svg>
        </IconBox>
      </BgRow>

      <Row>
      <IntroText
          title={data.wpPage.ACF_Home.introTitle}
          content={data.wpPage.ACF_Home.introContent}
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
        }
        icon2 {
          iconTitel2
          iconContent2
        }
        icon3 {
          iconTitel3
          iconContent3
        }
        icon4 {
          iconTitel4
          iconContent4
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
    allWpDestination {
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
