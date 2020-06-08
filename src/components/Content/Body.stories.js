const example = {
    __typename: "ContentfulPageContentTextContent",
    body: {
        json: {
            nodeType: "document",
            data: {},
            content: [
                {
                    nodeType: "paragraph",
                    content: [
                        {
                            nodeType: "text",
                            value:
                                "We made a digital experience that connects businesses and talent in a fast-changing world. The dynamic website design caters for a multinational recruitment firm specialising in Engineering, IT and Life sciences.",
                            marks: [],
                            data: {},
                        },
                    ],
                    data: {},
                },
                {
                    nodeType: "paragraph",
                    content: [
                        {
                            nodeType: "text",
                            value:
                                "The Modis brand consists of a network and path motif, designed to represent connecting talent with employers. Inspired by the brand, we established a library of angled shapes used to hold images and act as background panels. This enabled us to create interesting, energetic and appealing page designs, that both helps lead the eye and reflected the essence the brand.",
                            marks: [],
                            data: {},
                        },
                    ],
                    data: {},
                },
            ],
        },
    },
    internal: {
        type: "ContentfulPageContentTextContent",
    },
}

import { BodyText } from "./body"
import React from "react"
export const TextContent = () => (
    <div style={{ margin: "2rem" }}>
        <BodyText className="" text={example.body.json} />
    </div>
)
export default {
    title: "Page Components",
    component: TextContent,
}
