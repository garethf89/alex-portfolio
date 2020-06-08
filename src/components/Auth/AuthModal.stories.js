import AuthModal from "./authModal"
import React from "react"

export const AuththenticationModal = () => <AuthModal target={`/`} isOpen />

export default {
    title: "Authentication",
    component: AuththenticationModal,
}
