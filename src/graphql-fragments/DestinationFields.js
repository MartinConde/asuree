import { graphql } from "gatsby"

export const DestinationFragment = graphql`
  fragment DestinationFragment on WpDestination {
    title
    slug
    featuredImage {
      node {
        id
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
    ACF_Destinations {
      location {
        city
        country
        countryShort
        latitude
        longitude
        placeId
        postCode
        state
        stateShort
        streetAddress
        streetName
        streetNumber
        zoom
      }
      slogan
      sloganMain
      description
      shortDescription
      galpreview: gallery {
        id
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 200, height: 200)
          }
        }
      }
      gallery {
        id
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      gyms {
        ... on WpGym {
          ...GymFragment
        }
      }
    }
    ACF_Global {
        lightHeader
      }
  }
`
