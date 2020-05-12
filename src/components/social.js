import { Email, Facebook, Instagram, Linkedin } from "../svgs/Index"

import Heading from "../components/Typography/heading"
import Highlight from "../components/highlight"
import Mixins from "../styles/mixins"
import React from "react"
import styled from "@emotion/styled"

const SocialStyles = styled(Heading)`
    font-size: 36px;
    line-height: 1.2;
    margin: 0;
    display: inline-block;
    text-decoration: none;
    color: inherit;
    font-weight: 200;
    position: relative;
    margin-bottom: 2rem;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        margin-bottom: 0;
        font-size: 48px;
    }
`

const SocialList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
        padding: 0;
        margin-left: 1.5rem;
        display: inline-block;
        &:first-of-type {
            margin-left: 0;
        }
    }
    a {
        display: inline-block;
        transition: all 0.5s;
        opacity: 1;
        &:hover {
            opacity: 0.8;
        }
    }
    span {
        /* stylelint-disable */
        ${Mixins.hide()}
        display: inline-block;
        height: 0;
        width: 0;
    }
    svg {
        height: 3.5rem;
        width: 3.5rem;
    }
`

const Social = () => {
    return (
        <Highlight>
            <SocialStyles level="h3" text="Let's Chat" />
            <SocialList>
                <li>
                    <a href="mailto:">
                        <span>Email</span>
                        <Email />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <span>Facebook</span>
                        <Facebook />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <span>Linkedin</span>
                        <Linkedin />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <span>Instagram</span>
                        <Instagram />
                    </a>
                </li>
            </SocialList>
        </Highlight>
    )
}

export default Social
