import React, { useContext, useMemo } from "react"

import Panel from "../components/Home/panel"
import PanelContainer from "../components/panelContainer"
import PanelImage from "../components/Media/panelimage"
import ReactFullpage from "@fullpage/react-fullpage"
import VideoBackground from "../components/Media/video"
import classNames from "classnames"
import { gatsbyWindow } from "../helpers/gatsbyWindow"
import { store } from "../state/state"
import theme from "../gatsby-plugin-theme-ui/index"

const FullPage = ({ data, projects }) => {
    const { state, dispatch } = useContext(store)
    const themeMode = state.theme

    const panelColorIndexHome = [
        {
            index: 0,
            color: "light",
        },
    ]

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
            dispatch({ type: "THEME", theme: panel[0].color })
        }
    }

    return (
        <ReactFullpage
            licenseKey={"YOUR_KEY_HERE"}
            scrollingSpeed={1000}
            easingcss3="ease"
            css3
            onLeave={onSlideLeave}
            autoScrolling={false}
            fitToSection
            fitToSectionDelay={100}
            render={({ state, fullpageApi }) => {
                let isMobile = false
                if (gatsbyWindow) {
                    isMobile = window.matchMedia(
                        `(max-width: ${theme.responsive.medium} )`
                    ).matches
                }

                const image = data.contentfulHomePage.image
                const videoH = image.file.contentType.includes("video")

                return (
                    <ReactFullpage.Wrapper>
                        <PanelContainer
                            key="home"
                            backgroundColor="#000"
                            darkBackground
                        >
                            <Panel
                                text={data.contentfulHomePage.headline}
                                topText={data.contentfulHomePage.title}
                            >
                                {videoH && (
                                    <VideoBackground
                                        src={image.file.url}
                                        type={image.file.contentType}
                                        poster=""
                                        autoPlay
                                    />
                                )}
                            </Panel>
                        </PanelContainer>
                        {projects.map((value, index) => {
                            const video = value.coverVideo.file.contentType.includes(
                                "video"
                            )

                            const isDarkBackground = value.darkBackground
                            const theme = isDarkBackground ? true : false
                            return (
                                <PanelContainer
                                    key={index}
                                    darkBackground={theme}
                                    image={video ? "" : value.coverImage}
                                >
                                    <Panel
                                        text={value.title}
                                        subText={value.headline}
                                        dataAnchor={`slide-anchor-${index}`}
                                        slug={value.slug}
                                    >
                                        {video && !isMobile && (
                                            <VideoBackground
                                                src={value.coverVideo.file.url}
                                                type={
                                                    value.coverVideo.file
                                                        .contentType
                                                }
                                                poster=""
                                                autoPlay={false}
                                            />
                                        )}
                                        {!video ||
                                            (isMobile && (
                                                <PanelImage
                                                    source={
                                                        value.coverImage.fixed
                                                            .src
                                                    }
                                                    sourceWeb={
                                                        value.coverImage.fixed
                                                            .srcWebp
                                                    }
                                                />
                                            ))}
                                        <div className="fp-navcustom">
                                            <ul>
                                                {projects.map((p, i) => {
                                                    let classStyle = classNames(
                                                        {
                                                            dark: !isDarkBackground,
                                                            active: i === index,
                                                        }
                                                    )
                                                    return (
                                                        <li key={i}>
                                                            <a
                                                                onClick={e => {
                                                                    e.preventDefault()
                                                                    fullpageApi.moveTo(
                                                                        i + 2
                                                                    )
                                                                }}
                                                                href="#"
                                                                className={
                                                                    classStyle
                                                                }
                                                            >
                                                                <span className="fp-sr-only">
                                                                    Section{" "}
                                                                    {index}
                                                                </span>
                                                                <span></span>
                                                            </a>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </Panel>
                                </PanelContainer>
                            )
                        })}
                    </ReactFullpage.Wrapper>
                )
            }}
        />
    )
}

export default FullPage
