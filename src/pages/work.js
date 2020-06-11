import React, { useContext, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Container from "../components/container"
import Heading from "../components/Typography/heading"
import Social from "../components/social"
import WorkPanel from "../components/Work/panels"
import { getAllProjects } from "../hooks/get-all-projects"
import { store } from "../state/state"
import styled from "@emotion/styled"

const ContainerWork = styled(Container)`
    padding-bottom: 0;
    margin: 14.13rem auto 7.13rem;
`

const WorkFlex = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
`

const WorkPage = () => {
    // eslint-disable-next-line
    const data = useStaticQuery(graphql`
        query WorkPage {
            page: contentfulWork {
                title
            }
        }
    `)

    const projects = getAllProjects()

    const panels = projects.contentfulWork.projects.map((value, index) => {
        const isDarkBackground = value.theme
        const theme = isDarkBackground === "Dark" ? "dark" : "light"
        const size = index % 3 === 0 ? "large" : "small"

        return (
            <WorkPanel
                key={index}
                color={theme}
                title={value.title}
                image={value.coverImage}
                size={size}
                slug={value.slug}
                locked={value.locked}
            />
        )
    })
    const { dispatch } = useContext(store)

    useEffect(() => {
        dispatch({ type: "THEME", theme: "dark" })
    }, [])
    return (
        <>
            <ContainerWork>
                <Heading level="h1" text="Latest work" />
            </ContainerWork>
            <Container>
                <WorkFlex>{panels}</WorkFlex>
            </Container>
            <Social />
        </>
    )
}

export default WorkPage
