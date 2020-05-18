import { GlobalsStateProvider, StateProvider } from "./src/state/state"

import React from "react"

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
    return (
        <StateProvider>
            <GlobalsStateProvider>{element}</GlobalsStateProvider>
        </StateProvider>
    )
}
