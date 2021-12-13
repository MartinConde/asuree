import styled from "styled-components"

export const SectionWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px auto;
  /* background: var(--secondary-trans); */
  
  border-radius: 5px;

  @media(min-width: 1200px) {
    margin: 0 auto 50px auto;
  }
`

export const SectionTitle = styled.h2`
  
`

export const SectionContent = styled.div`
box-shadow: 0 5px 10px rgba(0, 0, 51, 0.2);
  padding: 15px;
  position: relative;

  @media(min-width: 1200px) {
    padding: 35px;
  }  
`


