import React from "react"
import classNames from "classnames"
import styled from "@emotion/styled"

const PanelListContainer = styled.div`
    position: absolute;
    z-index: 4;
    opacity: 1;
    transform: translate3d(0, 0, 0);
    left: 0 !important;
    right: 0;
    margin: 0 auto !important;
    top: auto;
    bottom: 1.75rem;
    display: flex;
    justify-content: center;
    transition: all 0.5s;

    @media (min-width: ${props => props.theme.responsive.medium}) {
        bottom: 3.75rem;
    }
    /*Only display content to screen readers*/
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`

const PanelUL = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    .hidden {
        display: none;
    }
`

const PanelItem = styled.li`
    display: inline-block;
    width: 14px;
    height: 13px;
    margin: 7px;
    position: relative;
`

const PanelLink = styled.a`
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
    text-decoration: none;
    opacity: 0.5;

    span {
        background: #fff;
        transition: all 1s;
    }

    &.active {
        opacity: 1;
    }

    &.dark span {
        background: #000;
    }

    span {
        border-radius: 50%;
        position: absolute;
        z-index: 1;
        border: 0;
        background: #333;
        left: 50%;
        top: 50%;
        margin: -2px 0 0 -2px;
        transition: all 0.1s ease-in-out;
        height: 8px;
        width: 8px;
    }
`

const PanelNav = ({ change, data, isDark, active }) => {
    return (
        <PanelListContainer className="fp-navcustom">
            <PanelUL>
                {data.map((p, i) => {
                    let classStyle = classNames({
                        dark: !isDark,
                        active: i === active,
                    })
                    return (
                        <PanelItem key={i}>
                            <PanelLink
                                onClick={e => {
                                    e.preventDefault()
                                    change(i + 1)
                                }}
                                href="#"
                                className={classStyle}
                            >
                                <span className="sr-only">
                                    Section {active}
                                </span>
                                <span></span>
                            </PanelLink>
                        </PanelItem>
                    )
                })}
            </PanelUL>
        </PanelListContainer>
    )
}

export default PanelNav
