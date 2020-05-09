import { css } from "@emotion/core"
import normalize from "normalize.css"

/* stylelint-disable */
export const globalStyles = css`
    ${normalize}
    @import url('https://fonts.googleapis.com/css2?family=Muli:wght@200;400&display=block');
    * {
        box-sizing: border-box;
    }
    #fp-nav {
        top: auto;
        bottom: 3.75rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 4;
        ul {
            display: flex;
            flex-direction: row;
            li:hover,
            li {
                a {
                    opacity: 0.5;
                    span {
                        background: #fff;
                        transition: all 1s;
                    }
                    &.active {
                        opacity: 1;
                    }
                    &.dark span {
                        background: #000;
                    }
                }
                a,
                a.active {
                    span {
                        margin: -2px 0 0 -2px;
                        height: 8px;
                        width: 8px;
                    }
                }
            }
        }
    }
`
export default globalStyles
