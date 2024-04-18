import dayjs from "dayjs";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

dayjs.extend(require("dayjs/plugin/localizedFormat"));

interface PostsProps {
  page?: number;
}

const Posts = ({ page = 1 }: PostsProps) => {
  const result = useStaticQuery(graphql`
    {
      allMdx(
        sort: { fields: { date: DESC } }
        filter: {
          fields: { type: { eq: "post" } }
          frontmatter: { draft: { ne: true }, hide: { ne: true } }
        }
      ) {
        edges {
          node {
            excerpt
            fields {
              timeToRead {
                minutes
              }
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
    <div>
      {posts.map((post: any) => (
        <div className="posts" key={post.node.fields.slug}>
          <h1>
            <a href={post.node.fields.slug}>{post.node.frontmatter.title}</a>
          </h1>
          <div>
            <div className="thumbnail-container">
              <a href={post.node.fields.slug}>
                <img src={post.node.frontmatter.image} />
              </a>
            </div>
            <p>
              {post.node.excerpt} <a href={post.node.fields.slug}>Read more</a>
              <span className="post-date">
                <i className="fa fa-calendar" aria-hidden="true" />{" "}
                {dayjs(post.node.fields.date).locale("en").format("LL")} -{" "}
                <i className="fa fa-clock-o" aria-hidden="true" />{" "}
                {Math.round(post.node.fields.timeToRead.minutes)} minute read
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
