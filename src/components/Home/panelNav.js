import React from "react"
import ScreenReaderOnly from "../Common/ScreenReaderOnly"
import classNames from "classnames"
import styled from "@emotion/styled"

const PanelListContainer = styled.div`
    position: absolute;
    z-index: 4;
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
    left: 50% !important;
    margin: 0 auto !important;
    top: auto;
    bottom: 1.75rem;
    display: flex;
    justify-content: center;
    transition: all 0.5s;

    @media (min-width: ${props => props.theme.responsive.medium}) {
        bottom: 3.75rem;
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
        margin: -4px 0 0 -4px;
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
                                <ScreenReaderOnly>
                                    Section {active}
                                </ScreenReaderOnly>
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
