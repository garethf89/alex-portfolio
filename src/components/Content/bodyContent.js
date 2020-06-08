import Body from "./body"
import React from "react"
import styled from "@emotion/styled"

const BodyContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    p {
        margin-top: 0;
        + img {
            margin-top: 2rem;
            margin-bottom: 3rem;
        }
        + .video-inline-player,
        + .half-width-images {
            margin-top: 2rem;
            margin-bottom: 3rem;
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
