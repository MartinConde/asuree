import React from "react"
import styled from "styled-components"

const RowWrapper = styled.div`
  width: 100%;
  margin-bottom: var(--row-mgbtm);
  position: relative;
`

const RowContent = styled.div`
max-width: ${props => props.fullWidth ? "1920px" : "1200px"};
margin: 0 auto;
padding-top: ${props => props.pTop ? "var(--row-pd)" : "0"};
padding-bottom: ${props => props.pBtm ? "var(--row-pd)" : "0"};
display: ${props => props.flex ? "flex" : "block"};
position: relative;
z-index: 9;
`

export default function Row({ children, fullWidth, pTop, pBtm, flex, id }) {
    return (
        <RowWrapper id={id}>

            <RowContent fullWidth={fullWidth} pTop={pTop} pBtm={pBtm} flex={flex}>{children}</RowContent>

        </RowWrapper>
    )
}
