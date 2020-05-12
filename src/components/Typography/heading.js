import React from "react"
import styled from "@emotion/styled"

const H1 = styled.h1`
    font-size: 48px;
    line-height: 1.2;
    font-weight: 200;
`

const H2 = styled.h2`
    font-size: 30px;
    line-height: 1;
    font-weight: 200;
`

const H3 = styled.h3`
    font-size: 30px;
    line-height: 1;
    font-weight: 200;
`
const H4 = styled.h4`
    font-size: 30px;
    line-height: 1;
    font-weight: 200;
`
const H5 = styled.h5`
    font-size: 30px;
    line-height: 1;
    font-weight: 200;
`

const Heading = ({ level, text, className }) => {
    if (level === "h1") {
        return <H1 className={className}>{text}</H1>
    }

    if (level === "h2") {
        return <H2 className={className}>{text}</H2>
    }

    if (level === "h3") {
        return <H3 className={className}>{text}</H3>
    }

    if (level === "h4") {
        return <H4 className={className}>{text}</H4>
    }
    if (level === "h5") {
        return <H5 className={className}>{text}</H5>
    }

    return <p className={className}>{text}</p>
}

export default Heading
