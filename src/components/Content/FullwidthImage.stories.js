import Container from "../container"
import { Image } from "./body"
import React from "react"
export const FullWidthImage = () => (
    <Container>
        <Image
            src="https://images.ctfassets.net/qq0ppbojlli0/14W9s7HIp8LIW57vV1ayry/3bf795b6beb5f4df1abe761cbcae6a6c/A_Full.png"
            alt="test"
        ></Image>
    </Container>
)
export default {
    title: "Page Components",
    component: FullWidthImage,
}
