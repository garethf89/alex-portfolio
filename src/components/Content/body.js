import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import React, { useEffect, useState } from "react"

import ContentImage from "../Content/contentImage"
import Heading from "../Typography/heading"
import Video from "./video"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styled from "@emotion/styled"
import { supportsWebP } from "../../helpers/support/webp"

const StyledParagraph = styled.p`
    font-size: 1.13rem;
    line-height: 1.6;
    font-weight: 200;
    max-width: ${props => props.theme.sizes.contentMaxWidth};
`

export const Image = styled.img`
    max-width: 100%;
`

export const StyledHalfImage = styled.div`
    display: block;
    margin: 3rem 0;
    @media (min-width: ${props => props.theme.responsive.medium}) {
        img {
            width: 50%;
            height: auto;
            &:first-of-type {
                margin-bottom: 0;
            }
        }
    }
`

const StyledParagraphImage = styled.div`
    max-width: calc(100% - ${props => props.theme.sizes.contentMaxWidth});
    flex-basis: calc(100% - ${props => props.theme.sizes.contentMaxWidth});
    height: 1px;
    overflow-y: visible;
    text-align: center;
    img {
        display: none;
        height: auto;
    }
    @media (min-width: 900px) {
        img {
            display: inline-block;
            flex-shrink: 1;
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
            return <Text>{children}</Text>
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
            if (node.data.target.sys.type === "Link") {
                return
            }
            const file = node.data.target.fields.file["en-GB"]
            const video = file.contentType.includes("video")
            if (video) {
                return <Video src={file.url} contentType={file.contentType} />
            }
            const url = supportsWebP() ? file.url + "?&fm=webp" : file.url
            return (
                <TextImage>
                    <img
                        src={url}
                        alt={node.data.target.fields.title["en-GB"]}
                    />
                </TextImage>
            )
        },
        [INLINES.ASSET_HYPERLINK]: (node, children) => {
            return <ContentImage node={node} size="small" />
        },
    },
}

export const BodyText = ({ text }) => documentToReactComponents(text, options)

const Body = ({ text, className, include, exclude }) => {
    const [textObjectToUse, setText] = useState(null)

    const textToUse = (t, includes, excludes) => {
        //One paragraph for heading only
        if (includes || includes === 0) {
            t = t.filter((e, i) => {
                if (i > includes) {
                    return false
                }
                return true
            })
        } else if (excludes || excludes === 0) {
            t = t.filter((e, i) => {
                if (i <= excludes) {
                    return false
                }
                return true
            })
        }
        return t
    }

    useEffect(() => {
        const textObject = { ...text }

        // remove empties
        const noEmpty = Object.values(textObject).map((obj, i) => {
            if (obj.remove) {
                return false
            }
            if (obj.__typename === "ContentfulPageContentTextContent") {
                obj.body.json.content = obj.body.json.content.filter((e, i) => {
                    if (
                        e.nodeType === "paragraph" &&
                        e.content[0].value.length < 1
                    ) {
                        return false
                    }
                    return e
                })
            }
            return obj
        })

        setText(noEmpty)
        return function cleanup() {}
    }, [])

    if (!textObjectToUse) {
        return ""
    }

    const outputText = textToUse(textObjectToUse, include, exclude)
    const content = []
    const webP = supportsWebP()

    Object.values({ ...outputText }).filter((element, i) => {
        const type = element.internal.type
        if (type === "ContentfulPageContentTextContent") {
            content.push(
                <BodyText
                    key={i}
                    className={className}
                    text={element.body.json}
                />
            )
        }
        if (type === "ContentfulPageContentVideo") {
            const file = element.video.file
            content.push(
                <Video
                    key={i}
                    autoplay={element.autoplay}
                    src={file.url}
                    contentType={file.contentType}
                />
            )
        }
        if (type === "ContentfulPageContentFullWidthImage") {
            content.push(
                <Image
                    className="body-block"
                    key={i}
                    src={
                        webP
                            ? element.image[0].fixed.srcWebp
                            : element.image[0].fixed.src
                    }
                    alt={element.image[0].title}
                ></Image>
            )
        }
        if (type === "ContentfulPageContentHalfWidthImages") {
            content.push(
                <StyledHalfImage
                    key={i}
                    className="body-block half-width-images"
                >
                    <Image
                        src={
                            webP
                                ? element.firstImage.fixed.srcWebp
                                : element.firstImage.fixed.src
                        }
                        alt={element.firstImage.title}
                    ></Image>
                    <Image
                        src={
                            webP
                                ? element.secondImage.fixed.srcWebp
                                : element.secondImage.fixed.src
                        }
                        alt={element.secondImage.title}
                    ></Image>
                </StyledHalfImage>
            )
        }
        return true
    })

    return content
}

export default Body
