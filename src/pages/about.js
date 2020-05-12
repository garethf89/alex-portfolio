import { graphql, useStaticQuery } from "gatsby"

import Container from "../components/container"
import HeadContent from "../components/Content/headContent"
import HeadHeading from "../components/Content/headHeading"
import Layout from "../components/layout"
import Panel from "../components/Home/panel"
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
            contentfulAboutPage {
                headline
                title
                body {
                    json
                }
                coverImage {
                    file {
                        url
                        contentType
                    }
                }
            }
        }
    `)
    const AboutData = data.contentfulAboutPage
    return (
        <Layout logoColor="light" title="About me">
            <Panel contentPage key="home" theme="light" backgroundColor="#000">
                <VideoBackground
                    src={AboutData.coverImage.file.url}
                    type={AboutData.coverImage.file.contentType}
                    poster=""
                    autoPlay
                />
            </Panel>
            <Container>
                <HeadHeading
                    subtext={data.contentfulAboutPage.title}
                    headline={data.contentfulAboutPage.headline}
                />
                <HeadContent body={data.contentfulAboutPage.body.json} />
            </Container>
            <Social />
        </Layout>
    )
}

export default AboutPage
