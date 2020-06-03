import * as animationData from "../../animations/menu_light"
import * as animationDataInverted from "../../animations/menu"

import React, { useEffect, useState } from "react"

import lottie from "lottie-web"
import styled from "@emotion/styled"

const NavButton = styled.button`
    pointer-events: auto;
    display: block;
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    outline: 0;
    border: none;
    border-radius: 50%;
    z-index: 999;
    transition: transform 1s cubic-bezier(0.075, 0.82, 0.165, 1),
        background 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    @media (min-width: ${props => props.theme.responsive.medium}) {
        width: 3.75rem;
        height: 3.75rem;
    }
    @media (min-width: ${props => props.theme.responsive.large}) {
        top: 3.8rem;
        right: 3.75rem;
    }
`

const ButtonTarget = styled.span`
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 1s;
    opacity: ${props => (props.active ? "1" : "0")};
    @media (min-width: ${props => props.theme.responsive.medium}) {
        width: 3.75rem;
        height: 3.75rem;
    }
`
const NavigationButton = ({ theme, buttonClick, active }) => {
    let [menuIconDark, updateMenuDark] = useState(null)
    let [menuIconLight, updateMenuLight] = useState(null)
    useEffect(() => {
        if (menuIconLight || menuIconDark) lottie.destroy()

        updateMenuDark(
            lottie.loadAnimation({
                container: document.getElementById("NavButtonDark"),
                renderer: "svg",
                loop: false,
                autoplay: false,
                animationData: animationDataInverted,
                rendererSettings: {
                    clearCanvas: false,
                    className: "RenderedSVGMenu",
                },
            })
        )
        updateMenuLight(
            lottie.loadAnimation({
                container: document.getElementById("NavButtonLight"),
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
        return () => {}
    }, [])

    const setupState = () => {
        const direction = active ? 1 : -1
        theme === "light"
            ? menuIconLight.setDirection(direction)
            : menuIconDark.setDirection(direction)
        theme === "light" ? menuIconLight.play() : menuIconDark.play()
    }

    if (menuIconLight || menuIconDark) {
        setupState()
    }

    const onClick = () => {
        buttonClick()
        setupState()
    }

    return (
        <NavButton
            aria-label="Toggle navigation menu"
            onClick={() => onClick()}
        >
            <ButtonTarget
                active={theme === "light"}
                id="NavButtonLight"
            ></ButtonTarget>
            <ButtonTarget
                active={theme !== "light"}
                id="NavButtonDark"
            ></ButtonTarget>
        </NavButton>
    )
}

export default NavigationButton
