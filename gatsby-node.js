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
