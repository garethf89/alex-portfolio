import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import React, { useEffect, useState } from "react"

import ContentImage from "../Content/contentImage"
import ContentImageGroup from "../Content/contentImageGroup"
import Heading from "../Typography/heading"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { pairwise } from "../../helpers/pairwise"
import styled from "@emotion/styled"

const StyledParagraph = styled.p`
    font-size: 1.13rem;
    line-height: 1.6;
    font-weight: 200;
    max-width: ${props => props.theme.sizes.contentMaxWidth};
`

const StyledParagraphImage = styled.p`
    font-size: 1.13rem;
    line-height: 1.6;
    font-weight: 200;
    position: relative;
    span {
        display: inline-block;
        max-width: ${props => props.theme.sizes.contentMaxWidth};
    }
    img {
        display: none;
    }
    @media (min-width: ${props => props.theme.responsive.medium}) {
        img {
            display: inline-block;
            position: absolute;
            right: 0;
        }
    }
`

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <StyledParagraph>{children}</StyledParagraph>
const TextImage = ({ children }) => (
    <StyledParagraphImage>{children}</StyledParagraphImage>
)

const options = {
    renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => {
            const images = Object.values(children).filter(element => {
                return element.type && element.type.name === "ContentImage"
            })
            const hasImage = images.length
            if (!hasImage) {
                if (!children[0].length) {
                    return ""
                }
                return <Text>{children}</Text>
            }
            const text = Object.values(children).filter(element => {
                return !element.type
            })
            return (
                <TextImage>
                    <span>{text}</span>
                    {images}
                </TextImage>
            )
        },
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
        [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
            return <ContentImage node={node} size="large" />
        },
        "embedded-asset-block-group": (node, children) => {
            return <ContentImageGroup node={node} size="large" />
        },
        [INLINES.ASSET_HYPERLINK]: (node, children) => {
            return <ContentImage node={node} size="small" />
        },
    },
}

const BodyText = ({ text }) => documentToReactComponents(text, options)

const Body = ({ text, className, include, exclude }) => {
    const [textObjectToUse, setText] = useState(null)

    const textToUse = (t, includes, excludes) => {
        //One paragraph for heading only
        if (includes || includes === 0) {
            t.content = Object.values(t.content).filter((obj, i) => {
                return i === includes ? obj : false
            })
        } else if (excludes || excludes === 0) {
            // All other objects
            t.content = Object.values(t.content).filter((obj, i) => {
                return i !== exclude ? obj : false
            })
        }
        return t
    }

    useEffect(() => {
        const textObject = { ...text }

        // group together adjacent images
        if (textObject.content.length) {
            const grouped = []
            pairwise(textObject.content, function (current, next) {
                if (
                    current.nodeType === BLOCKS.EMBEDDED_ASSET &&
                    next.nodeType === BLOCKS.EMBEDDED_ASSET
                ) {
                    grouped.push({
                        nodeType: "embedded-asset-block-group",
                        content: [],
                        data: [current, next],
                    })
                    next.remove = true
                }
            })

            if (grouped.length) {
                grouped.map((el, i) => {
                    const t = { ...el }
                    textObject.content = { ...textObject.content, t }
                })
            }
        }

        // remove empties
        textObject.content = Object.values(textObject.content).filter(
            (obj, i) => {
                if (obj.remove) {
                    return false
                }
                if (obj.nodeType !== "paragraph") {
                    return true
                }
                return obj.content[0].value.length ? true : false
            }
        )

        setText(textObject)
        return function cleanup() {}
    }, [])

    if (textObjectToUse) {
        const outputText = textToUse(textObjectToUse, include, exclude)
        return <BodyText className={className} text={outputText} />
    }
    return <h1>NO</h1>
}

export default Body
