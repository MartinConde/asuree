import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

const BgRowWrapper = styled.div`
  width: 100%;
  margin-bottom: var(--row-mgbtm);
  position: relative;
  margin-top: ${props => props.overShoot ? "25vh" : "0"};
`
const BgRowBg = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -1;

.gatsby-image-wrapper {
    width: 100%;
    height: 100%;
}
`

const BgRowContent = styled.div`
max-width: ${props => props.fullWidth ? "1920px" : "1200px"};
margin: 0 auto;
padding-top: ${props => props.withPadding ? "0" : " var(--row-pd)"};
padding-bottom: ${props => props.withPadding ? "0" : " var(--row-pd)"};
display: flex;
flex-wrap: wrap;
position: relative;
z-index: 9;
`

const BgSepTop = styled.div`

`

const BgSepBtm = styled.div`
transform: scaleY(-1);
`

export default function BgRow({ children, fullWidth, withPadding, overShoot }) {
  return (
    <BgRowWrapper overShoot={overShoot}>
      <BgSepTop>
      <StaticImage
        src="../../images/grunge-border.png"
        alt="jeilet camp"
        placeholder="blurred"
      />
      </BgSepTop>

      <BgRowContent fullWidth={fullWidth} withPadding={withPadding}>{children}</BgRowContent>
      <BgRowBg>
      <StaticImage
        src="../../images/kids.jpg"
        alt="jeilet camp"
        placeholder="blurred"
      />
      </BgRowBg>
      <BgSepBtm>
      <StaticImage
        src="../../images/grunge-border.png"
        alt="jeilet camp"
        placeholder="blurred"
      />
      </BgSepBtm>
    </BgRowWrapper>
  )
}
