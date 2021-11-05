import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import GymCard from './gymCard'


const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`


export default function FaveGyms({ faves }) {


    return (
        <CardsWrapper>
            {faves.allWpGym.edges.map(({ node }) => (
                node.ACF_Gyms.starred === true && <GymCard key={node.title} gym={node} thirds />
            ))}
        </CardsWrapper>
    )
}
