import React, { useContext, useEffect, useState } from "react"
import { disableScroll, enableScroll } from "../../helpers/scroll"
import { globals, store } from "../../state/state"

import { Link } from "gatsby"
import NavigationButton from "./navbutton"
import { gatsbyWindow } from "../../helpers/gatsbyWindow"
import styled from "@emotion/styled"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

const NavThemes = {
    dark: {
        colors: {
            primary: "#fff",
            color: "#000",
        },
    },
    light: {
        colors: {
            primary: "#000",
            color: "#fff",
        },
    },
}

const NAV_ANIMATION_TIME = 750

const NavigationStyles = styled.nav`
    pointer-events: ${props => (props.active ? "auto" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    max-height: ${props => (props.active ? "100vh" : "10vh")};
    width: 100vw;
    transition: z-index 0s 0.5s
        ${props => (!props.active ? ",  max-height 0s 1s" : "")};
    z-index: ${props => (props.active ? "99" : "3")};
`

const NavInner = styled.div`
    background: ${props =>
        props.navTheme.colors.primary ? props.navTheme.colors.primary : ""};
    height: 100%;
    width: 100%;
    will-change: clip-path;
    transition: clip-path ${NAV_ANIMATION_TIME}ms ease-in-out,
        opacity 0s
            ${props =>
                !props.active ? `${NAV_ANIMATION_TIME}ms ease-in-out` : "0s"};
    opacity: ${props => (props.active ? "1" : "0")};
    clip-path: ${props =>
        !props.active
            ? "circle(1.25rem at calc(100% - 2rem) 2rem)"
            : "circle(150rem at calc(100% - 2rem) 2rem)"};
    @media (min-width: ${props => props.theme.responsive.medium}) {
        clip-path: ${props =>
            !props.active
                ? "circle(1.65rem at calc(100% - 2.55rem) 5.65rem)"
                : "circle(150rem at calc(100% - 2.5rem) 5.65rem)"};
    }
    @media (min-width: ${props => props.theme.responsive.large}) {
        clip-path: ${props =>
            !props.active
                ? "circle(1.65rem at calc(100% - 5.65rem) 5.65rem)"
                : "circle(150rem at calc(100% - 5.65rem) 5.65rem)"};
    }
`

const NavList = styled.ul`
    padding: 3.75rem;
    margin: 0;
    text-align: center;
    list-style-type: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StyledLink = styled(props => <Link {...props} />)`
    font-size: 48px;
    text-decoration: none;
    line-height: 1.7;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 96px;
    }
`

const Navigation = () => {
    const { menuLinks } = useSiteMetadata()

    const { state } = useContext(store)
    const globalState = useContext(globals)

    const [navActive, setNav] = useState(state.nav)
    const [theme, setTheme] = useState("light")

    const linkStyles = {
        color: NavThemes[theme].colors.color,
    }

    if (gatsbyWindow()) {
        navActive ? disableScroll() : enableScroll()
    }

    const toggleNav = isOpen => {
        if (isOpen) {
            setTimeout(() => {
                setNav(!navActive)
                globalState.dispatch({ type: "NAV", nav: !navActive })
            }, 50)
        } else {
            setNav(!navActive)
            globalState.dispatch({ type: "NAV", nav: !navActive })
        }
    }

    useEffect(() => {
        const timeout = navActive ? NAV_ANIMATION_TIME : 0
        setTimeout(() => {
            setTheme(state.theme)
        }, timeout)
        return function cleanup() {
            document.body.classList.remove("navopen")
            enableScroll()
        }
    }, [state.theme])

    const useTheme = NavThemes[theme]

    return (
        <NavigationStyles active={navActive}>
            <NavigationButton
                theme={theme}
                active={navActive}
                buttonClick={() => toggleNav()}
            />
            <NavInner navTheme={useTheme} active={navActive}>
                <NavList>
                    {menuLinks.map(link => (
                        <li key={link.name}>
                            <StyledLink
                                onClick={() => toggleNav(true)}
                                style={linkStyles}
                                to={link.slug}
                            >
                                {link.name}
                            </StyledLink>
                        </li>
                    ))}
                </NavList>
            </NavInner>
        </NavigationStyles>
    )
}

export default Navigation
