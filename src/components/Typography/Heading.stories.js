import Heading from "./heading"
import React from "react"

export const Headings = () => (
    <div>
        <Heading level="h1">H1</Heading>
        <Heading level="h1" overrride="h2">
            H2 with H1 Styles
        </Heading>
        <Heading level="h2">H2</Heading>
        <Heading level="h3">H3</Heading>
        <Heading level="h4">H4</Heading>
        <Heading level="h5">H5</Heading>
    </div>
)

export default {
    title: "Typography",
    component: Headings,
}
