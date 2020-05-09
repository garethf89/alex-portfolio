import React, { useRef } from "react"

import debounce from "../../helpers/debounce"
import { gatsbyWindow } from "../../helpers/gatsbyWindow"
import isElementVisible from "../../helpers/isElementVisible"
import styled from "@emotion/styled"

const VideoBackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    video {
        width: 100%;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    @media (min-aspect-ratio: 16/9) {
        video {
            width: 100%;
            height: auto;
        }
    }
    @media (max-aspect-ratio: 16/9) {
        video {
            width: auto;
            height: 100%;
        }
    }
`

const VideoBackground = ({ src, poster, autoPlay, type = "video/mp4" }) => {
    const refVideo = useRef(null)

    const visibilityChange = () => {
        if (!refVideo.current) {
            return
        }
        const isVisible = isElementVisible(refVideo.current)
        if (isVisible && refVideo.current.paused) {
            refVideo.current.play()
        } else if (!isVisible) {
            refVideo.current.pause()
        }
    }

    if (gatsbyWindow()) {
        window.addEventListener(
            "scroll",
            debounce(e => {
                visibilityChange()
            }, 100)
        )
    }
    return (
        <VideoBackgroundContainer>
            <video
                ref={refVideo}
                poster={poster}
                autoPlay={autoPlay}
                muted
                loop
            >
                <source src={src} type={type} />
            </video>
        </VideoBackgroundContainer>
    )
}

export default VideoBackground
