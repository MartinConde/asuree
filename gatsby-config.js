const myCustomQueries = {
  xxs: "(max-width: 374px)",
  xs: "(max-width: 420px)",
  sm: "(max-width: 767px)",
  md: "(max-width: 1023px)",
  mobBreak: "(max-width: 1199px)",
  l: "(max-width: 1500px)",
  xl: "(max-width: 2000px)",
  portrait: "(orientation: portrait)",
}

module.exports = {
  flags: {
    PARALLEL_QUERY_RUNNING: false
  },
  siteMetadata: {
    title: `Asuree`,
    description: `Muay Thai Camp booking site`,
    author: `@martinconde`,
  },
  plugins: [
    `gatsby-plugin-perf-budgets`,
    `gatsby-plugin-webpack-bundle-analyser-v2`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },
    // "gatsby-plugin-react-leaflet",
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://wordpress-796114-2722983.cloudwaysapps.com/graphql`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-breakpoints",
      options: {
        queries: myCustomQueries,
      },
    },
    {
      resolve: `gatsby-plugin-loadable-components-ssr`,
      options: {
        // Whether replaceHydrateFunction should call ReactDOM.hydrate or ReactDOM.render
        // Defaults to ReactDOM.render on develop and ReactDOM.hydrate on build
        useHydrate: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
