import React from "react"
import styled from "styled-components"

const IntroWrapper = styled.div`
  width: 100%;
  max-width: 775px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: var( --row-mgbtm);
  padding: 20px;

  @media(min-width: 1200px) {
    padding: 0;
  }
`

const IntroTitle = styled.h2``

const IntroContent = styled.p``

export default function IntroText() {
  return (
    <IntroWrapper>
      <IntroTitle>ULTIMATE MUAY THAI CAMPS IN THAILAND</IntroTitle>
      <IntroContent>
        This aftershave made women want me, but it also made me impotent! Morty,
        I'm a drunk, not a hack. They're robots Morty! It's okay to shoot them!
        They're just robots! There is no god, Summer; gotta rip that band-aid
        off now you'll thank me later. God, Grandpa, you're such a dick.
        Stealing stuff is about the stuff, not the stealing. Morty, you know
        outer space is up right? I couldn't hear you over my own screaming.
        We've talked about this!
      </IntroContent>
    </IntroWrapper>
  )
}
