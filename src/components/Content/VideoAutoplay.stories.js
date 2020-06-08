import Container from "../container"
import React from "react"
import Video from "./video"
export const VideoAutoplayComponent = () => (
    <Container>
        <Video
            autoplay
            src="https://videos.ctfassets.net/qq0ppbojlli0/63aqb2JOKkLAQwm0u1K5XN/6495f98a1ea317c13b463074202832f4/AtomHome.mp4"
            contentType="video/mp4"
        />
    </Container>
)
export default {
    title: "Page Components",
    component: VideoAutoplayComponent,
}
