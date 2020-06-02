const query = require("./query.js")
const path = require(`path`)

module.exports = async ({ graphql, actions }) => {
    const { createPage } = actions
    const projectTemplate = path.resolve(`src/templates/project.js`)
    // Create a page for each "page"
    const pagesQuery = await graphql(query.data.projects)
    const pages = pagesQuery.data.allContentfulProject.edges
    pages.forEach((page, i) => {
        const slug = page.node.slug
        createPage({
            path: `/${slug}`,
            component: projectTemplate,
            context: {
                id: page.node.id,
                title: page.node.title,
            },
        })
    })
}
