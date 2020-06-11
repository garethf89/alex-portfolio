import React, { useEffect, useState } from "react"
import { disableScroll, enableScroll } from "../../helpers/scroll"
import { graphql, navigate, useStaticQuery } from "gatsby"

import Button from "../Common/button"
import Heading from "../Typography/heading"
import Input from "../Common/input"
import Modal from "react-modal"
import { setAuth } from "../../helpers/auth"
import styled from "@emotion/styled"

const styles = {
    content: {
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        bottom: "auto",
        right: "auto",
        padding: "3rem",
        maxWidth: "600px",
        width: "100%",
    },
    overlay: {
        zIndex: "9999",
    },
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0 0;
    > button {
        flex-grow: 1;
        &:first-of-type {
            margin-right: 1rem;
        }
    }
`

const AuthModal = ({ isOpen, onClose, target = "/" }) => {
    const query = useStaticQuery(graphql`
        query {
            contentfulPassword {
                password
            }
        }
    `)

    const [open, setOpen] = useState(isOpen)
    const [password, setPass] = useState("")

    const afterClose = () => {
        enableScroll()
    }

    const afterOpen = () => {
        disableScroll()
    }

    const submit = e => {
        e.preventDefault()
        if (query.contentfulPassword.password === password) {
            setAuth()
            navigate(target)
        }
        return false
    }

    const closeModal = e => {
        e.preventDefault()
        onClose(e)
        return false
    }

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    return (
        <Modal
            isOpen={open}
            onAfterOpen={() => afterOpen()}
            onAfterClose={() => afterClose()}
            contentLabel="This is page is password protected, please enter password"
            style={styles}
            ariaHideApp={false}
        >
            <Heading level="h3">This page is password protected</Heading>
            <form onSubmit={submit}>
                <Input
                    value={password}
                    onChange={e => setPass(e.target.value)}
                    type="password"
                    label="Please enter a password"
                />
                <ButtonContainer>
                    <Button click={e => closeModal(e)} color="light">
                        Close
                    </Button>

                    <Button
                        click={e => e.stopPropagation()}
                        type="submit"
                        color="dark"
                    >
                        Submit
                    </Button>
                </ButtonContainer>
            </form>
        </Modal>
    )
}

export default AuthModal
