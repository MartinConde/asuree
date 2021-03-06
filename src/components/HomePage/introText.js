import React from "react"
import styled from "styled-components"
import parse from 'html-react-parser'

const IntroWrapper = styled.div`
  width: 100%;
  max-width: 775px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;

  p {
    margin-bottom: 0;
  }

  @media(min-width: 1200px) {
    padding: 0;
    margin-bottom: ${props => props.mBtm ? "40px" : "20px"};
  }
`

const IntroTitle = styled.h2``

const IntroContent = styled.div``

export default function IntroText({title, content, mBtm}) {
  return (
    <IntroWrapper mBtm={mBtm}>
      <IntroTitle>{title}</IntroTitle>
      <IntroContent>{parse(content)}</IntroContent>
    </IntroWrapper>
  )
}
