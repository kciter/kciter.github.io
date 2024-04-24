import React from 'react';
import DefaultTemplate from '@templates/default';
import SEO from '@components/SEO';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

const BookshelfPage = () => {
  const result = useStaticQuery(graphql`
    {
      allMdx(
        sort: { fields: { date: DESC } }
        filter: {
          fields: { type: { eq: "post" } }
          frontmatter: {
            draft: { ne: true }
            hide: { ne: true }
            categories: { eq: "book-report" }
          }
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
              cover
            }
          }
        }
      }
    }
  `);

  const posts = result.allMdx.edges;

  return (
    <DefaultTemplate>
      <SEO title="Bookshelf" />

      <Container>
        {posts.map((post: any) => (
          <BookItem link={post.node.fields.slug} coverImage={post.node.frontmatter.cover} />
        ))}
      </Container>
    </DefaultTemplate>
  );
};

export default BookshelfPage;

const Container = styled.div`
  display: grid;
  width: 90%;
  margin: 0 auto;
  position: relative;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 12px;
  padding: 4px;

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface Props {
  link: string;
  coverImage: string;
}

const BookItem = ({ link, coverImage }: Props) => {
  return (
    <ItemContainer>
      <BookPage>
        <BookPage>
          <Inner />
          <BookCover to={link}>
            <img src={coverImage} />
            <Effect />
            <Light />
          </BookCover>
        </BookPage>
      </BookPage>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  position: relative;
  cursor: default;
  padding: 16px;
  margin: 0;
`;

const Inner = styled.div`
  position: absolute;
  width: 90%;
  height: 96%;
  top: 1%;
  left: 16px;
  border: 1px solid grey;
  border-radius: 2px 6px 6px 2px;
  background: white;
  box-shadow:
    10px 40px 40px -10px #00000030,
    inset -2px 0 0 grey,
    inset -3px 0 0 #dbdbdb,
    inset -4px 0 0 white,
    inset -5px 0 0 #dbdbdb,
    inset -6px 0 0 white,
    inset -7px 0 0 #dbdbdb,
    inset -8px 0 0 white,
    inset -9px 0 0 #dbdbdb;
`;

const BookPage = styled.div`
  position: relative;
`;

const BookCover = styled(Link)`
  display: block;
  line-height: 0;
  position: relative;
  border-radius: 2px 6px 6px 2px;
  box-shadow:
    6px 6px 18px -2px rgba(0, 0, 0, 0.2),
    24px 28px 40px -6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  transform: perspective(2000px) rotateY(-15deg) translateX(-10px) scaleX(0.94);
  cursor: pointer;

  &:hover {
    transform: perspective(2000px) rotateY(0deg) translateX(0px) scaleX(1);
    transform-style: preserve-3d;
    box-shadow:
      6px 6px 12px -1px rgba(0, 0, 0, 0.1),
      20px 14px 16px -6px rgba(0, 0, 0, 0.1);
  }

  img {
    grid-row: 1 / -1;
    grid-column: 1;
    width: 100%;
    border-radius: 2px 6px 6px 2px;
  }
`;

const Effect = styled.div`
  position: absolute;
  width: 20px;
  height: 100%;
  margin-left: 8px;
  top: 0;
  border-left: 2px solid rgba(0, 0, 0, 0.04);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: all 0.5s ease;
  z-index: 5;

  &:hover {
    margin-left: 14px;
  }
`;

const Light = styled.div`
  width: 95%;
  height: 100%;
  position: absolute;
  border-radius: 3px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 100%
  );
  top: 0;
  right: 0;
  opacity: 0.1;
  transition: all 0.5s ease;
  z-index: 4;
`;
