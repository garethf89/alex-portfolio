import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const HeaderStyles = styled.header`
    font-size: 2rem;
    display: none;
`

const Nav = styled.nav``

const activeLinkStyle = {
    color: "white",
}

const Header = ({ siteTitle }) => {
    const { menuLinks } = useSiteMetadata()
    return (
        <HeaderStyles>
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
