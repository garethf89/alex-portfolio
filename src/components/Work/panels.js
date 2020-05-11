import React, { useState } from "react"

import Heading from "../Typography/heading"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { supportsWebP } from "../../helpers/support/webp"

const WorkPanelStyled = styled(Link)`
    padding-top: 55%;
    width: 100%;
    color: ${props => (props.color === "dark" ? "#000" : "#fff")};
    overflow: hidden;
    margin-bottom: 3.75rem;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    text-decoration: none;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        padding-top: ${props => (props.size === "large" ? "55%" : "22%")};
        width: ${props => (props.size === "large" ? "100%" : "47%")};
    }
`

const Content = styled.div`
    margin: 1.88rem 3.75rem;
`

const WorkPanel = ({ size, title, image, color }) => {
    const [imageSrc, setSrc] = useState(image ? image.file.url : null)

    supportsWebP(res => {
        if (res) {
            setSrc(image.resolutions.srcWebp)
        }
    })

    return (
        <WorkPanelStyled size={size} image={imageSrc} color={color}>
            <Content>
                <Heading level="h2" text={title} />
            </Content>
        </WorkPanelStyled>
    )
}

export default WorkPanel
