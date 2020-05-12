import { BLOCKS, MARKS } from "@contentful/rich-text-types"

import Heading from "../Typography/heading"
import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styled from "@emotion/styled"

const StyledParagraph = styled.p`
    font-size: 1.13rem;
    line-height: 1.6;
    font-weight: 200;
`

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <StyledParagraph>{children}</StyledParagraph>

const options = {
    renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
        [BLOCKS.HEADING_1]: (node, children) => (
            <Heading level="h1">{children}</Heading>
        ),
        [BLOCKS.HEADING_2]: (node, children) => (
            <Heading level="h2">{children}</Heading>
        ),
        [BLOCKS.HEADING_3]: (node, children) => (
            <Heading level="h3">{children}</Heading>
        ),
        [BLOCKS.HEADING_4]: (node, children) => (
            <Heading level="h4">{children}</Heading>
        ),
        [BLOCKS.HEADING_5]: (node, children) => (
            <Heading level="h5">{children}</Heading>
        ),
    },
}

const BodyText = ({ text }) => documentToReactComponents(text, options)

const Body = ({ text, className, heading }) => {
    const textObject = { ...text }
    const textToUse = useHeading => {
        if (useHeading) {
            textObject.content = Object.values(textObject.content).filter(
                (obj, i) => {
                    return i === 0 ? obj : false
                }
            )
        } else {
            textObject.content = Object.values(textObject.content).filter(
                (obj, i) => {
                    console.log(i !== 0)
                    return i !== 0 ? obj : false
                }
            )
        }
        return textObject
    }
    const outputText = textToUse(heading)
    return <BodyText className={className} text={outputText} />
}

export default Body
