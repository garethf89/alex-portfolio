import AniLink from "gatsby-plugin-transition-link/AniLink"
import React from "react"

const FadeLink = ({ children, to, duration }) => {
    return (
        <AniLink
            trigger={async pages => {
                const s = window.scrollY
                window.scrollTo(0, 0)

                const div = document.getElementById("home-container")
                div.style.position = "relative"
                div.style.top = `-${s}px`
                pages.entry.state = { test: "sdf" }
                const exit = await pages.exit
                const entry = await pages.entry
                entry.node.querySelector(
                    "video"
                ).currentTime = exit.node.querySelector("video").currentTime
            }}
            fade
            to={to}
            duration={duration}
        >
            {children}
        </AniLink>
    )
}

export default FadeLink
