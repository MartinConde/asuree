import styled from "styled-components"

const BdaySelect = styled.div`
display: flex;
justify-content: center;

> div:first-child {
    margin-left: 50px;
    width: calc(50% - 50px);
}

> div:nth-child(2) {
    margin-right: 50px;
    width: calc(50% - 50px);
}

select {
    width: 100%;
    border: none;
}
`

export default BdaySelect