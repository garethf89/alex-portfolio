import React, { useEffect, useMemo, useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import FullPage from "../components/fullpage"
import Layout from "../components/layout"
import Panel from "../components/Home/panel"
import VideoBackground from "../components/Media/video"
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
                const video = value.coverImage.file.contentType.includes(
                    "video"
                )

                const isDarkBackground = value.darkBackground
                const theme = isDarkBackground ? "light" : "dark"

                return (
                    <Panel
                        key={index}
                        theme={theme}
                        image={video ? "" : value.coverImage}
                        text={value.title}
                        subText={value.headline.internal.content}
                    >
                        {video && (
                            <VideoBackground
                                src={value.coverImage.file.url}
                                type={value.coverImage.file.contentType}
                                poster=""
                                autoPlay={false}
                            />
                        )}
                    </Panel>
                )
            }),
        [projects]
    )
    const homePanel = useMemo(() => {
        const image = data.contentfulHomePage.image
        const video = image.file.contentType.includes("video")

        return (
            <Panel
                key="home"
                theme="light"
                backgroundColor="#000"
                text={data.contentfulHomePage.title}
                subText={data.contentfulHomePage.headline}
            >
                {video && (
                    <VideoBackground
                        src={image.file.url}
                        type={image.file.contentType}
                        poster=""
                        autoPlay
                    />
                )}
            </Panel>
        )
    }, [])

    const allPanels = useMemo(() => [homePanel, panels])

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
    }

    const checkScroll = () => {
        if (!fpRef.current) {
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

    useEffect(() => {
        window.addEventListener("scroll", throttle(checkScroll, 500))

        return function cleanup() {
            window.removeEventListener("scroll", throttle(checkScroll, 500))
        }
    }, [])
    return (
        <Layout title="Home" logoColor={logoColor}>
            <div ref={fpRef}>
                <FullPage panels={allPanels} onSlideLeave={onSlideLeave} />
            </div>
        </Layout>
    )
}

export default IndexPage
