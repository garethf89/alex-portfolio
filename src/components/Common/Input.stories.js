import React, { useState } from "react"

import Input from "./input"

export const Forms = () => {
    const [password, setPass] = useState("")
    return (
        <div style={{ maxWidth: "600px", margin: "2rem" }}>
            <Input
                value={password}
                onChange={e => setPass(e.target.value)}
                type="password"
                label="Please enter a password"
            />
        </div>
    )
}

export default {
    title: "Common",
    component: Forms,
}
