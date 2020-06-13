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
import { gatsbyWindow } from "../helpers/gatsbyWindow"
import { isAuth } from "../helpers/auth"

const ProjectTemplate = ({ data }) => {
    const {
        id,
        title,
        theme,
        coverVideo,
        coverImage,
        headline,
        agency,
        locked,
        slug,
        pageContent,
    } = data.page

    const auth = gatsbyWindow() ? isAuth() : false

    if (locked && !auth) {
        return (
            <AuthModal
                target={`/${slug}`}
                isOpen
                onClose={() => navigate("/work")}
            />
        )
    }

    const transitionedFromHome = gatsbyWindow()
        ? document.getElementById("home-container")
        : false

    const isDark = theme === "Dark"

    return (
        <>
            <PanelContainer
                contentPage
                backgroundColor="#000"
                darkBackground={isDark}
                showTransition={transitionedFromHome}
            >
                <Panel>
                    <VideoBackground
                        fallback={coverImage.resolutions}
                        showVideo
                        src={coverVideo.file.url}
                        type={coverVideo.file.contentType}
                        poster=""
                        autoPlay
                    />
                </Panel>
            </PanelContainer>
            <Container>
                <HeadHeading subtext={title} headline={headline} />
                <HeadContent body={pageContent} agency={agency} />
                <BodyContent body={pageContent} />
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
            headline
            title
            theme
            locked
            slug
            pageContent {
                ... on ContentfulPageContentVideo {
                    id
                    autoplay
                    video {
                        file {
                            url
                        }
                        fixed {
                            srcWebp
                            src
                        }
                    }
                    internal {
                        type
                    }
                }
                ... on ContentfulPageContentTextContent {
                    body {
                        json
                    }
                    internal {
                        type
                    }
                }
                ... on ContentfulPageContentFullWidthImage {
                    image {
                        title
                        description
                        file {
                            url
                        }
                        fixed(quality: 100, width: 2400) {
                            srcWebp
                            src
                        }
                    }
                    internal {
                        type
                    }
                }
                ... on ContentfulPageContentHalfWidthImages {
                    secondImage {
                        title
                        description
                        file {
                            url
                        }
                        fixed(quality: 100, width: 2400) {
                            srcWebp
                            src
                        }
                    }
                    firstImage {
                        title
                        description
                        file {
                            url
                        }
                        fixed(quality: 100, width: 2400) {
                            srcWebp
                            src
                        }
                    }
                    internal {
                        type
                    }
                }
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
                    src
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
