import React from 'react';
import DefaultTemplate from '@templates/default';
import SEO from '@components/SEO';
import RelatedPost from '@components/RelatedPost';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

const Index = () => {
  const result = useStaticQuery(graphql`
    {
      allMdx(
        limit: 9
        sort: { fields: { date: DESC } }
        filter: {
          fields: { type: { eq: "post" } }
          frontmatter: { categories: { eq: "article" }, draft: { ne: true }, hide: { ne: true } }
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

      <BioContainer>
        <AvatarContainer>
          <Avatar src="/images/about/avatar.jpg" />
        </AvatarContainer>

        <Introduction>
          <ProfileName>Sunhyoup Lee</ProfileName>
          <ProfileDescription>Just a Developer</ProfileDescription>
        </Introduction>
      </BioContainer>

      <RecentPostsContainer>
        <RecentPostsHeader>RECENT ARTICLES</RecentPostsHeader>
        <AllPosts to="/timeline">All articles ▸</AllPosts>
      </RecentPostsContainer>

      {posts && <RelatedPost posts={posts} style={{ padding: 0, paddingTop: 10 }} />}
    </DefaultTemplate>
  );
};

export default Index;

const BioContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.2);
`;

const Avatar = styled.img`
  width: 116px;
  height: 116px;
  border-radius: 50%;
  object-fit: cover;
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const ProfileDescription = styled.div`
  font-size: 16px;
  color: #666;
`;

const Description = styled.div`
  font-size: 20px;
  line-height: 1.3;
  font-weight: 300;
`;

const RecentPostsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const RecentPostsHeader = styled.div`
  letter-spacing: 2px;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const AllPosts = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
`;
