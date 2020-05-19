import { Locked } from "../../svgs/Index"
import React from "react"
import shortid from "shortid"
import styled from "@emotion/styled"

const InputContainer = styled.div`
    position: relative;
    margin: 2rem 0 1rem;
    font-family: ${props => props.theme.fonts.body};
    padding-top: 1rem;
    svg {
        position: absolute;
        left: 0;
        bottom: 0.5rem;
        g {
            fill: #000;
        }
    }
`

const LabelStyled = styled.label`
    position: absolute;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    left: 1.5rem;
    bottom: 0.35rem;
    &.valid {
        top: 0;
        left: 0;
        font-size: 12px;
        opacity: 0.5;
    }
`
const InputStyled = styled.input`
    position: relative;
    width: 100%;
    border: none;
    outline: 0;
    background: transparent;
    box-shadow: none;
    border-bottom: 1px solid #000;
    padding-left: 1.5rem;
    line-height: 1.7;
`

const Input = ({ children, type, label, value, onChange }) => {
    const id = shortid.generate(8)
    const valid = value && value.length
    const validClass = valid ? "valid" : ""
    return (
        <InputContainer>
            <Locked />
            <LabelStyled className={validClass} htmlFor={id}>
                {label}
            </LabelStyled>
            <InputStyled
                value={value}
                onChange={e => onChange(e)}
                id={id}
                type={type}
            >
                {children}
            </InputStyled>
        </InputContainer>
    )
}

export default Input
