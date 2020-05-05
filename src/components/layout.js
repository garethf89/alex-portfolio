/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"

import Footer from "./footer"
import { Global } from "@emotion/core"
import Header from "./header"
import PropTypes from "prop-types"
import React from "react"
import SEO from "./seo"
import globalStyles from "../styles/globals"
import styled from "@emotion/styled"

const Root = styled.div`
    font-family: ${props => props.theme.fonts.body};
    p,
    li {
        font-size: 1.13rem;
        line-height: 1.6;
        font-weight: 200;
    }
    h1,
    h2 {
        font-weight: 200;
    }
`
const Layout = ({ logoColor, children, title, image, description }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
    return (
        <Root>
            <SEO title={title} description={description} image={image} />

            <Header
                logoColor={logoColor}
                siteTitle={data.site.siteMetadata.title}
            />
            <div>
                <main>{children}</main>
                {!data.site.siteMetadata.title === "Home" && (
                    <Footer isHome={false} />
                )}
            </div>
            <Global styles={globalStyles} />
        </Root>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
