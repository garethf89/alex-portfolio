import Heading from "../components/Typography/heading"
import LinkedProjects from "../components/Shared/linkedProjects"
import PanelContainer from "../components/panelContainer"
import React from "react"
import Social from "../components/social"
import styled from "@emotion/styled"

const NotFound = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const NotFoundPage = () => {
    return (
        <>
            <PanelContainer contentPage backgroundColor="#000">
                <NotFound>
                    <Heading level="h1">Page not found</Heading>
                </NotFound>
            </PanelContainer>
            <LinkedProjects />

            <Social />
        </>
    )
}

export default NotFoundPage
