import Container from "../container"
import React from "react"
import { gatsbyWindow } from "../../helpers/gatsbyWindow"
import styled from "@emotion/styled"

const PanelContainer = styled.div`
    position: relative;
    .fp-tableCell {
        vertical-align: bottom;
    }

    background-color: ${props => props.backgroundColor};
    background-image: url(${props => props.image});
    background-position: center;
    background-size: cover;
    color: ${props => (props.theme === "light" ? "#fff" : "inherit")};
`

const PanelText = styled(Container)`
    position: relative;
    padding-bottom: 2rem;
    z-index: 2;
`

const PanelHeading = styled.h2`
    font-size: 3em;
    line-height: 1.1;
    margin-bottom: 1rem;
`

const PanelSubText = styled.p`
    margin-bottom: 4.5rem;
`

const Panel = ({ children, theme, image, text, subText, backgroundColor }) => {
    let displayImage
    if (image && gatsbyWindow) {
        displayImage = !document.body.classList.contains("nowebp")
            ? image.resolutions.srcWebp
            : image.file.url
    }

    return (
        <PanelContainer
            className="section"
            backgroundColor={backgroundColor}
            image={displayImage}
            theme={theme}
        >
            {children}
            <PanelText>
                <PanelHeading>{text}</PanelHeading>
                <PanelSubText>{subText}</PanelSubText>
            </PanelText>
        </PanelContainer>
    )
}

export default Panel
