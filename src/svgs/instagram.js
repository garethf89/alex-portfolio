import * as React from "react"

function SvgComponent(props) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 56 56" {...props}>
            <g fill="#FFF" fillRule="evenodd">
                <path d="M28.34 31.386a4.223 4.223 0 004.222-4.225 4.223 4.223 0 00-4.221-4.225 4.223 4.223 0 00-4.221 4.225 4.223 4.223 0 004.22 4.225" />
                <path d="M41.607 38.354a3.295 3.295 0 01-3.298 3.293H17.166a3.296 3.296 0 01-3.297-3.293v-21.18a3.295 3.295 0 013.297-3.292H38.31a3.294 3.294 0 013.298 3.292v21.18zM27.737 0C12.418 0 0 12.43 0 27.765 0 43.098 12.418 55.53 27.738 55.53s27.738-12.432 27.738-27.765C55.476 12.43 43.058 0 27.738 0z" />
                <path d="M34.474 21.729h3.411c.39 0 .707-.317.707-.706v-3.417a.707.707 0 00-.707-.706h-3.41a.707.707 0 00-.707.706v3.417c0 .39.317.706.706.706M36.4 27.444c0 4.364-3.615 7.916-8.06 7.916-4.443 0-8.058-3.552-8.058-7.916 0-.724.1-1.427.287-2.093h-2.48v11.342c0 .403.332.73.741.73h19.02c.41 0 .742-.327.742-.73V25.351h-2.479a7.74 7.74 0 01.287 2.093" />
            </g>
        </svg>
    )
}

export default SvgComponent
