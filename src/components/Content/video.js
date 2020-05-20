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

const Video = ({ src, poster, type }) => {
    return (
        <>
            <div data-vjs-player>
                <VideoPlayer>
                    <source src={src} type={type} />
                </VideoPlayer>
            </div>
        </>
    )
}

export default Video
