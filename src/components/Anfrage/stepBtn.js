import React from "react"
import styled from "styled-components"

const Button = styled.button`
background: ${props => props.complete ? 'var(--primary)' : 'transparent'};
border: 2px solid var(--secondary);
padding: 10px 15px;
margin: 5px 10px;
`

export default function StepBtn({ clicker, text, complete, error }) {
  return (
    <Button onClick={clicker} complete={complete} error={error} className={(complete && 'complete') || (error && 'error')}>
      {text}
    </Button>
  )
}
