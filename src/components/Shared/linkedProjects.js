import React, { useContext, useEffect, useState } from "react"

import Container from "../container"
import Heading from "../Typography/heading"
import { Link } from "gatsby"
import { getAllProjects } from "../../hooks/get-all-projects"
import { globals } from "../../state/state"
import { random } from "../../helpers/random"
import styled from "@emotion/styled"

const LinkedProjectsStyle = styled.aside`
    background: ${props => props.theme.colors.secondaryBackground};
    padding: 4.13rem 0 2.6rem;
`

const LinkedProjectsInner = styled.div`
    display: flex;
    margin-top: 3.25rem;
    justify-content: space-between;
`
const LinkedProjectLinkContainer = styled.div`
    display: inline-block;
    width: 49%;
    a {
        text-decoration: none;
        color: inherit;
    }
`
const LinkedProjectLink = styled(Link)`
    padding-top: 56.25%;
    background-color: ${props => props.theme.colors.secondaryBackground};
    background-image: url(${props => props.image});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: inline-block;
    width: 100%;
`

const LinkedProjectLinkHeading = styled(Heading)`
    margin-top: 1.13rem;
`

const LinkedProjects = ({ exclude }) => {
    const [randomProjects, setProjects] = useState(null)
    const { state } = useContext(globals)
    const { webp } = state
    const data = getAllProjects()
    console.log("render")
    useEffect(() => {
        const projects = [...data.contentfulWork.projects]

        const filteredProjects = projects.filter((p, i) => {
            if (exclude && p.id === exclude) {
                return false
            }
            return true
        })

        const randomNumbers = random(filteredProjects.length - 1, 2)
        setProjects([
            filteredProjects[randomNumbers[0] - 1],
            filteredProjects[randomNumbers[1] - 1],
        ])

        return () => {}
    }, [])

    return (
        <LinkedProjectsStyle>
            <Container>
                <Heading level="h2">There's more to see</Heading>
                <LinkedProjectsInner>
                    {randomProjects &&
                        randomProjects.map((project, i) => {
                            return (
                                <LinkedProjectLinkContainer key={i}>
                                    <LinkedProjectLink
                                        image={
                                            webp
                                                ? project.coverImage.fixed
                                                      .srcWebp
                                                : project.coverImage.fixed.src
                                        }
                                        to={`/${project.slug}`}
                                        className=""
                                    ></LinkedProjectLink>
                                    <LinkedProjectLinkHeading level="h3">
                                        <Link
                                            className=""
                                            to={`/${project.slug}`}
                                        >
                                            {project.title}
                                        </Link>
                                    </LinkedProjectLinkHeading>
                                    <p>
                                        <Link
                                            className=""
                                            to={`/${project.slug}`}
                                        >
                                            {project.headline}
                                        </Link>
                                    </p>
                                </LinkedProjectLinkContainer>
                            )
                        })}
                </LinkedProjectsInner>
            </Container>
        </LinkedProjectsStyle>
    )
}

export default LinkedProjects
