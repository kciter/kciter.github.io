import React, { useEffect, useMemo, useState } from "react";
import DefaultTemplate from "@templates/default";
import SEO from "@components/SEO";
import RelatedPost from "@components/RelatedPost";
import Bio from "@components/Bio";
import { graphql, PageProps, useStaticQuery } from "gatsby";

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

  const posts = useMemo(
    () =>
      result.allMdx.edges
        .sort(
          (a: any, b: any) =>
            +new Date(b.node.fields.date) - +new Date(a.node.fields.date)
        )
        .splice(0, 9),
    [result]
  );

  return (
    <DefaultTemplate>
      <SEO title="" />

      <Bio />

      <h2 style={{ textAlign: "center" }}>Posts</h2>
      {posts && <RelatedPost posts={posts} style={{ padding: 0 }} />}
    </DefaultTemplate>
  );
};

export default Index;
