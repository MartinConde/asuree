import { graphql } from "gatsby"

export const DestinationFragment = graphql`
  fragment DestinationFragment on WpDestination {
    title
    slug
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
      description
      shortDescription
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
`
