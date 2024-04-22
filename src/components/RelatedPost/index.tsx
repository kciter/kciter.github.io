import styled from "@emotion/styled";
import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

interface RelatedPostProps {
  posts: any;
  current?: string;
  style?: React.CSSProperties;
}

const RelatedPost = ({ posts, current, style }: RelatedPostProps) => {
  return (
    <Container style={style}>
      <Posts>
        {posts.map(
          (post: any) =>
            post.node.fields.slug !== current && (
              <Post key={post.node.fields.slug}>
                <Link to={post.node.fields.slug}>
                  <img src={post.node.frontmatter.image} />
                  <Title>{post.node.frontmatter.title}</Title>
                  <small>{post.node.fields.date}</small>
                </Link>
              </Post>
            )
        )}
      </Posts>
    </Container>
  );
};

export default RelatedPost;

const Container = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
`

const Posts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
	column-gap: 20px;

  @media (max-width: 30rem) {
    grid-template-columns: 1fr;
  }
`

const Post = styled.div`
  img {
    display: block;
    height: 140px;
    object-fit: cover;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.05);

    @media (max-width: 30rem) {
      width: 100%
    }
  }

  a {
    text-decoration: none;
  }

  position: relative;
  
  &::before {
    content: "";
    border-radius: 16px;
    display: block;
    position: absolute;
    z-index: -1;
    inset: -2px;
    opacity: 0;
    transform: scale(0.9);
    transition: all 333ms ease 0s;
    
    &:hover {
      opacity: 1;
      background: linear-gradient(135deg, rgba(234, 234, 234, 0.7) 0%, rgba(244, 244, 244, 0.7) 100%);
      transform: scale(1.04);
    }
  }
`

const Title = styled.div`
  margin-top: 12px;
  /* font-family: serif; */
  font-size: 20px;
  line-height: 24px;
  font-weight: 100;
`