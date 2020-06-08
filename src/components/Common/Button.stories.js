import Button from "./button"
import React from "react"

export const Buttons = () => (
    <div>
        <Button click={e => alert("CLICKED")} type="submit" color="dark">
            Submit
        </Button>
        <div style={{ marginTop: "2rem" }}>
            <Button click={e => alert("CLICKED")} type="submit" color="light">
                Submit
            </Button>
        </div>
    </div>
)

export default {
    title: "Common",
    component: Buttons,
}
