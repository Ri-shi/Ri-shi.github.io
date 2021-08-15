module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    siteUrl: "https://urishiraval.github.io",
    title: "urishiraval-website",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },

    `gatsby-transformer-remark`,
    
  ],
};
