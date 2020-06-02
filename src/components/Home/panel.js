import React, { useState } from "react"

import Container from "../container"
import FadeLink from "../Home/animatedLink"
import Heading from "../Typography/heading"
import { Link } from "gatsby"
import MoreLink from "../Shared/MoreLink"
import styled from "@emotion/styled"

const HoverSpan = styled.span`
    display: inline-block;
`

const PanelText = styled.div`
    position: relative;
    z-index: 2;
    display: table-cell;
    vertical-align: bottom;
    width: 100%;
    height: 100%;
    padding-bottom: 3.5rem;
`

const PanelTopHeading = styled(Heading)`
    font-size: 1.13rem;
    line-height: 1.1;
    margin-bottom: 1rem;
    opacity: ${props => (props.hover ? "0" : "1")};
`

const PanelHeading = styled(Heading)`
    font-size: 3em;
    line-height: 1.1;
    max-width: 750px;
    margin-top: 0;
    margin-bottom: 1rem;
    opacity: ${props => (props.hover ? "0" : "1")};
`

const PanelSubText = styled.p`
    a {
        text-decoration: none;
        color: inherit;
    }
`
const Panel = ({ color, children, text, subText, topText, slug }) => {
    const [isHover, setHover] = useState(false)
    const theme = color === "Dark" ? "dark" : "light"
    return (
        <>
            {children}
            {text && (
                <PanelText hover={isHover}>
                    <Container wide>
                        <HoverSpan
                            onMouseOver={e => setHover(true)}
                            onMouseLeave={e => setHover(false)}
                        >
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
                                            {" "}
                                            {text}
                                        </FadeLink>
                                    )}
                                    {!slug && text}
                                </PanelHeading>
                            )}
                            {subText && (
                                <PanelSubText>
                                    {slug && (
                                        <Link to={`/${slug}`}>{subText}</Link>
                                    )}
                                    {!slug && subText}
                                </PanelSubText>
                            )}
                            {!topText && (
                                <FadeLink to={`/${slug}`} duration={1}>
                                    <MoreLink color={theme} hover={isHover} />
                                </FadeLink>
                            )}
                        </HoverSpan>
                    </Container>
                </PanelText>
            )}
        </>
    )
}

export default Panel
