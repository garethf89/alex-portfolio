import * as bg from "../../static/images/AlexLogo.png"

import React, { useMemo, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Container from "../components/container"
import Footer from "../components/footer"
import FullPage from "../components/fullpage"
import Header from "../components/header"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "@emotion/styled"

const Panel = styled.div`
    position: relative;
    .fp-tableCell {
        vertical-align: bottom;
    }
`

const MainPanel = styled(Panel)`
    background-image: url(${bg});
    background-color: #000;
    background-position: center;
    background-repeat: no-repeat;
    color: #fff;
`

const PanelText = styled(Container)``

const PanelHeading = styled.h2`
    font-size: 3em;
    line-height: 1.1;
    margin-bottom: 1rem;
`

const PanelSubText = styled.p`
    margin-bottom: 2.06rem;
`

const IndexPage = () => {
    const data = useStaticQuery(graphql`
        query HomeProjects {
            site {
                siteMetadata {
                    title
                }
            }
            contentfulHomePage {
                headline
                title
                projects {
                    title
                    headline {
                        internal {
                            content
                        }
                    }
                    coverImage {
                        file {
                            url
                            fileName
                            contentType
                        }
                        title
                    }
                    darkBackground
                }
            }
        }
    `)

    const panelColorIndexHome = [
        {
            index: 0,
            color: "light",
        },
    ]

    const projects = data.contentfulHomePage.projects

    const panelColorIndexChildren = useMemo(
        () =>
            projects.map((value, index) => {
                const isDarkBackground = value.darkBackground
                return {
                    index: index + 1,
                    color: isDarkBackground ? "light" : "dark",
                }
            }),
        [projects]
    )

    const panelColorIndex = panelColorIndexHome.concat(panelColorIndexChildren)

    const panels = useMemo(
        () =>
            projects.map((value, index) => {
                const isDarkBackground = value.darkBackground
                const ChildPanel = styled(Panel)`
                    background: url(${value.coverImage.file.url});
                    background-position: center;
                    background-size: cover;
                    color: ${isDarkBackground ? "#fff" : "inherit"};
                `

                return (
                    <ChildPanel key={index} className="section">
                        <PanelText>
                            <PanelHeading>{value.title}</PanelHeading>
                            <PanelSubText>
                                {value.headline.internal.content}
                            </PanelSubText>
                        </PanelText>
                    </ChildPanel>
                )
            }),
        [projects]
    )

    const allPanels = [
        <MainPanel key="home" className="section">
            <PanelText>
                <PanelHeading>{data.contentfulHomePage.title}</PanelHeading>
                <PanelSubText>{data.contentfulHomePage.headline}</PanelSubText>
            </PanelText>
        </MainPanel>,
        panels,
        <Footer key="footer" isHome />,
    ]

    let [logoColor, setLogo] = useState("light")

    const onSlideLeave = (origin, destination, direction) => {
        const target = destination.index

        // set logo colors
        const panel = panelColorIndex.filter(el => {
            return el.index === target
        })

        const itemsNav = document.getElementById("fp-nav").querySelectorAll("a")
        itemsNav.forEach(e => {
            e.classList.remove("dark")
        })

        if (!panel[0]) {
            return
        }

        if (panel[0]) {
            setLogo(panel[0].color)
            if (panel[0].color === "dark") {
                itemsNav.forEach(e => {
                    e.classList.add("dark")
                })
            }
        }

        // no nav on footer
        if (target === panelColorIndex.length) {
            const items = document
                .getElementById("fp-nav")
                .querySelectorAll("li")
            setTimeout(() => {
                items[items.length - 2]
                    .querySelector("a")
                    .classList.add("active")
            }, 0)
        }
    }
    return (
        <Layout>
            <SEO title="Home" />
            <Header
                logoColor={logoColor}
                siteTitle={data.site.siteMetadata.title}
            />
            <FullPage panels={allPanels} onSlideLeave={onSlideLeave} />
        </Layout>
    )
}

export default IndexPage
