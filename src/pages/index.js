import React, { Suspense, useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from '../components/HomePage/hero'
import IntroText from '../components/HomePage/introText'
import BgRow from '../components/Blocks/bgRow'
import Row from "../components/Blocks/row"
import IconBox from '../components/Blocks/iconBox'
import FaveGyms from "../components/faveGyms"

const InterMap = React.lazy(() => import('../components/thaiMap'))


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
    <Layout>
      <SEO title="home" />
      <Hero />
      <IntroText />
      <BgRow>
        <IconBox
          title="VERIFIZIERTE GYM'S"
          content="Wir haben alle Gym's eigenständig vor Ort besucht und trainiert.Darum garantieren wir dir das ultimative Trainingserlebnis."
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M26.151 24.172c6.042-12.77 21.296-18.221 34.066-12.179 12.774 6.045 18.225 21.296 12.18 34.069L49.274 94.925 26.151 46.062a25.592 25.592 0 010-21.89zm2.468 20.727l20.655 43.639L69.93 44.899c5.399-11.416.53-25.038-10.881-30.435-11.408-5.396-25.026-.531-30.43 10.876a22.902 22.902 0 000 19.559z" /><path d="M52.033 23.754a2.56 2.56 0 00-2.562-2.557 2.555 2.555 0 000 5.11 2.558 2.558 0 002.562-2.553z" /><path d="M57.116 26.885l-1.944 4.628a3.404 3.404 0 01-5.612 1.009L48.034 30.9a.63.63 0 00-.895-.033c-.026.025-.047.055-.068.076l-1.569 2.076a3.4 3.4 0 00-.688 1.902l-.274 6.307a3.349 3.349 0 01-.498 1.637l-3.552 5.779h-4.231l4.219-6.871a3.357 3.357 0 00.498-1.633l.279-6.498c.033-.691.27-1.357.687-1.91l2.856-3.76c.114-.151.237-.295.38-.417a3.392 3.392 0 014.805.147l1.32 1.409a.63.63 0 001.042-.194l.544-1.282a2.564 2.564 0 01-.484-2.733 2.557 2.557 0 014.711 1.983zM56.45 30.795h2.479a2.556 2.556 0 003.385 1.271 2.556 2.556 0 00-1.055-4.882h-3.295l-1.514 3.611z" /><path d="M50.308 42.891l.856 5.754h3.648l-1.143-7.668a3.402 3.402 0 00-1.211-2.136L48.7 35.777a1.802 1.802 0 10-2.278 2.794l2.674 2.185a3.437 3.437 0 011.212 2.135z" /></svg>
        </IconBox>
        <IconBox
          title="VERIFIZIERTE GYM'S"
          content="Wir haben alle Gym's eigenständig vor Ort besucht und trainiert.Darum garantieren wir dir das ultimative Trainingserlebnis."
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M26.151 24.172c6.042-12.77 21.296-18.221 34.066-12.179 12.774 6.045 18.225 21.296 12.18 34.069L49.274 94.925 26.151 46.062a25.592 25.592 0 010-21.89zm2.468 20.727l20.655 43.639L69.93 44.899c5.399-11.416.53-25.038-10.881-30.435-11.408-5.396-25.026-.531-30.43 10.876a22.902 22.902 0 000 19.559z" /><path d="M52.033 23.754a2.56 2.56 0 00-2.562-2.557 2.555 2.555 0 000 5.11 2.558 2.558 0 002.562-2.553z" /><path d="M57.116 26.885l-1.944 4.628a3.404 3.404 0 01-5.612 1.009L48.034 30.9a.63.63 0 00-.895-.033c-.026.025-.047.055-.068.076l-1.569 2.076a3.4 3.4 0 00-.688 1.902l-.274 6.307a3.349 3.349 0 01-.498 1.637l-3.552 5.779h-4.231l4.219-6.871a3.357 3.357 0 00.498-1.633l.279-6.498c.033-.691.27-1.357.687-1.91l2.856-3.76c.114-.151.237-.295.38-.417a3.392 3.392 0 014.805.147l1.32 1.409a.63.63 0 001.042-.194l.544-1.282a2.564 2.564 0 01-.484-2.733 2.557 2.557 0 014.711 1.983zM56.45 30.795h2.479a2.556 2.556 0 003.385 1.271 2.556 2.556 0 00-1.055-4.882h-3.295l-1.514 3.611z" /><path d="M50.308 42.891l.856 5.754h3.648l-1.143-7.668a3.402 3.402 0 00-1.211-2.136L48.7 35.777a1.802 1.802 0 10-2.278 2.794l2.674 2.185a3.437 3.437 0 011.212 2.135z" /></svg>
        </IconBox>
        <IconBox
          title="VERIFIZIERTE GYM'S"
          content="Wir haben alle Gym's eigenständig vor Ort besucht und trainiert.Darum garantieren wir dir das ultimative Trainingserlebnis."
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M26.151 24.172c6.042-12.77 21.296-18.221 34.066-12.179 12.774 6.045 18.225 21.296 12.18 34.069L49.274 94.925 26.151 46.062a25.592 25.592 0 010-21.89zm2.468 20.727l20.655 43.639L69.93 44.899c5.399-11.416.53-25.038-10.881-30.435-11.408-5.396-25.026-.531-30.43 10.876a22.902 22.902 0 000 19.559z" /><path d="M52.033 23.754a2.56 2.56 0 00-2.562-2.557 2.555 2.555 0 000 5.11 2.558 2.558 0 002.562-2.553z" /><path d="M57.116 26.885l-1.944 4.628a3.404 3.404 0 01-5.612 1.009L48.034 30.9a.63.63 0 00-.895-.033c-.026.025-.047.055-.068.076l-1.569 2.076a3.4 3.4 0 00-.688 1.902l-.274 6.307a3.349 3.349 0 01-.498 1.637l-3.552 5.779h-4.231l4.219-6.871a3.357 3.357 0 00.498-1.633l.279-6.498c.033-.691.27-1.357.687-1.91l2.856-3.76c.114-.151.237-.295.38-.417a3.392 3.392 0 014.805.147l1.32 1.409a.63.63 0 001.042-.194l.544-1.282a2.564 2.564 0 01-.484-2.733 2.557 2.557 0 014.711 1.983zM56.45 30.795h2.479a2.556 2.556 0 003.385 1.271 2.556 2.556 0 00-1.055-4.882h-3.295l-1.514 3.611z" /><path d="M50.308 42.891l.856 5.754h3.648l-1.143-7.668a3.402 3.402 0 00-1.211-2.136L48.7 35.777a1.802 1.802 0 10-2.278 2.794l2.674 2.185a3.437 3.437 0 011.212 2.135z" /></svg>
        </IconBox>
        <IconBox
          title="VERIFIZIERTE GYM'S"
          content="Wir haben alle Gym's eigenständig vor Ort besucht und trainiert.Darum garantieren wir dir das ultimative Trainingserlebnis."
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M26.151 24.172c6.042-12.77 21.296-18.221 34.066-12.179 12.774 6.045 18.225 21.296 12.18 34.069L49.274 94.925 26.151 46.062a25.592 25.592 0 010-21.89zm2.468 20.727l20.655 43.639L69.93 44.899c5.399-11.416.53-25.038-10.881-30.435-11.408-5.396-25.026-.531-30.43 10.876a22.902 22.902 0 000 19.559z" /><path d="M52.033 23.754a2.56 2.56 0 00-2.562-2.557 2.555 2.555 0 000 5.11 2.558 2.558 0 002.562-2.553z" /><path d="M57.116 26.885l-1.944 4.628a3.404 3.404 0 01-5.612 1.009L48.034 30.9a.63.63 0 00-.895-.033c-.026.025-.047.055-.068.076l-1.569 2.076a3.4 3.4 0 00-.688 1.902l-.274 6.307a3.349 3.349 0 01-.498 1.637l-3.552 5.779h-4.231l4.219-6.871a3.357 3.357 0 00.498-1.633l.279-6.498c.033-.691.27-1.357.687-1.91l2.856-3.76c.114-.151.237-.295.38-.417a3.392 3.392 0 014.805.147l1.32 1.409a.63.63 0 001.042-.194l.544-1.282a2.564 2.564 0 01-.484-2.733 2.557 2.557 0 014.711 1.983zM56.45 30.795h2.479a2.556 2.556 0 003.385 1.271 2.556 2.556 0 00-1.055-4.882h-3.295l-1.514 3.611z" /><path d="M50.308 42.891l.856 5.754h3.648l-1.143-7.668a3.402 3.402 0 00-1.211-2.136L48.7 35.777a1.802 1.802 0 10-2.278 2.794l2.674 2.185a3.437 3.437 0 011.212 2.135z" /></svg>
        </IconBox>

      </BgRow>

      <Row withPadding>
        <FaveGyms faves={data} />
      </Row>

      
        <BgRow fullWidth withPadding>
          {typeof window !== 'undefined' && (
            
            <Suspense fallback={<div>Loading..</div>}>
              {scroll &&
              <InterMap />
            }
            </Suspense>
            
          )}
        </BgRow>
      
    </Layout>
  )
}
export const pageQuery = graphql`
  query {
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
