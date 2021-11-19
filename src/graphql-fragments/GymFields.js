import { graphql } from "gatsby"

export const GymFragment = graphql`
  fragment GymFragment on WpGym {
    title
    id
    slug
    featuredImage {
      node {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
    previewImage: featuredImage {
      node {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 300, height: 225 )
          }
        }
      }
    }
    ACF_Gyms {
      name
      description
      level
      owner
      starred
      price
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
      gallery {
        id
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      galpreview: gallery {
        id
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 200, height: 200)
          }
        }
      }
      accommodations {
        ... on WpAccommodation {
          id
          slug
          title
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 450)
                }
              }
            }
          }
          ACF_Accommodations {
            amenities
            description
            sterne
            wesbite
            preis
          }
        }
      }
      destinations {
        ... on WpDestination {
          id
          slug
          title
        }
      }
    }
    ACF_Global {
        lightHeader
      }
  }
`
