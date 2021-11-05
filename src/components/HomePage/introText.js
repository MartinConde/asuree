import React from "react"
import styled from "styled-components"
import parse from 'html-react-parser'

const IntroWrapper = styled.div`
  width: 100%;
  max-width: 775px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;

  @media(min-width: 1200px) {
    padding: 0;
  }
`

const IntroTitle = styled.h2``

const IntroContent = styled.p``

export default function IntroText({title, content}) {
  return (
    <IntroWrapper>
      <IntroTitle>{title}</IntroTitle>
      <IntroContent>{parse(content)}</IntroContent>
    </IntroWrapper>
  )
}
