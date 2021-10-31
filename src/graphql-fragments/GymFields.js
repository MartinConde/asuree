import { graphql } from "gatsby"

export const GymFragment = graphql`
  fragment GymFragment on WpGym {
    title
    slug
    id
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
            gatsbyImageData(layout: FIXED, width: 300, height: 300 )
          }
        }
      }
    }
    ACF_Gyms {
      description
      level
      owner
      starred
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
            gatsbyImageData(layout: CONSTRAINED, width: 600, height: 400)
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
  }
`
