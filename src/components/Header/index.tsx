import React from 'react';
import Social from '@components/Social';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

const Header = () => {
  const result = useStaticQuery(graphql`
    {
      allMdx(
        limit: 3
        sort: { fields: { date: DESC } }
        filter: { frontmatter: { draft: { ne: true }, hide: { ne: true } } }
      ) {
        edges {
          node {
            fields {
              date
            }
          }
        }
      }
    }
  `);

  const posts = result.allMdx.edges;
  const updated =
    posts.filter((post: any) => {
      return dayjs(post.node.fields.date).isAfter(dayjs().subtract(1, 'month'));
    }).length > 0;

  return (
    <Container>
      <TitleContainer>
        <Title href="/">kciter.so</Title>
        <Subtitle>devlog</Subtitle>
      </TitleContainer>

      <MenuContainer>
        <Menu>
          {/* <Link to="https://kciter.so/resume" target="_blank" className="item">
            Résumé
          </Link> */}
          <Link to="/writing" className={`item ${updated ? 'updated' : ''}`}>
            Writing
          </Link>
          <Link to="/bookshelf" className="item">
            Bookshelf
          </Link>
          <Link to="/about" className="item">
            About
          </Link>
        </Menu>

        <SocialIcons>
          <Social />
        </SocialIcons>
      </MenuContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  margin-bottom: 40px;
  font-family: 'Quattrocento Sans', sans-serif;

  margin-left: -16px;
  margin-right: -16px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(44px);
  padding: 10px 16px;
  border-radius: 12px;

  @media (max-width: 768px) {
    margin-top: -16px;
    margin-left: -16px;
    margin-right: -16px;
    margin-bottom: 32px;
    border-radius: 0;
    grid-template-columns: 1fr;
    background-color: transparent;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const Title = styled.a`
  font-size: 32px;
  font-weight: 900;
  text-decoration: none;
  color: #505050;
  margin-right: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-size: 300% 100%;
  background-position: top left;
  background-image: linear-gradient(
    to right,
    #505050,
    #505050 33.33333%,
    #00ab6c 66.66666%,
    #00cb8c
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;

  &:hover {
    background-position: top left 100%;
    font-weight: 700;
  }
`;

const Subtitle = styled.small`
  color: #999;
`;

const MenuContainer = styled.nav`
  width: 100%;
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  .item {
    position: relative;
    color: black;
    font-size: 1rem;
    margin-right: 15px;
    text-decoration: none;

    &:last-of-type {
      margin-right: 0;
    }

    &.updated::before {
      background: #00a962;
      border: 1px solid #eee;
      content: '';
      display: block;
      height: 6px;
      right: -6px;
      position: absolute;
      top: -2px;
      width: 6px;
      border-radius: 12px;

      box-shadow: rgb(51, 217, 178) 0px 0px 0px 0px;
      animation: 2s ease 0s infinite normal none running pulse;

      @keyframes pulse {
        0% {
          transform: scale(0.95);
          box-shadow: rgba(51, 217, 178, 0.7) 0px 0px 0px 0px;
        }
        70% {
          transform: scale(1);
          box-shadow: rgba(51, 217, 178, 0) 0px 0px 0px 6px;
        }
        100% {
          transform: scale(0.95);
          box-shadow: rgba(51, 217, 178, 0) 0px 0px 0px 0px;
        }
      }
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;

  a {
    color: #999;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    display: none;

    a {
      color: black;
      font-size: 0.9rem;
    }
  }
`;
