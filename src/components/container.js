import React from "react"
import styled from "@emotion/styled"

const Wrapper = styled.section`
    margin: 0 auto auto;
    width: 100%;
    max-width: ${props => props.theme.sizes.maxWidth};
    padding: 4.38em 1.5em 2em;
    flex-grow: 1;
`

const Container = ({ children, className }) => {
    return <Wrapper className={className}>{children}</Wrapper>
}

export default Container
