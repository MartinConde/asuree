import { graphql } from "gatsby"

export const AccommodationFragment = graphql`
  fragment AccommodationFragment on WpAccommodation {
    title
    slug
    terms {
      nodes {
        id
        name
        slug
      }
    }
    featuredImage {
      node {
        localFile {
          childImageSharp {
            gatsbyImageData
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
      destinations {
        ... on WpDestination {
          ...DestinationFragment
        }
      }
      # gyms {
      #   ... on WpGym {
      #     ...GymFragment
      #   }
      # }
    }
  }
`
