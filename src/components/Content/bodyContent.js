import Body from "./body"
import React from "react"
import styled from "@emotion/styled"

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    p {
        margin-top: 0;
        + img {
            margin-top: 2rem;
        }
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
