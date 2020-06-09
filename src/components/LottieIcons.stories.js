import * as logo from "../animations/LogoKick"
import * as nav from "../animations/menu"
import * as navLight from "../animations/menu_light"

import React, { useEffect } from "react"

import lottie from "lottie-web"
import styled from "@emotion/styled"

const NavIcon = styled.div`
    height: 2.5rem;
    width: 2.5rem;
    display: block;
    svg {
        display: block;
    }
`

const DarkBg = styled.div`
    background: #000;
    margin: 2rem 0;
    padding: 1rem 0;
    max-width: 300px;
`

const HeaderIcon = styled.div`
    height: 2.5rem;
    width: 2.5rem;
    display: block;
    svg {
        display: block;
    }
    path {
        fill: ${props => props.fill};
    }
`
export const LottieIcons = () => {
    let navIcon
    let navIconL
    useEffect(() => {
        lottie.loadAnimation({
            container: document.getElementById("HeaderLogoDark"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: logo,
            rendererSettings: {
                clearCanvas: false,
                className: "RenderedSVGMenu",
            },
        })
        lottie.loadAnimation({
            container: document.getElementById("HeaderLogoLight"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: logo,
            rendererSettings: {
                clearCanvas: false,
                className: "RenderedSVGMenu",
            },
        })
        navIcon = lottie.loadAnimation({
            container: document.getElementById("NavIconDark"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: nav,
            rendererSettings: {
                clearCanvas: false,
                className: "RenderedSVGMenu",
            },
        })
        navIconL = lottie.loadAnimation({
            container: document.getElementById("NavIconLight"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: navLight,
            rendererSettings: {
                clearCanvas: false,
                className: "RenderedSVGMenu",
            },
        })
        navIconL.setSpeed(0.5)
        navIcon.setSpeed(0.5)
    }, [])

    return (
        <>
            <HeaderIcon fill="#000" id="HeaderLogoDark"></HeaderIcon>
            <DarkBg>
                <HeaderIcon fill="#fff">
                    <div id="HeaderLogoLight"></div>
                </HeaderIcon>
            </DarkBg>
            <NavIcon fill="#000">
                <div id="NavIconDark"></div>
            </NavIcon>
            <DarkBg>
                <NavIcon fill="#fff">
                    <div id="NavIconLight"></div>
                </NavIcon>
            </DarkBg>
        </>
    )
}

export default {
    title: "Icons",
    component: LottieIcons,
}
