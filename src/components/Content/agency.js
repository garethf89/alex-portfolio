import Heading from "../Typography/heading"
import Link from "../link"
import React from "react"
import styled from "@emotion/styled"
const AgencyStyled = styled.aside`
    font-size: 1.13rem;
    line-height: 1.6;
    font-weight: 200;
    max-width: ${props => props.theme.sizes.contentMaxWidth};
    position: relative;
    &: before {
        content: " ";
        width: 1px;
        background-color: #d6d6d6;
        height: 100%;
        left: -20px;
        top: 0;
        position: absolute;
        display: none;
    }
    @media (min-width: ${props => props.theme.responsive.medium}) {
        display: block;
    }
`

const AgencyLabel = styled.span`
    display: block;
    margin-bottom: 0.5rem;
`

const AgencyHeading = styled(Heading)`
    font-size: inherit;
    font-weight: 600;
    margin-bottom: 0.5rem;
`

const Agency = ({ content }) => {
    return (
        <AgencyStyled>
            <AgencyLabel>Agency:</AgencyLabel>
            <AgencyHeading level="h4" text={content.title} />
            <Link href={content.url}>{content.url}</Link>
        </AgencyStyled>
    )
}

export default Agency
