import React, { useEffect, useMemo, useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import FullPage from "../components/fullpage"
import Layout from "../components/layout"
import SeeMore from "../components/Work/seemore"
import { gatsbyWindow } from "../helpers/gatsbyWindow"
import throttle from "lodash.throttle"

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
                image {
                    file {
                        contentType
                        url
                    }
                }

                projects {
                    title
                    headline {
                        internal {
                            content
                        }
                    }
                    coverVideo {
                        file {
                            url
                            fileName
                            contentType
                        }
                    }
                    coverImage {
                        file {
                            url
                            fileName
                            contentType
                        }
                        title
                        resolutions(width: 2400) {
                            srcWebp
                        }
                        fixed(width: 1400) {
                            src
                            srcWebp
                        }
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

    const fpRef = useRef(null)

    let [logoColor, setLogo] = useState("light")

    const onSlideLeave = (origin, destination, direction) => {
        if (document.body.classList.contains("navopen")) {
            return
        }
        const target = destination.index

        // set logo colors
        const panel = panelColorIndex.filter(el => {
            return el.index === target
        })
        if (!panel[0]) {
            return
        }

        if (panel[0]) {
            setLogo(panel[0].color)
        }
    }

    const checkScroll = () => {
        if (!fpRef.current) {
            return
        }
        if (!gatsbyWindow()) {
            return
        }

        const offset = 0
        const slidesAmount = projects.length + 1
        const heightOfFullpage = fpRef.current.offsetHeight
        const heightofPanel = heightOfFullpage / slidesAmount - offset
        const outOfBounds = window.scrollY > heightOfFullpage - heightofPanel
        if (outOfBounds) {
            window.fullpage_api.setFitToSection(false)
        } else {
            window.fullpage_api.setFitToSection(true)
        }
    }
    if (gatsbyWindow()) {
        useEffect(() => {
            window.addEventListener("scroll", throttle(checkScroll, 500))

            return function cleanup() {
                window.removeEventListener("scroll", throttle(checkScroll, 500))
            }
        }, [])
    }

    return (
        <Layout title="Home" logoColor={logoColor}>
            <div ref={fpRef}>
                <FullPage
                    data={data}
                    projects={projects}
                    onSlideLeave={onSlideLeave}
                />
            </div>
            <SeeMore />
        </Layout>
    )
}

export default IndexPage
