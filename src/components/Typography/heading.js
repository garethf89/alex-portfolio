import React from "react"
import styled from "@emotion/styled"

const H1 = styled.h1`
    font-size: 48px;
    line-height: 1.2;
`

const H2 = styled.h2`
    font-size: 30px;
    line-height: 1;
`

const Heading = ({ level, text }) => {
    if (level === "h1") {
        return <H1>{text}</H1>
    }

    if (level === "h2") {
        return <H2>{text}</H2>
    }

    return <p>{text}</p>
}

export default Heading
