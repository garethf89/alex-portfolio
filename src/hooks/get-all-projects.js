import { graphql, useStaticQuery } from "gatsby"

export const getAllProjects = () => {
    const data = useStaticQuery(
        graphql`
            query WorkProjects {
                contentfulWork {
                    projects {
                        id
                        title
                        slug
                        darkBackground
                        headline
                        locked
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
        `
    )
    return data
}
