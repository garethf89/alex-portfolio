import React, { useContext } from "react"

import { Link } from "gatsby"
import Navigation from "./Navigation/nav"
import PropTypes from "prop-types"
import SvgLogo from "../svgs/logo"
import { store } from "../state/state"
import styled from "@emotion/styled"

const HeaderStyles = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background: transparent;
    padding: 1.5rem;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        padding: 3.75rem;
    }
`
const HeaderLink = styled(props => <Link {...props} />)`
    z-index: 3;
    cursor: pointer;
    position: relative;
    display: inline-block;
    text-indent: -99rem;
    font-size: 0;
`

const HeaderLogo = styled(SvgLogo)`
    height: 3.75rem;
    width: 3.75rem;
    display: block;
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

const Header = ({ siteTitle }) => {
    const { state, dispatch } = useContext(store)
    const logoColor = state.theme
    const svgClass =
        logoColor === "light" ? "svgHeaderLogo" : "svgHeaderLogo--dark"

    return (
        <HeaderStyles>
            <HeaderLink to="/">
                <HeaderLogo className={svgClass} />
                Home
            </HeaderLink>
            <Navigation siteTitle={siteTitle} />
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
