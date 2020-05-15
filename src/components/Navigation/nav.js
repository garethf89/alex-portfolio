import React, { useContext, useState } from "react"
import { disableScroll, enableScroll } from "../../helpers/scroll"

import { Link } from "gatsby"
import NavigationButton from "./navbutton"
import { store } from "../../state/state"
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

const NavigationStyles = styled.nav`
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
    transition: clip-path 1s ease-in-out;
    clip-path: ${props =>
        !props.active
            ? "circle(1.65rem at calc(100% - 3.5rem) 3.5rem)"
            : "circle(150rem at calc(100% - 3.5rem)3.5rem)"};
    @media (min-width: ${props => props.theme.responsive.medium}) {
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
    const { state, dispatch } = useContext(store)
    const logoColor = state.theme

    const [navActive, setNav] = useState(false)

    let theme = NavThemes.light
    if (logoColor) theme = NavThemes[logoColor]

    const linkStyles = {
        color: theme.colors.color,
    }

    const nav = active => {
        setNav(active)
        active ? disableScroll() : enableScroll()
        document.body.classList.toggle("navopen")
    }

    return (
        <NavigationStyles active={navActive}>
            <NavigationButton
                theme={logoColor}
                buttonClick={() => nav(navActive ? false : "active")}
            />
            <NavInner navTheme={theme} active={navActive}>
                <NavList>
                    {menuLinks.map(link => (
                        <li key={link.name}>
                            <StyledLink style={linkStyles} to={link.slug}>
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
