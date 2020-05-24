import React, { useContext } from "react"
import { globals, store } from "../state/state"

import { Link } from "gatsby"
import Navigation from "./Navigation/nav"
import PropTypes from "prop-types"
import SvgLogo from "../svgs/logo"
import styled from "@emotion/styled"

const HeaderStyles = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background: transparent;
    pointer-events: none;
    padding: 1.5rem;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        padding: 3.75rem;
    }
`
const HeaderLink = styled(props => <Link {...props} />)`
    z-index: 3;
    pointer-events: auto;

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
        transition: all 1s ${props => (props.delay ? ".8s" : "")};
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
    const { state } = useContext(store)
    const globalState = useContext(globals)

    const logoColor = state.theme
    const svgClass =
        logoColor === "light" ? "svgHeaderLogo" : "svgHeaderLogo--dark"

    return (
        <HeaderStyles>
            <HeaderLink to="/">
                <HeaderLogo
                    delay={globalState.state.nav ? 1 : 0}
                    className={svgClass}
                />
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
