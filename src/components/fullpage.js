import Panel from "../components/Home/panel"
import PanelImage from "../components/Media/panelimage"
import React from "react"
import ReactFullpage from "@fullpage/react-fullpage"
import VideoBackground from "../components/Media/video"
import classNames from "classnames"
import { gatsbyWindow } from "../helpers/gatsbyWindow"
import theme from "../gatsby-plugin-theme-ui/index"

const FullPage = ({ data, projects, onSlideLeave, panels }) => {
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
                if (!gatsbyWindow) {
                    isMobile = window.matchMedia(
                        `(max-width: ${theme.responsive.medium} )`
                    ).matches
                }

                const image = data.contentfulHomePage.image
                const videoH = image.file.contentType.includes("video")

                return (
                    <ReactFullpage.Wrapper>
                        <Panel
                            key="home"
                            theme="light"
                            backgroundColor="#000"
                            text={data.contentfulHomePage.title}
                            subText={data.contentfulHomePage.headline}
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
                        {projects.map((value, index) => {
                            const video = value.coverVideo.file.contentType.includes(
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
                                    subText={value.headline}
                                    dataAnchor={`slide-anchor-${index}`}
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
                                                    value.coverImage.fixed.src
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
                                                let classStyle = classNames({
                                                    dark: !isDarkBackground,
                                                    active: i === index,
                                                })
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
                                                                Section {index}
                                                            </span>
                                                            <span></span>
                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </Panel>
                            )
                        })}
                    </ReactFullpage.Wrapper>
                )
            }}
        />
    )
}

export default FullPage
