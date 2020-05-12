import Heading from "../Typography/heading"
import React from "react"
import styled from "@emotion/styled"

const HeadSubText = styled(Heading)`
    font-size: 1.13rem;
    line-height: 1.6;
    font-weight: 200;
    margin-bottom: 1rem;
    max-width: ${props => props.theme.sizes.contentMaxWidth};
`

const HeadContainer = styled.div`
    margin-top: 3.5rem;
`

const HeadHeadingText = styled(Heading)`
    margin-bottom: 2rem;
    max-width: ${props => props.theme.sizes.contentMaxWidth};
`

const HeadHeading = ({ subtext, headline }) => {
    return (
        <HeadContainer>
            <HeadSubText level="h1">{subtext}</HeadSubText>
            <HeadHeadingText level="h2" text={headline} />
        </HeadContainer>
    )
}

export default HeadHeading
