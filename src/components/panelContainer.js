import React, { useContext, useEffect, useRef } from "react"

import ThemeContext from "../state/theme"
import { gatsbyWindow } from "../helpers/gatsbyWindow"
import isElementVisible from "../helpers/isElementVisible"
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

const PanelContainer = ({
    contentPage,
    backgroundColor,
    darkBackground,
    displayImage,
    children,
}) => {
    const [themeMode, setThemeMode] = useContext(ThemeContext)

    const ref = useRef(null)
    const theme = darkBackground ? "light" : "dark"

    const visibilityChange = () => {
        if (!ref.current) {
            return
        }
        const isVisible = isElementVisible(ref.current)

        if (isVisible) {
            setThemeMode(theme)
        } else {
            setThemeMode("dark")
        }
    }

    if (gatsbyWindow() && contentPage) {
        useEffect(() => {
            window.addEventListener(
                "scroll",
                throttle(e => {
                    visibilityChange()
                }, 100)
            )
            setThemeMode(theme)

            return function cleanup() {
                window.removeEventListener(
                    "scroll",
                    throttle(e => {
                        visibilityChange()
                    }, 100)
                )
            }
        }, [])
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
