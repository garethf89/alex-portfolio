import Theme from "../gatsby-plugin-theme-ui/index"
import { css } from "@emotion/core"
import normalize from "normalize.css"

/* stylelint-disable */
export const globalStyles = css`
    ${normalize}
    @import url('https://fonts.googleapis.com/css2?family=Muli:wght@200;400&display=block');
    * {
        box-sizing: border-box;
    }

    .fp-navcustom {
        position: absolute;
        z-index: 4;
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        left: 0 !important;
        right: 0;
        margin: 0 auto !important;
    }

    .fp-navcustom ul {
        margin: 0;
        padding: 0;
        li {
            display: inline-block;
            width: 14px;
            height: 13px;
            margin: 7px;
            position: relative;
        }
    }

    .fp-navcustom ul li a {
        display: block;
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        cursor: pointer;
        text-decoration: none;
    }
    .fp-navcustom ul li a.active span,
    .fp-navcustom ul li:hover a.active span {
        height: 12px;
        width: 12px;
        margin: -6px 0 0 -6px;
        border-radius: 100%;
    }
    .fp-navcustom ul li a span {
        border-radius: 50%;
        position: absolute;
        z-index: 1;
        height: 4px;
        width: 4px;
        border: 0;
        background: #333;
        left: 50%;
        top: 50%;
        margin: -2px 0 0 -2px;
        transition: all 0.1s ease-in-out;
    }
    #fp-nav ul li:hover a span,
    .fp-navcustom ul li:hover a span {
        width: 10px;
        height: 10px;
        margin: -5px 0px 0px -5px;
    }

    .fp-navcustom {
        top: auto;
        bottom: 1.75rem;
        display: flex;
        justify-content: center;
        z-index: 4;
        transition: all 0.5s;
        ul {
            display: flex;
            flex-direction: row;
            .hidden {
                display: none;
            }
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
        @media (min-width: ${Theme.responsive.medium}) {
            bottom: 3.75rem;
        }
    }
`
export default globalStyles
