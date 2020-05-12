import { graphql, useStaticQuery } from "gatsby"

import Container from "../components/container"
import Heading from "../components/Typography/heading"
import Layout from "../components/layout"
import React from "react"
import Social from "../components/social"
import WorkPanel from "../components/Work/panels"
import styled from "@emotion/styled"

const ContainerWork = styled(Container)`
    padding-bottom: 0;
    margin: 14.13rem 0 7.13rem;
`

const WorkFlex = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
`

const WorkPage = () => {
    const data = useStaticQuery(graphql`
        query WorkProjects {
            contentfulWork {
                projects {
                    id
                    title
                    slug
                    darkBackground
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
                        resolutions(quality: 100, width: 2400) {
                            srcWebp
                        }
                        fixed(width: 1200) {
                            src
                            srcWebp
                        }
                    }
                }
            }
        }
    `)

    const panels = data.contentfulWork.projects.map((value, index) => {
        const video = value.coverVideo.file.contentType.includes("video")

        const isDarkBackground = value.darkBackground
        const theme = isDarkBackground ? "light" : "dark"

        const size = index % 3 === 0 ? "large" : "small"

        return (
            <WorkPanel
                key={index}
                color={theme}
                title={value.title}
                image={value.coverImage}
                size={size}
                slug={value.slug}
            />
        )
    })

    return (
        <Layout title="Work">
            <ContainerWork>
                <Heading level="h1" text="Latest work" />
            </ContainerWork>
            <Container wide>
                <WorkFlex>{panels}</WorkFlex>
            </Container>
            <Social />
        </Layout>
    )
}

export default WorkPage
