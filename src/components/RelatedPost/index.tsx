import { graphql, useStaticQuery } from "gatsby";
import React from "react";

interface RelatedPostProps {
  posts: any;
  current?: string;
  style?: React.CSSProperties;
}

const RelatedPost = ({ posts, current, style }: RelatedPostProps) => {
  return (
    <div className="related" style={style}>
      <div className="related-posts">
        {posts.map(
          (post: any) =>
            post.node.fields.slug !== current && (
              <div className="related-post" key={post.node.fields.slug}>
                <a href={post.node.fields.slug}>
                  <img src={post.node.frontmatter.image} />
                  <div className="title">{post.node.frontmatter.title}</div>
                  <small>{post.node.fields.date}</small>
                </a>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default RelatedPost;
