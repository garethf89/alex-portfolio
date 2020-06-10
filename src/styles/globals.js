import { css } from "@emotion/core"
import normalize from "normalize.css"

/* stylelint-disable */
export const globalStyles = props => css`
    ${normalize}
    * {
        box-sizing: border-box;
    }
    html,
    h1,
    h2,
    h3,
    h4,
    h5,
    body {
        margin: 0;
        padding: 0;
    }

    .tl-wrapper--unmount {
        transition-delay: 0.25s;
        z-index: -1;
    }
`
export default globalStyles
