const path = require(`path`)
const LoadablePlugin = require('@loadable/webpack-plugin')

exports.onCreateWebpackConfig = ({ actions, plugins, stage, loaders }) => {
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()]
  })
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-input-date-mask/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {

      destinations: allWpDestination {
        edges {
          node {
            title
            slug
            ACF_Destinations {
              gyms {
                ... on WpGym {
                  title
                }
              }
            }
          }
        }
      }

      gyms: allWpGym {
        edges {
          node {
            title
            slug
          }
        }
      }

      accommodations: allWpAccommodation {
        edges {
          node {
            title
            slug
          }
        }
      }

    }
  `).then(result => {

    // result.data.destinations.edges.forEach(({ node }) => (
    //     console.log(node),
    //   createPage({
    //     path: `/destination/${node.slug}`,
    //     component: path.resolve(`./src/templates/destination.js`),
    //     context: {
    //       slug: node.slug,
    //     },
    //   })
    //   )),

    result.data.destinations.edges.forEach(({ node }) => (
      node.ACF_Destinations.gyms &&
    createPage({
      path: `/destination/${node.slug}`,
      component: path.resolve(`./src/templates/destination.js`),
      context: {
        slug: node.slug,
      },
    })
    )),

    result.data.gyms.edges.forEach(({ node }) => (
      createPage({
        path: `/gym/${node.slug}`,
        component: path.resolve(`./src/templates/gym.js`),
        context: {
          slug: node.slug,
        },
      })
      ))

    result.data.accommodations.edges.forEach(({ node }) => (
      createPage({
        path: `/accommodation/${node.slug}`,
        component: path.resolve(`./src/templates/accommodation.js`),
        context: {
          slug: node.slug,
        },
      })
    ))

  })
}

