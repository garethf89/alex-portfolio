import { Image, StyledHalfImage } from "./body"

import Container from "../container"
import React from "react"

export const HalfWidthImages = () => (
    <Container>
        <StyledHalfImage>
            <Image
                src="https://images.ctfassets.net/qq0ppbojlli0/2OmG2G3pSNKMapHcjkJYtQ/adf79f0b0694e7f09e354c706bd6b2cb/A_Left_2.png?w=2400&q=100&fm=webp"
                alt="test"
            ></Image>
            <Image
                src="https://images.ctfassets.net/qq0ppbojlli0/7mlcvKmr5hNNx0tKBxHIEQ/e4bc2fa12250d74f8f3deddb4fe4b3cb/A_Right.png?w=2400&q=100"
                alt="test"
            ></Image>
        </StyledHalfImage>
    </Container>
)
export default {
    title: "Page Components",
    component: HalfWidthImages,
}
