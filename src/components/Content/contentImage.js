import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import styled from "@emotion/styled"

const sizePartial = props =>
    typeof props.size === "small"
        ? css`
              width: 10%;
          `
        : css`
              @media screen and (min-width: 500px) {
                  width: 20%;
              }

              @media screen and (min-width: 800px) {
                  width: 30%;
              }

              @media screen and (min-width: 1100px) {
                  width: 40%;
              }
          `

const ContentImageStyles = styled.img`
    margin-bottom: 3.75rem;
    width: ${props => (props.size === "large" ? "100%" : "auto")};

    @media (min-width: ${props => props.theme.responsive.medium}) {
      ${props =>
          props.size === "small"
              ? `max-width: calc(100% - ${props.theme.sizes.contentMaxWidth});`
              : ""}
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
    const asset = query.allContentfulAsset.edges.filter((a, i) => {
        return node.data.target.sys.contentful_id === a.node.contentful_id
    })
    const assetSrc = asset[0].node[size]
    return (
        <ContentImageStyles
            size={size}
            alt={node.content.value}
            src={assetSrc.src}
        />
    )
}

export default ContentImage
