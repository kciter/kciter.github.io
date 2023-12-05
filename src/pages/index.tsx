import React, { useEffect, useState } from "react";
import DefaultTemplate from "@templates/default";
import SEO from "@components/SEO";
import RelatedPost from "@components/RelatedPost";
import Bio from "@components/Bio";
import { graphql, PageProps } from "gatsby";

const Index = ({ data }: PageProps) => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    setPosts(
      (data as any).allMdx.edges.sort(() => Math.random() - 0.5).splice(0, 6)
    );
  }, []);

  return (
    <DefaultTemplate>
      <SEO title="" />

      <Bio />

      <h2>Posts</h2>
      {posts && <RelatedPost posts={posts} style={{ padding: 0 }} />}
    </DefaultTemplate>
  );
};

export const relatedPostQuery = graphql`
  query RelatedPost {
    allMdx(
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
`;

export default Index;
