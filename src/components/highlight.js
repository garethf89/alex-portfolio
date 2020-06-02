import Container from "../components/container"
import React from "react"
import styled from "@emotion/styled"

const HighlightStyles = styled.div`
    color: #fff;
    background: #000;
    padding: 3.13rem 0;
`

const FlexContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        flex-direction: row;
    }
`

const Highlight = ({ children, wide }) => {
    return (
        <HighlightStyles>
            <FlexContainer wide={wide}>{children}</FlexContainer>
        </HighlightStyles>
    )
}

export default Highlight
