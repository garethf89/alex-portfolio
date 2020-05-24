import { css } from "@emotion/core"
import normalize from "normalize.css"

/* stylelint-disable */
export const globalStyles = props => css`
    ${normalize}
    @import url('https://fonts.googleapis.com/css2?family=Muli:wght@200;400;600&display=block');
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
`
export default globalStyles
