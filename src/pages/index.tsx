import React, { useEffect, useMemo, useState } from 'react';
import DefaultTemplate from '@templates/default';
import SEO from '@components/SEO';
import RelatedPost from '@components/RelatedPost';
import Bio from '@components/Bio';
import { graphql, Link, PageProps, useStaticQuery } from 'gatsby';

const Index = () => {
  const result = useStaticQuery(graphql`
    {
      allMdx(
        limit: 9
        sort: { fields: { date: DESC } }
        filter: {
          fields: { type: { eq: "post" } }
          frontmatter: { draft: { ne: true }, hide: { ne: true } }
        }
      ) {
        edges {
          node {
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
  `);

  const posts = result.allMdx.edges;

  return (
    <DefaultTemplate>
      <SEO title="" />

      <Bio />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8
        }}
      >
        <h3 style={{ letterSpacing: 2, margin: 0, fontSize: 18 }}>RECENT POSTS</h3>
        <Link
          to="/writing"
          style={{
            fontSize: 14,
            fontWeight: 500,
            textDecoration: 'none',
            // backgroundSize: "100%",
            // backgroundRepeat: "repeat",
            // backgroundClip: "text",
            // backgroundImage:
            //   "linear-gradient(90deg, #80D0F2 0%, #5C82FF 50%, #C480FF 100%)",
            cursor: 'pointer'
            // WebkitTextFillColor: "transparent",
          }}
        >
          All posts ▸
        </Link>
      </div>

      {posts && <RelatedPost posts={posts} style={{ padding: 0, paddingTop: 10 }} />}
    </DefaultTemplate>
  );
};

export default Index;
