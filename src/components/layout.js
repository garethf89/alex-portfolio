/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Footer from "./footer"
import { Global } from "@emotion/core"
import Header from "./header"
import PropTypes from "prop-types"
import SEO from "./seo"
import ThemeContext from "../state/theme"
import globalStyles from "../styles/globals"
import styled from "@emotion/styled"
import { supportsWebP } from "../helpers/support/webp"

const Root = styled.div`
    font-family: ${props => props.theme.fonts.body};
    p,
    li {
        font-size: 1.13rem;
        line-height: 1.6;
        font-weight: 200;
    }
`
const Layout = ({ children, title, image, description }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
    supportsWebP(res => {
        if (!res) {
            document.addClass("nowebp")
        }
    })

    const themeMode = useState("light")

    return (
        <ThemeContext.Provider value={themeMode}>
            <Root>
                <SEO title={title} description={description} image={image} />
                <Header siteTitle={data.site.siteMetadata.title} />
                <main>{children}</main>
                <Footer />
                <Global styles={globalStyles} />
            </Root>
        </ThemeContext.Provider>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
