import React, { useContext, useEffect, useRef } from "react"

import { gatsbyWindow } from "../helpers/gatsbyWindow"
import isElementVisible from "../helpers/isElementVisible"
import { store } from "../state/state"
import styled from "@emotion/styled"
import throttle from "lodash.throttle"

const PanelContainerStyled = styled.div`
    transition: height 0.5s ease-out;
    height: ${props => (props.contentPage ? "73vh" : "100vh")};
    position: relative;
    .fp-tableCell {
        vertical-align: bottom;
    }

    background-color: ${props => props.backgroundColor};
    background-image: url(${props => props.image});
    background-position: center;
    background-size: cover;
    color: ${props => (props.color === "light" ? "#fff" : "inherit")};
`

const getCurrentState = () => {
    const { state } = useContext(store)
    return state
}

const PanelContainer = ({
    contentPage,
    backgroundColor,
    darkBackground,
    displayImage,
    children,
}) => {
    const theme = darkBackground ? "light" : "dark"
    const ref = useRef(null)
    const { dispatch } = useContext(store)

    const state = getCurrentState()
    const visibilityChange = () => {
        if (!ref.current) {
            return
        }
        const isVisible = isElementVisible(ref.current)
        if (isVisible && state.theme !== theme) {
            dispatch({ type: "THEME", theme: theme })
        } else if (!isVisible && state.theme !== "dark") {
            dispatch({ type: "THEME", theme: "dark" })
        }
    }
    const throttled = throttle(visibilityChange, 200)
    if (gatsbyWindow() && contentPage) {
        useEffect(() => {
            window.removeEventListener("scroll", throttled)

            window.addEventListener("scroll", throttled)

            return function cleanup() {
                window.removeEventListener("scroll", throttled)
            }
        }, [state])
    }

    return (
        <PanelContainerStyled
            className="section"
            backgroundColor={backgroundColor}
            image={displayImage}
            color={theme}
            contentPage={contentPage}
            ref={ref}
        >
            {children}
        </PanelContainerStyled>
    )
}

export default PanelContainer
