import Container from "../components/container"
import Layout from "../components/layout"
import React from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const ProjectTemplate = ({ data }) => {
    const { title, coverImage, metaDescription } = data.contentfulProject
    return (
        <Layout>
            <SEO
                title={title}
                description={
                    metaDescription ? metaDescription.internal.content : null
                }
                image={coverImage}
            />
            <Container>Content Here</Container>
        </Layout>
    )
}

export const query = graphql`
    query($id: String!) {
        contentfulProject(id: { eq: $id }) {
            id
            metaDescription {
                metaDescription
                internal {
                    content
                }
            }
            headline {
                internal {
                    content
                }
            }
            title
            coverImage {
                file {
                    url
                    fileName
                    contentType
                }
            }
        }
    }
`

export default ProjectTemplate
