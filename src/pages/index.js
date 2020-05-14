import React, { useEffect, useRef } from "react"
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
                    headline
                    slug
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

    const projects = data.contentfulHomePage.projects

    const fpRef = useRef(null)

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
                window.fullpage_api.destroy("all")
            }
        }, [])
    }

    return (
        <Layout title="Home">
            <div ref={fpRef}>
                <FullPage data={data} projects={projects} />
            </div>
            <SeeMore />
        </Layout>
    )
}

export default IndexPage
