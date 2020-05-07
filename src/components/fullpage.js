import React from "react"
import ReactFullpage from "@fullpage/react-fullpage"

const FullPage = ({ onSlideLeave, panels, test }) => {
    return (
        <ReactFullpage
            licenseKey={"YOUR_KEY_HERE"}
            scrollingSpeed={1000}
            easingcss3="ease"
            css3
            onLeave={onSlideLeave}
            navigation
            navigationPosition="bottom"
            // autoScrolling={false}
            // fitToSectionDelay={500}
            render={({ state, fullpageApi }) => {
                return <ReactFullpage.Wrapper>{panels}</ReactFullpage.Wrapper>
            }}
        />
    )
}

export default FullPage
