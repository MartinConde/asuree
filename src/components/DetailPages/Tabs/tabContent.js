import React from "react"
import styled from "styled-components"

const Content = styled.div`
  ${props => (props.active ? "" : "display: none")}
`

export default function TabContent({ active, children }) {
  return <Content active={active}>{children}</Content>
}
