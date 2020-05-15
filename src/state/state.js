import React, { createContext, useReducer } from "react"

const initialState = { theme: "light" }
export const store = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case "THEME":
            return { ...state, theme: action.theme }
        default:
            return {}
    }
}

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <store.Provider value={{ state, dispatch }}>{children}</store.Provider>
    )
}
