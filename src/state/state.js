import React, { createContext, useReducer } from "react"

const initialStateTheme = { theme: "dark" }
const initialStateGlobals = { webp: true, nav: false }
export const store = createContext()
export const globals = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case "THEME":
            return { ...state, theme: action.theme }
        case "WEBP":
            return { ...state, webp: action.webp }
        case "NAV":
            return { ...state, nav: action.nav }
        default:
            return {}
    }
}

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStateTheme)
    return (
        <store.Provider value={{ state, dispatch }}>{children}</store.Provider>
    )
}

export const GlobalsStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialStateGlobals)
    return (
        <globals.Provider value={{ state, dispatch }}>
            {children}
        </globals.Provider>
    )
}
