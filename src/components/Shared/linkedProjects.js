import React, { useEffect, useState } from "react"

import Container from "../container"
import Heading from "../Typography/heading"
import { Link } from "gatsby"
import { getAllProjects } from "../../hooks/get-all-projects"
import { isAuth } from "../../helpers/auth"
import { random } from "../../helpers/random"
import styled from "@emotion/styled"
import { supportsWebP } from "../../helpers/support/webp"

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
    &:hover {
        a span {
            transform: scale(1.1);
        }
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
    position: relative;
    overflow: hidden;
`
const LinkedProjectLinkBG = styled.span`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.secondaryBackground};
    background-image: url(${props => props.image});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    transition: all 0.5s ease-in-out;
`

const LinkedProjectLinkHeading = styled(Heading)`
    margin-top: 1.13rem;
`

const LinkedProjects = ({ exclude }) => {
    const [randomProjects, setProjects] = useState(null)

    const data = getAllProjects()
    const webp = supportsWebP()

    useEffect(() => {
        const projects = [...data.contentfulWork.projects]

        const filteredProjects = projects.filter((p, i) => {
            if (exclude && p.id === exclude) {
                return false
            }
            if (p.locked && !isAuth()) {
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
                <Heading override="h2" level="h1">
                    There's more to see
                </Heading>
                <LinkedProjectsInner>
                    {randomProjects &&
                        randomProjects.map((project, i) => {
                            return (
                                <LinkedProjectLinkContainer key={i}>
                                    <LinkedProjectLink
                                        to={`/${project.slug}`}
                                        className=""
                                    >
                                        <LinkedProjectLinkBG
                                            image={
                                                webp
                                                    ? project.coverImage.fixed
                                                          .srcWebp
                                                    : project.coverImage.fixed
                                                          .src
                                            }
                                        />
                                    </LinkedProjectLink>
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
