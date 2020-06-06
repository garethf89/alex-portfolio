import { graphql, useStaticQuery } from "gatsby"

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

const AboutPage = () => {
    const data = useStaticQuery(graphql`
        query About {
            site {
                siteMetadata {
                    title
                }
            }
            page: contentfulAboutPage {
                headline
                title
                pageContent {
                    ... on ContentfulPageContentTextContent {
                        body {
                            json
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
                    }
                }
                coverVideo {
                    file {
                        url
                        contentType
                    }
                }
            }
        }
    `)
    const AboutData = data.page

    return (
        <>
            <PanelContainer contentPage backgroundColor="#000">
                <Panel>
                    <VideoBackground
                        src={AboutData.coverVideo.file.url}
                        type={AboutData.coverVideo.file.contentType}
                        poster=""
                        autoPlay
                    />
                </Panel>
            </PanelContainer>
            <Container>
                <HeadHeading
                    subtext={data.page.title}
                    headline={data.page.headline}
                />
                <HeadContent body={data.page.pageContent} />
                <BodyContent body={data.page.pageContent} />
            </Container>
            <LinkedProjects />

            <Social />
        </>
    )
}

export default AboutPage
