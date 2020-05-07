import React from "react"
import VizSensor from "react-visibility-sensor"
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
    const refVideo = React.createRef()

    const visibilityChange = isVisible => {
        if (isVisible) {
            refVideo.current.play()
        } else {
            refVideo.current.pause()
        }
    }

    return (
        <VizSensor
            scrollDelay={100}
            onChange={isVisible => {
                visibilityChange(isVisible)
            }}
            delayedCall
        >
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
        </VizSensor>
    )
}

export default VideoBackground
