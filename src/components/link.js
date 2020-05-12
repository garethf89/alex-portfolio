import React from "react"
import styled from "@emotion/styled"

const StyledLink = styled.a`
    text-decoration: underline;
    color: inherit;
`

const Link = ({ href, children, className }) => {
    return (
        <StyledLink href={href} className={className}>
            {children}
        </StyledLink>
    )
}

export default Link
