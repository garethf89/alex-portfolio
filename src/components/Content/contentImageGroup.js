import ContentImage from "./contentImage"
import React from "react"
import styled from "@emotion/styled"

const ContentImageGroupStyled = styled.div`
    @media (min-width: ${props => props.theme.responsive.medium}) {
        flex-direction: row;
        justify-content: space-between;

        display: flex;
        flex-direction: row;
        img {
            width: 50%;
            flex-basis: 50%;
        }
    }
`

const ContentImageGroup = ({ node }) => {
    return (
        <ContentImageGroupStyled>
            {node.data.map((el, i) => {
                return <ContentImage key={i} node={el} size="large" />
            })}
        </ContentImageGroupStyled>
    )
}

export default ContentImageGroup
