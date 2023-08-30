const { createFilePath } = require(`gatsby-source-filesystem`);
const { GraphQLBoolean } = require("gatsby/graphql");
const path = require("path");
const dayjs = require("dayjs");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const type = node.fileAbsolutePath.includes("/posts") ? "post" : "snippet";

    const filename = createFilePath({ node, getNode, basePath: `${type}s` });

    const [, date, title] = filename.match(
      /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
    );

    const slug = `/${type}s/${title}`;
    createNodeField({ node, name: `slug`, value: slug });
    createNodeField({ node, name: `date`, value: date });
    createNodeField({ node, name: `year`, value: dayjs(date).format("YYYY") });
    createNodeField({ node, name: `type`, value: type });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  graphql(`
    {
      allMdx(filter: { fileAbsolutePath: { glob: "**/posts/*.(md|mdx)" } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              categories
              draft
              series
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMdx.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/post.tsx`),
        context: {
          slug: node.fields.slug,
          series: node.frontmatter.series
            ? {
                title: node.frontmatter.series,
                items: result.data.allMdx.edges
                  .filter(edge => {
                    return (
                      edge.node.frontmatter.series === node.frontmatter.series
                    );
                  })
                  .map(edge => {
                    return {
                      title: edge.node.frontmatter.title,
                      url: edge.node.fields.slug,
                    };
                  }),
              }
            : undefined,
        },
      });
    });
  });

  graphql(`
    {
      allMdx(filter: { fileAbsolutePath: { glob: "**/snippets/*.(md|mdx)" } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              categories
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMdx.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/snippet.tsx`),
        context: {
          slug: node.fields.slug,
        },
      });
    });
  });
};
