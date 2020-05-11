import ArrowRight from "../../svgs/arrowRight"
import Highlight from "../highlight"
import { Link } from "gatsby"
import React from "react"
import styled from "@emotion/styled"

const SeeMoreStyles = styled(Link)`
    font-size: 36px;
    line-height: 1.2;
    margin: 0;
    display: inline-block;
    text-decoration: none;
    color: inherit;
    font-weight: 200;
    position: relative;
    transition: all 0.5s;
    opacity: 1;
    &:hover {
        opacity: 0.8;
        svg {
            right: -6rem;
        }
    }
    @media (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 48px;
    }
`

const SeeMoreArrow = styled(ArrowRight)`
    margin-left: 1rem;
    height: 1rem;
    width: 2.25rem;
    display: inline-block;
    vertical-align: middle;

    @media (min-width: ${props => props.theme.responsive.medium}) {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: all 0.5s;
        right: -5.75rem;
        height: 2rem;
        width: 4.75rem;
    }
`

const SeeMore = () => {
    return (
        <Highlight>
            <SeeMoreStyles to="/work">
                See More Work <SeeMoreArrow />
            </SeeMoreStyles>
        </Highlight>
    )
}

export default SeeMore
