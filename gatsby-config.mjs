import remarkGfm from "remark-gfm";
import remarkExternalLinks from "remark-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default {
  siteMetadata: {
    siteUrl: "https://kciter.so",
    title: `kciter.so | devlog`,
    description: `devlog`,
    author: `Lee Sun-Hyoup`,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-tsconfig-paths`,
    `gatsby-plugin-react-helmet`,
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
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            remarkGfm,
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            [remarkExternalLinks, { target: false }],
          ],
          rehypePlugins: [
            // Generate heading ids for rehype-autolink-headings
            rehypeSlug,
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            [rehypeAutolinkHeadings, { behavior: `wrap` }],
          ],
        },
        gatsbyRemarkPlugins: [
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
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, allMdx } }) => {
    //           return allMdx.edges.map(edge => {
    //             return Object.assign({}, edge.node.frontmatter, {
    //               description: edge.node.excerpt,
    //               date: edge.node.fields.date,
    //               url: site.siteMetadata.siteUrl + edge.node.fields.slug,
    //               guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
    //             });
    //           });
    //         },
    //         query: `
    //           {
    //             allMdx(
    //               sort: { fields: [fields___date], order: DESC }
    //               filter: {
    //                 fields: { type: { eq: "post" } }
    //                 frontmatter: { draft: { ne: true } }
    //               }
    //             ) {
    //               edges {
    //                 node {
    //                   excerpt
    //                   fields {
    //                     date
    //                     slug
    //                   }
    //                   frontmatter {
    //                     title
    //                     image
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         output: "/feed.xml",
    //         title: "kciter.so",
    //       },
    //     ],
    //   },
    // },
  ],
};
