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
              tags
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
          <PostMeta>
            <Inner>
              <PostDate>
                {dayjs(post.node.fields.date).locale("en").format("ll")}
              </PostDate>
              <PostClock>
                <i className="fa fa-clock-o" aria-hidden="true" />{" "}
                {Math.round(post.node.fields.timeToRead.minutes)} minute read
              </PostClock>
            </Inner>
          </PostMeta>
          <PostContent>
            <Inner style={{
              transform: post.node.frontmatter.tags.length > 0 ? "translateY(-5px)" : "translateY(-10px)"
            }}>
              {post.node.frontmatter.tags.length > 0 && (
                <PostTags>
                  {post.node.frontmatter.tags.map((tag: string) => (
                    <PostTag key={tag}>
                      {tag}
                    </PostTag>
                  ))}
                </PostTags>
              )}
              <PostTitle>
                <a href={post.node.fields.slug}>{post.node.frontmatter.title}</a>
              </PostTitle>
              <PostDescription>
                {post.node.excerpt} <a href={post.node.fields.slug}>Read more</a>
              </PostDescription>
              <a href={post.node.fields.slug}>
                <ThumbnailImage src={post.node.frontmatter.image} />
              </a>
            </Inner>
          </PostContent>
        </Post>
      ))}
    </DefaultTemplate>
  );
};

export default Index;

const Post = styled.div`
  display: flex;
  /* width: 90%; */
  height: 500px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  line-height: 26px;
`

const PostMeta = styled.div`
  width: 15%;
  padding-right: 24px;
  text-align: right;
`

const PostDate = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #444;
`

const PostClock = styled.div`
  font-size: 10px;
  color: #aaa;
  line-height: 1.6;
`

const PostContent = styled.div`
  position: relative;
  flex: 1;
  padding-left: 24px;
  border-left: 1px solid #ddd;

  &:before {
    background: #666;
    border: 1px solid #eee;
    content: "";
    display: block;
    height: 10px;
    left: -7px;
    position: absolute;
    top: -4px;
    width: 10px;
    border-radius: 12px;
  }
`

const PostTags = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 8px;
`

const PostTag = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 16px;
  padding: 0 8px;
  margin-right: 4px;
  font-size: 9px;
  color: #888;
  border-radius: 50px;
  border: 1px solid #dfe3e8;
  /* cursor: pointer; */
`

const PostTitle = styled.h1`
  font-size: 20px;
  border: none;
  margin: 0;
  margin-bottom: 16px;
  padding: 0;
`

const PostDescription = styled.p`
  font-size: 14px;
  line-height: 1.4;
`

const ThumbnailImage = styled.img`
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`

const Inner = styled.div`
  display: block;
  transform: translateY(-10px);
`