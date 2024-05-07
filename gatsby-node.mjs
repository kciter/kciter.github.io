import readingTime from 'reading-time';
import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';
import dayjs from 'dayjs';

export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const type = 'post'; // node.fileAbsolutePath.includes("/posts") ? "post" : "snippet";

    const filename = createFilePath({ node, getNode, basePath: `${type}s` });

    const [, date, title] = filename.match(/^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/);

    const slug = `/${type}s/${title}`;
    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body)
    });
    createNodeField({ node, name: `slug`, value: slug });
    createNodeField({ node, name: `date`, value: date });
    createNodeField({ node, name: `year`, value: dayjs(date).format('YYYY') });
    createNodeField({ node, name: `type`, value: type });
  }
};

export const createPages = async ({ graphql, actions }) => {
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
              draft
              series
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

  const postTemplate = path.resolve(`src/templates/post.tsx`);

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.fields.slug,
        series: node.frontmatter.series
          ? {
              title: node.frontmatter.series,
              items: result.data.allMdx.edges
                .filter(edge => {
                  return edge.node.frontmatter.series === node.frontmatter.series;
                })
                .toSorted((a, b) => {
                  return Date.parse(a.node.fields.date) < Date.parse(b.node.fields.date) ? -1 : 1;
                })
                .map(edge => {
                  return {
                    title: edge.node.frontmatter.title,
                    url: edge.node.fields.slug
                  };
                })
            }
          : undefined
      }
    });
  });
};
