import { graphql, navigate } from "gatsby"

import AuthModal from "../components/Auth/authModal"
import BodyContent from "../components/Content/bodyContent"
import Container from "../components/container"
import HeadContent from "../components/Content/headContent"
import HeadHeading from "../components/Content/headHeading"
import LinkedProjects from "../components/Shared/linkedProjects"
import Panel from "../components/Home/panel"
import PanelContainer from "../components/panelContainer"
import React from "react"
import Social from "../components/social"
import VideoBackground from "../components/Media/video"
import { isAuth } from "../helpers/auth"

const ProjectTemplate = ({ data }) => {
    const {
        id,
        title,
        coverImage,
        darkBackground,
        coverVideo,
        headline,
        body,
        agency,
        locked,
        slug,
    } = data.page

    const bodyjson = body.json
    const hasVideo = coverVideo.file.contentType.includes("video")

    if (locked && !isAuth()) {
        return (
            <AuthModal
                target={`/${slug}`}
                isOpen
                onClose={() => navigate("/work")}
            />
        )
    }

    const transitionedFromHome = document.getElementById("home-container")

    return (
        <>
            <PanelContainer
                contentPage
                backgroundColor="#000"
                darkBackground={darkBackground}
                showTransition={transitionedFromHome}
            >
                <Panel>
                    <VideoBackground
                        src={coverVideo.file.url}
                        type={coverVideo.file.contentType}
                        poster=""
                        autoPlay
                    />
                </Panel>
            </PanelContainer>
            <Container>
                <HeadHeading subtext={title} headline={headline} />
                <HeadContent body={bodyjson} agency={agency} />
                <BodyContent body={bodyjson} />
            </Container>
            <LinkedProjects exclude={id} />
            <Social />
        </>
    )
}

export const query = graphql`
    query($id: String!) {
        page: contentfulProject(id: { eq: $id }) {
            id
            metaDescription {
                metaDescription
                internal {
                    content
                }
            }
            headline
            title
            darkBackground
            locked
            slug
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
