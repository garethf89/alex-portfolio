import "video-react/dist/video-react.css"

import { BigPlayButton, ControlBar, Player } from "video-react"
import React, { useEffect, useRef } from "react"

import classNames from "classnames"
import styled from "@emotion/styled"

const VideoPlayer = styled(Player)`
    .video-react-big-play-button {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

const VideoContainer = styled.div`
    margin-bottom: 3rem;
    display: block;
    flex-basis: 100%;
    width: auto;
    + img,
    + .half-width-images {
        margin-top: 2rem;
    }
    &.autoplay {
        .video-react-big-play-button {
            display: none;
        }
    }
`

const Video = ({ src, poster, type, autoplay }) => {
    const refVideo = useRef(null)

    useEffect(() => {
        if (!refVideo.current) {
            return
        }
        if (autoplay) {
            refVideo.current.play()
        }
    })

    let classStyle = classNames({
        autoplay: autoplay,
        "video-inline-player": true,
    })
    return (
        <VideoContainer data-vjs-player className={classStyle}>
            <VideoPlayer
                loop={autoplay}
                muted={autoplay}
                ref={refVideo}
                autoPlay={autoplay}
                src={src}
                type={type}
            >
                <ControlBar autoHide={false} className={classStyle} />
                <BigPlayButton className={classStyle} />
            </VideoPlayer>
        </VideoContainer>
    )
}

export default Video
