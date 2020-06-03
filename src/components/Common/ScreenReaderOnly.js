import React from "react"
import styled from "@emotion/styled"

const SRStyled = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`

const ScreenReaderOnly = ({ children }) => {
    return <SRStyled>{children}</SRStyled>
}

export default ScreenReaderOnly
