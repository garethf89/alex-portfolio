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
    padding: 0 ${2.5 + 1.5}rem;
    flex-grow: 1;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        padding: 0 ${3.75 + 2.75}rem;
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
