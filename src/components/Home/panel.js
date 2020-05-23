import Container from "../container"
import FadeLink from "../Home/animatedLink"
import Heading from "../Typography/heading"
import { Link } from "gatsby"
import React from "react"
import styled from "@emotion/styled"

const PanelText = styled(Container)`
    position: relative;
    padding-bottom: 2rem;
    z-index: 2;
    display: table-cell;
    vertical-align: bottom;
    width: 100%;
    height: 100%;
`

const PanelTopHeading = styled(Heading)`
    font-size: 1.13rem;
    line-height: 1.1;
    margin-bottom: 1rem;
`

const PanelHeading = styled(Heading)`
    font-size: 3em;
    line-height: 1.1;
    max-width: 750px;
    margin-bottom: ${props => (props.lower ? "4.5rem" : "1rem")};
`

const PanelSubText = styled.p`
    margin-bottom: 4.5rem;
    a {
        text-decoration: none;
        color: inherit;
    }
`
const Panel = ({ children, text, subText, topText, slug }) => {
    return (
        <>
            {children}
            {text && (
                <PanelText>
                    {topText && (
                        <PanelTopHeading level="h1">
                            {slug && (
                                <FadeLink to={`/${slug}`} duration={1}>
                                    {topText}
                                </FadeLink>
                            )}
                            {!slug && topText}
                        </PanelTopHeading>
                    )}
                    {text && (
                        <PanelHeading level="h2" lower={topText}>
                            {slug && (
                                <FadeLink to={`/${slug}`} duration={1}>
                                    {text}
                                </FadeLink>
                            )}
                            {!slug && text}
                        </PanelHeading>
                    )}
                    {subText && (
                        <PanelSubText>
                            {slug && <Link to={`/${slug}`}>{subText}</Link>}
                            {!slug && subText}
                        </PanelSubText>
                    )}
                </PanelText>
            )}
        </>
    )
}

export default Panel
