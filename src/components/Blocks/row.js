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
padding-top: ${props => props.withPadding ? "0" : " var(--row-pd)"};
padding-bottom: ${props => props.withPadding ? "0" : " var(--row-pd)"};
display: flex;
position: relative;
z-index: 9;
`

export default function Row({ children, fullWidth, withPadding }) {
    return (
        <RowWrapper>

            <RowContent fullWidth={fullWidth} withPadding={withPadding}>{children}</RowContent>

        </RowWrapper>
    )
}
