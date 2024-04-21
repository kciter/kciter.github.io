import React from "react";
import DefaultTemplate from "@templates/default";
import SEO from "@components/SEO";
import dayjs from "dayjs";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";

dayjs.extend(require("dayjs/plugin/localizedFormat"));

const Index = () => {
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
    <DefaultTemplate>
      <SEO title="Writing" />

      {posts.map((post: any) => (
        <Post key={post.node.fields.slug}>
          <PostTitle>
            <a href={post.node.fields.slug}>{post.node.frontmatter.title}</a>
          </PostTitle>
          <a href={post.node.fields.slug}>
            <ThumbnailImage src={post.node.frontmatter.image} />
          </a>
          <PostDescription>
            {post.node.excerpt} <a href={post.node.fields.slug}>Read more</a>

            <span className="post-date">
              <i className="fa fa-calendar" aria-hidden="true" />{" "}
              {dayjs(post.node.fields.date).locale("en").format("LL")} -{" "}
              <i className="fa fa-clock-o" aria-hidden="true" />{" "}
              {Math.round(post.node.fields.timeToRead.minutes)} minute read
            </span>
          </PostDescription>
          
          {/* <div>
            <div className="thumbnail-container">
              <a href={post.node.fields.slug}>
                <ThumbnailImage src={post.node.frontmatter.image} />
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
          </div> */}
        </Post>
      ))}
    </DefaultTemplate>
  );
};

export default Index;

const Post = styled.div`
  margin-bottom: 16px;
  padding: 0px;
  list-style: none;
  line-height: 26px;
`

const PostTitle = styled.h1`
  font-size: 26px;
  /* border: none;
  padding: 0; */
`

const PostDescription = styled.p`
  font-size: 16px;
`

const ThumbnailImage = styled.img`
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`