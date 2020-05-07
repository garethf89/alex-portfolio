import React, { useState } from "react"
import { disableScroll, enableScroll } from "../../helpers/scroll"

import { Link } from "gatsby"
import NavigationButton from "./navbutton"
import { ThemeProvider } from "emotion-theming"
import styled from "@emotion/styled"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

const Themes = {
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

const NavInner = styled.div(props => ({
    background: props.theme.colors.primary,
    height: "100%",
    width: "100%",
    willChange: "clip-path",
    transition: "clip-path 1s ease-in-out",
    clipPath: !props.active
        ? "circle(1.65rem at calc(100% - 5.65rem) 5.65rem)"
        : "circle(100rem at calc(100% - 5.65rem) 5.65rem)",
}))

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
    font-size: 96px;
    text-decoration: none;
    line-height: 1.7;
`

const Navigation = ({ logoColor }) => {
    const { menuLinks } = useSiteMetadata()

    const [navActive, setNav] = useState(false)

    let theme = Themes.light
    if (logoColor) theme = Themes[logoColor]

    const linkStyles = {
        color: theme.colors.color,
    }

    const nav = active => {
        setNav(active)
        active ? disableScroll() : enableScroll()
    }

    return (
        <ThemeProvider theme={theme}>
            <NavigationStyles active={navActive}>
                <NavigationButton
                    theme={logoColor}
                    buttonClick={() => nav(navActive ? false : "active")}
                />
                <NavInner active={navActive}>
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
        </ThemeProvider>
    )
}

export default Navigation
