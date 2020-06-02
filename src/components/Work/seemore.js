import React, { useState } from "react"

import Highlight from "../highlight"
import { Link } from "gatsby"
import MoreLink from "../../components/Shared/MoreLink"
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
    }
    @media (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 48px;
    }
`

const SeeMore = ({ wide }) => {
    const [isHover, setHover] = useState(false)

    return (
        <Highlight wide>
            <SeeMoreStyles
                to="/work"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                See More Work <MoreLink color={"dark"} hover={isHover} />
            </SeeMoreStyles>
        </Highlight>
    )
}

export default SeeMore
