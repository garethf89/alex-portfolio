import React, { useEffect, useRef, useState } from "react"

import Panel from "../components/Home/panel"
import PanelContainer from "../components/panelContainer"
import PanelImage from "../components/Media/panelimage"
import PanelNav from "./Home/panelNav"
import { TransitionState } from "gatsby-plugin-transition-link"
import VideoBackground from "../components/Media/video"
import anime from "animejs"
import debounce from "../helpers/debounce"
import { gatsbyWindow } from "../helpers/gatsbyWindow"
import isVisible from "../helpers/isElementVisible"
import styled from "@emotion/styled"

const FullPageContainer = styled.div``

const FullPage = ({ data, projects, status }) => {
    const [isSnapping, setSnap] = useState(false)
    const [hasWindow, setWindow] = useState(true)

    let scrollTO = useRef(false)
    let resetSnap = () => false
    let goTo = () => false
    let goToSlide = () => false
    let snap = () => false
    let throttled = () => false

    if (hasWindow) {
        throttled = debounce(e => {
            scrollTO.current = setTimeout(snap, 200)
        }, 200)

        resetSnap = () => {
            scrollTO.current = null
            setSnap(false)
            anime.remove(document.scrollingElement)
        }

        goToSlide = (el, scrollDuration = 650) => {
            anime({
                targets: document.scrollingElement,
                scrollTop: el.offsetTop,
                duration: 650,
                easing: "easeInOutCirc",
                complete: () => {
                    resetSnap()
                },
            })
        }

        snap = () => {
            const homeContainer = document.getElementById("home-container")
            const sections = document.querySelectorAll(".section")

            if (!sections.length && homeContainer) {
                resetSnap()
                return
            }

            if (isSnapping) return

            const vh = sections[0].clientHeight
            const distToBottom =
                document.body.scrollHeight - window.scrollY - vh
            const footerHeight =
                document.body.scrollHeight - homeContainer.clientHeight
            if (distToBottom < footerHeight) return
            setSnap(true)

            const snapElements = [...sections]
            let snapEl = snapElements.find((el, i) => {
                return isVisible(el, 51)
            })

            if (snapEl) {
                goToSlide(snapEl)
            }
        }

        goTo = async num => {
            window.removeEventListener("scroll", throttled)
            setSnap(true)
            scrollTO.current = null
            await anime.remove(document.scrollingElement)
            const target = document.querySelectorAll(".section")[num]
            scrollTO.current = setTimeout(goToSlide(target, 650), 100)
        }
    }

    useEffect(() => {
        if (gatsbyWindow()) {
            window.removeEventListener("scroll", throttled)
            if (!isSnapping) {
                setTimeout(
                    () => window.addEventListener("scroll", throttled),
                    200
                )
            }
        } else {
            setWindow(false)
        }

        return function cleanup() {
            if (hasWindow) {
                window.removeEventListener("scroll", throttled)
            }
        }
    }, [isSnapping])

    const image = data.page.image
    const videoH = image.file.contentType.includes("video")
    return (
        <TransitionState>
            {({ mount, transitionStatus }) => {
                if (transitionStatus === "exiting" && hasWindow) {
                    scrollTO.current = null
                    anime.remove(document.scrollingElement)
                    window.removeEventListener("scroll", throttled)
                }
                return (
                    <FullPageContainer>
                        <PanelContainer
                            key="home"
                            backgroundColor="#000"
                            darkBackground
                        >
                            <Panel
                                text={data.page.headline}
                                topText={data.page.title}
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
                            const isMobile = false
                            const isDarkBackground = value.darkBackground
                            const theme = isDarkBackground ? true : false
                            return (
                                <PanelContainer
                                    key={index}
                                    position={index}
                                    darkBackground={theme}
                                    image={video ? "" : value.coverImage}
                                >
                                    <Panel
                                        text={value.title}
                                        subText={value.headline}
                                        dataAnchor={`slide-anchor-${index}`}
                                        slug={value.slug}
                                        color={isDarkBackground}
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
                                        <PanelNav
                                            data={projects}
                                            active={index}
                                            change={goTo}
                                            isDark={isDarkBackground}
                                        />
                                    </Panel>
                                </PanelContainer>
                            )
                        })}
                    </FullPageContainer>
                )
            }}
        </TransitionState>
    )
}

export default FullPage
