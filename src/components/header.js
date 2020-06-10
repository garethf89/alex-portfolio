import * as animationData from "../animations/LogoKick"

import React, { useContext, useEffect, useState } from "react"
import { globals, store } from "../state/state"

import { Link } from "gatsby"
import Navigation from "./Navigation/nav"
import PropTypes from "prop-types"
import lottie from "lottie-web"
import styled from "@emotion/styled"

const HeaderStyles = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background: transparent;
    pointer-events: none;
    padding: 1.5rem;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        position: fixed;
    }
    @media (min-width: ${props => props.theme.responsive.large}) {
        padding: 3.75rem;
    }
`

const HeaderInner = styled.div`
    margin: 0 auto auto;
    max-width: calc(
        ${props =>
                props.wide
                    ? props.theme.sizes.widerMaxWidth
                    : props.theme.sizes.maxWidth} +
            ${props => props.theme.logo.width} + 1.5rem
    );
    @media (min-width: ${props => props.theme.responsive.large}) {
        max-width: none;
    }
`

const HeaderLink = styled(props => <Link {...props} />)`
    z-index: 3;
    pointer-events: auto;
    cursor: pointer;
    position: relative;
    display: inline-block;
    vertical-align: top;
    text-indent: -99rem;
    font-size: 0;
    height: 2.5rem;
    width: 2.5rem;
    svg {
        display: block;
    }
    path {
        transition: fill 1s ${props => (props.delay ? ".8s" : "")};
    }
    &.svgHeaderLogo {
        path {
            fill: #fff;
        }
    }
    &.svgHeaderLogo--dark {
        path {
            fill: #000;
        }
    }
    @media (min-width: ${props => props.theme.responsive.medium}) {
        height: 3.75rem;
        width: 3.75rem;
    }
`

const Header = ({ siteTitle }) => {
    const { state } = useContext(store)
    const globalState = useContext(globals)

    const logoColor = state.theme
    const svgClass =
        logoColor === "light" ? "svgHeaderLogo" : "svgHeaderLogo--dark"

    let [headIconDark, updateHeadDark] = useState(null)

    useEffect(() => {
        updateHeadDark(
            lottie.loadAnimation({
                container: document.getElementById("HeaderLogoDark"),
                renderer: "svg",
                loop: false,
                autoplay: false,
                animationData: animationData,
                rendererSettings: {
                    clearCanvas: false,
                    className: "RenderedSVGMenu",
                },
            })
        )
    }, [])

    const hover = () => {
        headIconDark.goToAndPlay(0)
    }

    return (
        <HeaderStyles>
            <HeaderInner>
                <HeaderLink
                    to="/"
                    onMouseEnter={hover}
                    id="HeaderLogoDark"
                    delay={globalState.state.nav ? 1 : 0}
                    className={svgClass}
                >
                    Home
                </HeaderLink>
                <Navigation siteTitle={siteTitle} />
            </HeaderInner>
        </HeaderStyles>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
