import Container from "./container"
import React from "react"
import styled from "@emotion/styled"

const FooterStyles = styled.p`
    margin: 0;
`

const FooterStylesSub = styled.p`
    margin: 0;
    span {
        font-size: 14px;
    }
`

const FooterOuter = styled.footer`
    section {
        padding-top: 3.44rem;
        padding-bottom: 3.44rem;
    }
`

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <FooterOuter>
            <Container>
                <FooterStyles>Alex Ioanna Graphic Design {year}</FooterStyles>
                <FooterStylesSub>
                    <span>
                        Built by&nbsp;
                        <a
                            href="http://www.garethferguson.co.uk"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Gareth Ferguson
                        </a>
                    </span>
                </FooterStylesSub>
            </Container>
        </FooterOuter>
    )
}

export default Footer
