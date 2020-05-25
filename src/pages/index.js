import React, { useContext, useEffect, useRef } from "react"
import { graphql, useStaticQuery } from "gatsby"

import FullPage from "../components/fullpage"
import SeeMore from "../components/Work/seemore"
import { store } from "../state/state"

const IndexPage = () => {
    const data = useStaticQuery(graphql`
        query HomeProjects {
            site {
                siteMetadata {
                    title
                }
            }
            page: contentfulHomePage {
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

    const projects = data.page.projects
    const fpRef = useRef(null)
    const { dispatch } = useContext(store)

    useEffect(() => {
        dispatch({ type: "THEME", theme: "light" })
    }, [])

    return (
        <div id="home-container">
            <div ref={fpRef}>
                <FullPage data={data} projects={projects} />
            </div>
            <SeeMore />
        </div>
    )
}

export default IndexPage
