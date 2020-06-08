import "video-react/dist/video-react.css"

import { Player } from "video-react"
import React from "react"
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
`

const Video = ({ src, poster, type }) => {
    return (
        <VideoContainer data-vjs-player className="video-inline-player">
            <VideoPlayer>
                <source src={src} type={type} />
            </VideoPlayer>
        </VideoContainer>
    )
}

export default Video
