import * as React from "react"

const SvgComponent = (props) => (
        <svg width="1em" height="1em" viewBox="0 0 55 55" {...props}>
            <g fill="none" fillRule="evenodd">
                <path
                    d="M0 27.5C0 42.687 12.313 55 27.5 55 42.689 55 55 42.687 55 27.5 55 12.311 42.689 0 27.5 0 12.313 0 0 12.311 0 27.5z"
                    fill="#FFF"
                />
                <g
                    transform="translate(15 18)"
                    stroke="#000"
                    strokeLinejoin="round"
                    strokeWidth={3}
                >
                    <rect
                        strokeLinecap="square"
                        width={25}
                        height={18.75}
                        rx={1}
                    />
                    <path
                        strokeLinecap="round"
                        d="M0 1.174l12.5 12.5L25 1.174"
                    />
                </g>
            </g>
        </svg>
    );

export default SvgComponent

