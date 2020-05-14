import BodyContent from "../components/Content/bodyContent"
import Container from "../components/container"
import HeadContent from "../components/Content/headContent"
import HeadHeading from "../components/Content/headHeading"
import Layout from "../components/layout"
import Panel from "../components/Home/panel"
import React from "react"
import Social from "../components/social"
import VideoBackground from "../components/Media/video"
import { graphql } from "gatsby"

const ProjectTemplate = ({ data }) => {
    const {
        title,
        coverImage,
        coverVideo,
        headline,
        body,
        agency,
    } = data.contentfulProject
    const bodyjson = body.json

    const hasVideo = coverVideo.file.contentType.includes("video")

    return (
        <Layout logoColor="light" title="About me">
            <Panel contentPage theme="light" backgroundColor="#000">
                <VideoBackground
                    src={coverVideo.file.url}
                    type={coverVideo.file.contentType}
                    poster=""
                    autoPlay
                />
            </Panel>
            <Container>
                <HeadHeading subtext={title} headline={headline} />
                <HeadContent body={bodyjson} agency={agency} />
                <BodyContent body={bodyjson} />
            </Container>
            <Social />
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
            headline
            title
            body {
                json
            }
            agency {
                url
                title
            }
            coverVideo {
                file {
                    url
                    fileName
                    contentType
                }
            }
            coverImage {
                file {
                    url
                    fileName
                    contentType
                }
                title
                resolutions(width: 2400) {
                    srcWebp
                }
                fixed(width: 1400) {
                    src
                    srcWebp
                }
            }
        }
    }
`

export default ProjectTemplate
