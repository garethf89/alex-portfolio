import React, { useState } from "react"

import styled from "@emotion/styled"
import { supportsWebP } from "../../helpers/support/webp"

const PanelWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    background-image: url(${props => props.source});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

const PanelImage = ({ source, sourceWeb }) => {
    const [imageSrc, setSrc] = useState(source)

    supportsWebP(res => {
        if (res) {
            setSrc(sourceWeb)
        }
    })

    return <PanelWrapper source={imageSrc}></PanelWrapper>
}

export default PanelImage
