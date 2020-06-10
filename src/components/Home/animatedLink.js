import React, { useRef } from "react"

import AniLink from "gatsby-plugin-transition-link/AniLink"
import styled from "@emotion/styled"

const SpanAnimate = styled.span``

const FadeLink = ({ children, to, duration }) => {
    const spanRef = useRef(false)
    return (
        <AniLink
            trigger={async pages => {
                let nearestPanel
                let video

                // Some protection here as library can be flaky
                if (spanRef.current) {
                    nearestPanel = spanRef.current.closest(".home-panel")
                    nearestPanel.classList.add("fade-out-text")
                }

                if (nearestPanel) {
                    video = nearestPanel.querySelector("video")
                }

                const s = window.scrollY
                window.scrollTo(0, 0)

                const div = document.getElementById("home-container")
                div.style.position = "relative"
                div.style.top = `-${s}px`
                pages.entry.state = { test: "sdf" }

                const exit = await pages.exit
                const entry = await pages.entry

                if (!video) {
                    video = exit.node.querySelector("video")
                }

                const targetVideo = entry.node.querySelector("video")

                await entry.visible

                targetVideo.currentTime = video.currentTime + 0.25
                targetVideo.play()

                spanRef.current.classList.add("span-fade-out")
            }}
            fade
            to={to}
            duration={duration}
        >
            <SpanAnimate ref={spanRef}>{children}</SpanAnimate>
        </AniLink>
    )
}

export default FadeLink
