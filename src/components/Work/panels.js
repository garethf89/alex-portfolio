import React, { useState } from "react"

import AuthModal from "../Auth/authModal"
import Heading from "../Typography/heading"
import { Link } from "gatsby"
import { Locked } from "../../svgs/Index"
import { gatsbyWindow } from "../../helpers/gatsbyWindow"
import { isAuth } from "../../helpers/auth"
import styled from "@emotion/styled"
import { supportsWebP } from "../../helpers/support/webp"

const WorkPanelStyled = styled(Link)`
    padding-top: 55%;
    width: 100%;
    color: ${props => (props.color === "dark" ? "#000" : "#fff")};
    overflow: hidden;
    margin-bottom: 3.75rem;
    text-decoration: none;
    cursor: ${props => (props.disabled ? "disabled" : "pointer")};
    pointer-events: ${props => (props.disabled ? "none" : "auto")};
    transition: all 0.5s ease-in-out;
    display: block;
    position: relative;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        padding-top: ${props => (props.size === "large" ? "55%" : "22%")};
        width: ${props => (props.size === "large" ? "100%" : "47%")};
    }

    &:hover {
        .w-panel-bg {
            transform: scale(1.1);
        }
    }
`

const Background = styled.div`
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 0.5s ease-in-out;
    transform: scale(1);
    z-index: -1;
`

const Content = styled.div`
    margin: 1.88rem 3.75rem;
`

const LockContainer = styled.div`
    color: ${props => (props.color === "dark" ? "#000" : "#fff")};
    font-size: 0.75rem;
    margin-bottom: 0.75rem;
    svg,
    span {
        vertical-align: middle;
        display: inline-block;
    }
    svg {
        width: 1.25rem;
        height: 1.5rem;
        margin-right: 0.25rem;
        g {
            fill: ${props => (props.color === "dark" ? "#000" : "#fff")};
        }
    }
`

const WorkPanel = ({ size, title, image, color, slug, locked }) => {
    const [modalOpen, setModal] = useState(false)

    const auth = gatsbyWindow() ? isAuth() : false
    const showLocked = !auth && locked

    const webp = supportsWebP()
    const imageSrc = webp ? image.resolutions.srcWebp : image.file.url

    const clickLink = e => {
        if (showLocked) {
            e.preventDefault()
            setModal(true)
            return false
        } else {
            return true
        }
    }

    const closeModal = e => {
        e.stopPropagation()
        setModal(false)
    }

    return (
        <WorkPanelStyled
            to={`/${slug}`}
            size={size}
            color={color}
            onClick={clickLink}
            disabled={showLocked && modalOpen}
        >
            <Background className="w-panel-bg" image={imageSrc} />
            <Content>
                {showLocked && (
                    <>
                        <LockContainer color={color}>
                            <Locked />
                            <span>Locked</span>
                        </LockContainer>
                        <AuthModal
                            target={`/${slug}`}
                            isOpen={modalOpen}
                            onClose={closeModal}
                        />
                    </>
                )}
                <Heading level="h2">{title}</Heading>
            </Content>
        </WorkPanelStyled>
    )
}

export default WorkPanel
