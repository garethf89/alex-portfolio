const query = require("./query.js")
const path = require(`path`)

// module.exports = async ({ graphql, actions }) => {
//     const { createPage } = actions

//     const basePath = "/"

//     // Create a page for each "Project"
//     const queryProjects = await graphql(query.data.projects)
//     const projects = queryProjects.data.allContentfulProject.edges
//     projects.forEach((project, i) => {
//         console.log(project)
//         createPage({
//             path: `${basePath === "/" ? "" : basePath}/${project.node.slug}/`,
//             component: path.resolve(`./src/templates/project.js`),
//             context: {
//                 slug: project.node.slug,
//                 basePath: basePath === "/" ? "" : basePath,
//             },
//         })
//     })
// }

module.exports = async ({ graphql, actions }) => {
    const { createPage } = actions
    const projectTemplate = path.resolve(`src/templates/project.js`)
    // Create a page for each "page"
    const pagesQuery = await graphql(query.data.projects)
    const pages = pagesQuery.data.allContentfulProject.edges
    pages.forEach((page, i) => {
        createPage({
            path: `/${page.node.title}/`.toLowerCase(),
            component: projectTemplate,
            context: {
                id: page.node.id,
            },
        })
    })
}
