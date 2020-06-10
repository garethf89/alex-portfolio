import React, { useContext, useEffect, useRef, useState } from "react"

import classNames from "classnames"
import { gatsbyWindow } from "../helpers/gatsbyWindow"
import isElementVisible from "../helpers/isElementVisible"
import { store } from "../state/state"
import styled from "@emotion/styled"
import throttle from "lodash.throttle"

const PanelContainerStyled = styled.div`
    @keyframes size {
        from {
            height: 100vh;
        }
        to {
            height: 73vh;
        }
    }

    height: ${props =>
        props.contentPage && !props.showTransition ? "73vh" : "100vh"};
    position: relative;
    display: table;
    table-layout: fixed;
    width: 100%;
    animation-name: ${props => (props.showTransition ? "size" : "0")};
    animation-duration: 1s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    background-color: ${props => props.backgroundColor};
    background-image: url(${props => props.image});
    background-position: center;
    background-size: cover;
    color: ${props => (props.color === "light" ? "#fff" : "inherit")};

    .panel-text,
    .fp-navcustom {
        transition: opacity 0.75s;
        opacity: 1;
    }
    &.fade-out-text .panel-text,
    &.fade-out-text .fp-navcustom {
        opacity: 0;
    }
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
    showTransition,
    className,
}) => {
    const theme = darkBackground ? "dark" : "light"

    const ref = useRef(null)
    const { dispatch } = useContext(store)

    const state = getCurrentState()

    const [visibility, setVisibility] = useState(true)

    const visibilityChange = () => {
        if (!ref.current) {
            return
        }
        const isVisible = isElementVisible(ref.current, 51)
        if (isVisible === visibility) {
            return
        } else {
            setVisibility(isVisible)
        }

        if (document.querySelector(".tl-wrapper--unmount")) {
            return
        }
        if (isVisible) {
            dispatch({ type: "THEME", theme: theme })
        } else if (!isVisible && contentPage) {
            dispatch({ type: "THEME", theme: "dark" })
        }
    }

    const throttled = throttle(visibilityChange, 500)

    if (gatsbyWindow()) {
        useEffect(() => {
            if (contentPage && visibility) {
                dispatch({ type: "THEME", theme: theme })
            }
            window.removeEventListener("scroll", throttled)

            window.addEventListener("scroll", throttled)

            return function cleanup() {
                window.removeEventListener("scroll", throttled)
            }
        }, [visibility])
        useEffect(() => {
            if (contentPage && state.theme !== theme) {
                dispatch({ type: "THEME", theme: theme })
            }
        }, [])
    }

    const classStyle = classNames(className, {
        section: true,
        setHeight: contentPage,
    })

    return (
        <PanelContainerStyled
            className={classStyle}
            backgroundColor={backgroundColor}
            image={displayImage}
            color={theme}
            contentPage={contentPage}
            ref={ref}
            showTransition={showTransition}
        >
            {children}
        </PanelContainerStyled>
    )
}

export default PanelContainer
