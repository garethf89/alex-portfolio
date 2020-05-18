import React from "react"
import styled from "@emotion/styled"
const Wrapper = styled.section`
    margin: 0 auto auto;
    width: 100%;
    flex-basis: 50%;
    max-width: ${props =>
        props.wide
            ? props.theme.sizes.widerMaxWidth
            : props.theme.sizes.maxWidth};
    padding: 0 1.5rem;
    flex-grow: 1;
`

const Container = ({ children, className, wide }) => {
    return (
        <Wrapper wide={wide} className={className}>
            {children}
        </Wrapper>
    )
}

export default Container
