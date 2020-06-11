import React from "react"
import styled from "@emotion/styled"
import theme from "../../gatsby-plugin-theme-ui/index"

const ButtonStyled = styled.button`
    text-decoration: none;
    border: 1px solid ${props => props.colors.border};
    background: ${props => props.colors.background};
    position: relative;
    color: ${props => props.colors.color};
    padding: 1.25rem 1.25rem;
    overflow: hidden;
    width: auto;
    font-family: ${props => props.theme.fonts.body};

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            120deg,
            transparent,
            ${props => props.colors.before},
            transparent
        );
        transition: all 650ms;
    }

    &:hover {
        cursor: pointer;
        &:before {
            left: 100%;
        }
    }
`

const Button = ({ children, type = "button", color, click }) => {
    const colorTheme = color ? theme.button[color] : theme.button.dark

    return (
        <ButtonStyled
            onClick={click ? e => click(e) : null}
            type={type}
            colors={colorTheme}
        >
            {children}
        </ButtonStyled>
    )
}

export default Button
