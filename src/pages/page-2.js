import React, { useState, useEffect, useContext } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { myContext } from '../context/provider';

import Searchbar from '../components/Search/searchBar'

export default function Test({ data }) {

  
  return (

    <Layout>
      <SEO title="home" />
      <Searchbar withButton/>




      {/* {destinations
        .filter(destination => (destination.node.title === destinationSearch) && destination.node.ACF_Destinations.gyms.title === gymSearch)
        .map(destination => (
          <>
<p>Destination: {destination.node.title}</p>
<p>Gyms: {destination.node.ACF_Destinations.gyms.title}</p>
          </>
        ))} */}

      {/* {data.allWpDestination.edges.map(({ node }) => (
        <div className="destination" key={node.title}>
          <Link to={`/destination/${node.slug}`}>{node.title}</Link>
          <div className="destination-gyms">
            {node.ACF_Destinations.gyms.map(gym => (
              <div className="gym" key={gym.title}>
                <Link to={`/gym/${gym.slug}`}>{gym.title}</Link>
                <div className="gym-accommodation">
                  {gym.ACF_Gyms.accommodations.map(accommodation => (
                    <Link to={`/accommodation/${accommodation.slug}`}>{accommodation.title}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))} */}
    </Layout>

  )
}
export const pageQuery = graphql`
  query {
    allWpDestination {
      edges {
        node {
          ...DestinationFragment
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
    allWpAccommodation {
      edges {
        node {
          ...AccommodationFragment
        }
      }
    }
  }
`
