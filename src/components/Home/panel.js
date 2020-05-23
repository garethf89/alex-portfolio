import AniLink from "gatsby-plugin-transition-link/AniLink"
import Container from "../container"
import Heading from "../Typography/heading"
import { Link } from "gatsby"
import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import { gatsbyWindow } from "../../helpers/gatsbyWindow"
import gsap from "gsap"
import styled from "@emotion/styled"
export const fade = ({ exit: { length }, node, direction }) => {
    const duration = direction === "out" ? length + length / 4 : length
    const opacity = direction === "in" ? 1 : 0
    const scrollTop =
        (document.scrollingElement && document.scrollingElement.scrollTop) ||
        document.body.scrollTop ||
        window.pageYOffset
    const holdPosition =
        direction === "out"
            ? {
                  height: "100%",
                  overflow: "scroll",
                  position: "absolute",
                  scrollTop: window.scrollY,
              }
            : {}

    return gsap
        .timeline()
        .set(node, holdPosition)
        .fromTo(node, { opacity: !opacity }, { opacity: opacity, duration })
}

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

export const FadeLink = ({ to, children }) => (
    <TransitionLink
        enter={{ delay: 0, length: 0 }}
        exit={{ delay: 0.5, length: 0.5 }}
        to={to}
    >
        {children}
    </TransitionLink>
)

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
                            {slug && (
                                <AniLink swipe to={`/${slug}`}>
                                    {topText}
                                </AniLink>
                            )}
                            {!slug && topText}
                        </PanelTopHeading>
                    )}
                    {text && (
                        <PanelHeading level="h2" lower={topText}>
                            {slug && (
                                <AniLink
                                    trigger={async pages => {
                                        const s = window.scrollY
                                        window.scrollTo(0, 0)

                                        const div = document.getElementById(
                                            "home-container"
                                        )
                                        div.style.position = "relative"
                                        div.style.top = `-${s}px`
                                        pages.entry.state = { test: "sdf" }
                                        const exit = await pages.exit
                                        const entry = await pages.entry
                                        entry.node.querySelector(
                                            "video"
                                        ).currentTime = exit.node.querySelector(
                                            "video"
                                        ).currentTime
                                    }}
                                    entry={{
                                        state: {
                                            transition:
                                                "passed to the entering page",
                                        },
                                    }}
                                    fade
                                    to={`/${slug}`}
                                    duration={1}
                                >
                                    {text}
                                </AniLink>
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
