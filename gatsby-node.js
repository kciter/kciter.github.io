const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const { categories } = node.frontmatter;
    const filename = createFilePath({ node, getNode, basePath: `posts` });

    console.log(filename);

    const [, date, title] = filename.match(
      /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
    );

    const slug = `/posts/${title}`;
    createNodeField({ node, name: `slug`, value: slug });
    createNodeField({ node, name: `date`, value: date });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMdx {
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
  `);

  if (result.errors) {
    return Promise.reject(result.errors);
  }

  const markdownItems = result.data.allMdx.edges;

  markdownItems.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`src/templates/post.tsx`),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
