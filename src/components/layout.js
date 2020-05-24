import React, { useContext, useEffect, useState } from "react"

import Footer from "./footer"
import Header from "./header"
import SEO from "./seo"
import { store } from "../state/state"
import styled from "@emotion/styled"
import { supportsWebP } from "../helpers/support/webp"
import { useStaticQuery } from "gatsby"

const Root = styled.div`
    font-family: ${props => props.theme.fonts.body};
    p,
    li {
        font-size: 1.13rem;
        line-height: 1.6;
        font-weight: 200;
    }
`

const TemplateWrap = ({
    children,
    location,
    title,
    description,
    image,
    transitionStatus,
    entry,
    exit,
}) => {
    const { state, dispatch } = useContext(store)
    const [initGlobals, setInitGlobals] = useState(false)
    useEffect(() => {
        if (!initGlobals) {
            supportsWebP(res => {
                if (!res && state.webp) {
                    dispatch({ type: "WEBP", webp: false })
                }
            })
            setInitGlobals(true)
        }
    }, [])
    return (
        <Root>
            <SEO title={title} description={description} image={image} />
            <Header siteTitle={title} />
            <main>{children}</main>
            <Footer />
        </Root>
    )
}

const PageLayout = props => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
    return <TemplateWrap title={data.site.siteMetadata.title} {...props} />
}
export default PageLayout
