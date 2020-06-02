import ArrowRight from "../../svgs/arrowRight"
import React from "react"
import styled from "@emotion/styled"

const MoreLinkOuter = styled.span`
    display: inline-block;
    position: relative;
    transition: width 0.25s ease-in-out;
    height: 1rem;
    width: 2.25rem;
    overflow: hidden;
    cursor: pointer;
    svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: ${props => (props.hover ? "0" : "1rem")};
        transition: right 0.25s ease-in-out;
        stroke: ${props => (props.color === "dark" ? "#fff" : "#000")};
        g {
            stroke: inherit;
        }
    }

    &:hover {
        svg {
            right: 0;
        }
    }

    @media (min-width: ${props => props.theme.responsive.medium}) {
        height: 2rem;
        width: 3.75rem;
    }
`

const MoreLink = ({ hover, color }) => {
    return (
        <MoreLinkOuter color={color} hover={hover}>
            <ArrowRight />
        </MoreLinkOuter>
    )
}

export default MoreLink
