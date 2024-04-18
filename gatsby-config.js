module.exports = {
  siteMetadata: {
    siteUrl: "https://kciter.so",
    title: `kciter.so | devlog`,
    description: `devlog`,
    author: `Lee Sun-Hyoup`,
  },
  plugins: [
    `gatsby-plugin-tsconfig-paths`,
    `gatsby-plugin-react-helmet`,
    `gatsby-remark-reading-time`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `posts`,
    //     path: `${__dirname}/src/snippets`,
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `anchor-header`,
              maintainCase: false,
              removeAccents: true,
              elements: [`h1`, `h2`, `h3`, `h4`],
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: { maxWidth: 1300, showCaptions: ["alt"] },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `anchor-header`,
              maintainCase: false,
              removeAccents: true,
              elements: [`h1`, `h2`, `h3`, `h4`],
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: { maxWidth: 1300, showCaptions: ["alt"] },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "G-7M8K7EBEDX",
        includeInDevelopment: true,
      },
    },
    `gatsby-plugin-cname`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { fields: [fields___date], order: DESC }
                  filter: {
                    fields: { type: { eq: "post" } }
                    frontmatter: { draft: { ne: true } }
                  }
                ) {
                  edges {
                    node {
                      excerpt(truncate: true)
                      fields {
                        date
                        slug
                      }
                      frontmatter {
                        title
                        image
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed.xml",
            title: "kciter.so",
          },
        ],
      },
    },
  ],
};
