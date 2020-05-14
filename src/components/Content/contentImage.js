import React, { useMemo, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import styled from "@emotion/styled"
import { supportsWebP } from "../../helpers/support/webp"

const ContentImageStyles = styled.img`
    margin-bottom: 3.75rem;
    width: ${props => (props.size === "large" ? "100%" : "auto")};

    @media (min-width: ${props => props.theme.responsive.medium}) {
        ${props =>
            props.size === "small"
                ? `max-width: calc(100% - ${props.theme.sizes.contentMaxWidth});`
                : ""}
    }
`

const ContentImage = ({ node, size }) => {
    const query = useStaticQuery(graphql`
        query AssetQuery {
            allContentfulAsset {
                edges {
                    node {
                        small: sizes(maxWidth: 200, quality: 100) {
                            srcWebp
                            src
                        }
                        large: sizes(maxWidth: 1200, quality: 100) {
                            srcWebp
                            src
                        }
                        contentful_id
                    }
                }
            }
        }
    `)
    const asset = useMemo(
        () =>
            query.allContentfulAsset.edges.filter((a, i) => {
                return (
                    node.data.target.sys.contentful_id === a.node.contentful_id
                )
            }),
        []
    )
    const [haveWebP, setWebP] = useState(true)
    const assetSrc = haveWebP
        ? asset[0].node[size].srcWebp
        : asset[0].node[size].src

    supportsWebP(res => {
        if (!res) {
            setWebP(false)
        }
    })
    return (
        <ContentImageStyles
            size={size}
            alt={node.content.value}
            src={assetSrc}
        />
    )
}

export default ContentImage
