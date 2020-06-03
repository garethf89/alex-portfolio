import React from "react"
import styled from "@emotion/styled"

const Wrapper = styled.section`
    margin: 0 auto auto;
    width: 100%;
    flex-basis: 50%;
    padding: 01.5rem;
    flex-grow: 1;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        padding: 0 ${3.75 + 2.75}rem;
        max-width: ${props =>
            props.wide
                ? props.theme.sizes.widerMaxWidth
                : props.theme.sizes.maxWidth};
    }
`

const Container = ({ theme, children, className, wide }) => {
    return (
        <Wrapper wide={wide} className={className}>
            {children}
        </Wrapper>
    )
}

export default Container
