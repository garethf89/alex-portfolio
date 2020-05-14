import Container from "../container"
import Heading from "../Typography/heading"
import { Link } from "gatsby"
import React from "react"
import { gatsbyWindow } from "../../helpers/gatsbyWindow"
import styled from "@emotion/styled"

const PanelText = styled(Container)`
    position: relative;
    padding-bottom: 2rem;
    z-index: 2;
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

const Panel = ({
    children,
    image,
    text,
    subText,
    backgroundColor,
    contentPage,
    topText,
    slug,
}) => {
    let displayImage
    if (image && gatsbyWindow) {
        displayImage = !document.body.classList.contains("nowebp")
            ? image.resolutions.srcWebp
            : image.file.url
    }
    return (
        <>
            {children}
            {text && (
                <PanelText>
                    {topText && (
                        <PanelTopHeading level="h1">
                            {slug && <Link to={`/${slug}`}>{topText}</Link>}
                            {!slug && topText}
                        </PanelTopHeading>
                    )}
                    {text && (
                        <PanelHeading level="h2" lower={topText}>
                            {slug && <Link to={`/${slug}`}>{text}</Link>}
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
