import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import SvgLogo from "../svgs/logo"
import styled from "@emotion/styled"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const HeaderStyles = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: transparent;
    z-index: 99;
    padding: 3.75rem;
`

const Nav = styled.nav`
    display: none;
`

const activeLinkStyle = {
    color: "white",
}

const HeaderLogo = styled(SvgLogo)`
    height: 3.75rem;
    width: 3.75rem;
    g {
        transition: all 1s;
    }
    &.svgHeaderLogo {
        g {
            fill: #fff;
        }
    }
    &.svgHeaderLogo--dark {
        g {
            fill: #000;
        }
    }
`

const Header = ({ logoColor, siteTitle }) => {
    const { menuLinks } = useSiteMetadata()

    const svgClass =
        logoColor === "light" ? "svgHeaderLogo" : "svgHeaderLogo--dark"

    return (
        <HeaderStyles>
            <HeaderLogo className={svgClass} />
            <Nav>
                <ul>
                    <Link to="/">{siteTitle}</Link>
                    {menuLinks.map(link => (
                        <li key={link.name}>
                            <Link to={link.slug} activeStyle={activeLinkStyle}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Nav>
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
