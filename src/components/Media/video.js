import React, { useEffect, useRef } from "react"

import PanelImage from "./panelimage"
import debounce from "../../helpers/debounce"
import { gatsbyWindow } from "../../helpers/gatsbyWindow"
import isElementVisibleFullpage from "../../helpers/isElementVisibleFullpage"
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
        min-width: 100%;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
    }
    @media (min-aspect-ratio: 16/9) {
        video {
            width: 100%;
            height: auto;
        }
    }
    @media (max-aspect-ratio: 16/9) {
        video {
            min-height: 100%;
        }
    }
    @media (min-width: ${props => props.theme.responsive.medium}) {
        video {
            display: block;
        }
    }
`
const PanelImageStyled = styled(PanelImage)`
    display: block;

    @media (min-width: ${props => props.theme.responsive.medium}) {
        display: ${props => (props.fixed ? "none" : "block")};
    }
`

const VideoBackground = ({
    fallback,
    src,
    poster,
    autoPlay,
    type = "video/mp4",
}) => {
    const refVideo = useRef(null)

    const visibilityChange = () => {
        if (!refVideo.current) {
            return
        }
        const isVisible = isElementVisibleFullpage(refVideo.current)
        if (isVisible && refVideo.current.paused) {
            refVideo.current.play()
        } else if (!isVisible) {
            refVideo.current.pause()
        }
    }

    if (gatsbyWindow()) {
        useEffect(() => {
            window.addEventListener(
                "scroll",
                debounce(e => {
                    visibilityChange()
                }, 100)
            )

            return function cleanup() {
                window.removeEventListener(
                    "scroll",
                    debounce(e => {
                        visibilityChange()
                    }, 100)
                )
            }
        }, [])
    }
    return (
        <VideoBackgroundContainer>
            {fallback && (
                <PanelImageStyled
                    className=""
                    fixed={src}
                    source={fallback.src}
                    sourceWeb={fallback.srcWebp}
                />
            )}
            {src && (
                <video
                    ref={refVideo}
                    poster={poster}
                    autoPlay={autoPlay}
                    muted
                    loop
                >
                    <source src={src} type={type} />
                </video>
            )}
        </VideoBackgroundContainer>
    )
}

export default VideoBackground
