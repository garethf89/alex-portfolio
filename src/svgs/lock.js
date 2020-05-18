import * as React from "react"

const SvgLock = props => {
    return (
        <svg width="1em" height="1em" viewBox="0 0 20 24" {...props}>
            <g fill="#FFF" fillRule="evenodd">
                <path d="M17 6.545a3 3 0 013 3V21a3 3 0 01-3 3H3a3 3 0 01-3-3V9.545a3 3 0 013-3h14zm-7 4.364c-1.227 0-2.222.977-2.222 2.182 0 .808.447 1.513 1.111 1.89v4.655h2.222l.001-4.656a2.174 2.174 0 001.11-1.89c0-1.204-.995-2.18-2.222-2.18z" />
                <path
                    d="M16.356 6.255C16.356 2.797 13.506 0 10 0 6.493 0 3.644 2.797 3.644 6.255v.8h1.6v-.8C5.244 3.687 7.37 1.6 10 1.6c2.63 0 4.756 2.087 4.756 4.655v.8h1.6v-.8z"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    )
}

export default SvgLock
