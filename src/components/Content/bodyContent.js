import Body from "./body"
import React from "react"
import styled from "@emotion/styled"

const BodyContainer = styled.div`
    margin-bottom: 2rem;

    .body-block {
        margin: 0 0 3rem;
    }
    p {
        margin-top: 0;
        + .body-block {
            margin-top: 2rem;
        }
    }
    @media (min-width: ${props => props.theme.responsive.medium}) {
        display: flex;
        flex-wrap: wrap;
    }
`

const BodyContent = ({ body }) => {
    return (
        <BodyContainer>
            <Body exclude={0} text={body} />
        </BodyContainer>
    )
}

export default BodyContent
