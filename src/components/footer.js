import Container from "./container"
import React from "react"
import styled from "@emotion/styled"

const FooterStyles = styled.p`
    margin: 0;
`

const FooterOuter = styled.div`
    section {
        padding-top: 3.44rem;
        padding-bottom: 3.44rem;
    }
`

const Footer = ({ isHome }) => {
    const year = new Date().getFullYear()
    const conditionalClass = !isHome ? "" : "section fp-auto-height"
    return (
        <FooterOuter className={conditionalClass}>
            <Container>
                <FooterStyles>Alex Ioanna Graphic Design {year}</FooterStyles>
            </Container>
        </FooterOuter>
    )
}

export default Footer
