import React, { useContext, useEffect, useState } from "react"

import Footer from "./footer"
import Header from "./header"
import SEO from "./seo"
import { store } from "../state/state"
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

const TemplateWrap = ({ children, description, image, data }) => {
    const { state, dispatch } = useContext(store)
    const [initGlobals, setInitGlobals] = useState(false)

    const { title } = (data && data.page) || "Alex Ionna"

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
            <SEO
                pageTitle={title}
                pageDescription={description}
                pageImage={image}
            />
            <Header siteTitle={title} />
            <main>{children}</main>
            <Footer />
        </Root>
    )
}

const PageLayout = props => {
    return <TemplateWrap {...props} />
}
export default PageLayout
