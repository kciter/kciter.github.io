import React, { useState } from 'react';
import DefaultTemplate from '@templates/default';
import SEO from '@components/SEO';
import dayjs from 'dayjs';
import { graphql, Link, PageProps, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

dayjs.extend(require('dayjs/plugin/localizedFormat'));

const Index = ({ location }: PageProps) => {
  const [category, setCategory] = useState('article');

  const result = useStaticQuery(graphql`
    {
      allMdx(
        sort: { fields: { date: DESC } }
        filter: { frontmatter: { draft: { ne: true }, hide: { ne: true } } }
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
              categories
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
  // .filter((item: any) =>
  //   category ? item.node.frontmatter.categories === category : true
  // );

  return (
    <DefaultTemplate>
      <SEO title="Timeline" />

      {/* <SegmentGroup>Article</SegmentGroup> */}

      {posts.map((post: any) => (
        <Post key={post.node.fields.slug}>
          <PostMeta>
            <MetaInner>
              <PostDate>{dayjs(post.node.fields.date).locale('en').format('ll')}</PostDate>
              <PostClock>
                <i className="fa fa-clock-o" aria-hidden="true" />{' '}
                {Math.round(post.node.fields.timeToRead.minutes)} minute read
              </PostClock>
            </MetaInner>
          </PostMeta>
          <PostContent recent={dayjs(post.node.fields.date).isAfter(dayjs().subtract(1, 'month'))}>
            <Link to={post.node.fields.slug} style={{ textDecoration: 'none' }}>
              <ContentInner>
                <PostDateMobile>
                  {dayjs(post.node.fields.date).locale('en').format('ll')}
                </PostDateMobile>
                <PostTags>
                  <PostCategory>{post.node.frontmatter.categories}</PostCategory>
                  {post.node.frontmatter.tags.map((tag: string) => (
                    <PostTag key={tag}>{tag}</PostTag>
                  ))}
                </PostTags>
                <PostTitle>
                  <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
                </PostTitle>
                <PostDescription>{post.node.excerpt}</PostDescription>
                {post.node.frontmatter.image && (
                  <ThumbnailImage src={post.node.frontmatter.image} />
                )}
              </ContentInner>
            </Link>
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
  height: auto;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  line-height: 26px;
`;

const PostMeta = styled.div`
  width: 15%;
  padding-right: 24px;
  text-align: right;

  @media (max-width: 768px) {
    display: none;
  }
`;

const PostDate = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #444;
`;

const PostDateMobile = styled.div`
  display: none;
  font-size: 14px;
  font-weight: bold;
  color: #444;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const PostClock = styled.div`
  font-size: 10px;
  color: #aaa;
  line-height: 1.6;
`;

const PostContent = styled.div<{ recent: boolean }>`
  position: relative;
  flex: 1;
  padding-left: 24px;
  border-left: 1px solid #ddd;
  min-width: 0%;
  padding-bottom: 60px;

  &::after {
    background: ${props => (props.recent ? '#00a962' : '#888')};
    border: 1px solid #eee;
    content: '';
    display: block;
    height: 10px;
    left: -6px;
    position: absolute;
    top: -4px;
    width: 10px;
    border-radius: 12px;

    box-shadow: ${props => (props.recent ? 'rgb(51, 217, 178) 0px 0px 0px 0px' : 'none')};
    animation: ${props =>
      props.recent ? '2s ease 0s infinite normal none running pulse' : 'none'};

    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: rgba(51, 217, 178, 0.7) 0px 0px 0px 0px;
      }
      70% {
        transform: scale(1);
        box-shadow: rgba(51, 217, 178, 0) 0px 0px 0px 10px;
      }
      100% {
        transform: scale(0.95);
        box-shadow: rgba(51, 217, 178, 0) 0px 0px 0px 0px;
      }
    }
  }
`;

const PostTags = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  overflow: hidden;
  flex-wrap: nowrap;
  white-space: nowrap;
  gap: 4px;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    width: 80px;
    height: 100%;
    background-image: linear-gradient(90deg, transparent 0%, white 100%);
  }
`;

const PostCategory = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 16px;
  padding: 0 8px;
  font-size: 9px;
  color: #888;
  border-radius: 50px;
  border: 1px solid #888;
  /* cursor: pointer; */
  background-color: white;
`;

const PostTag = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 16px;
  padding: 0 8px;
  font-size: 9px;
  color: #888;
  border-radius: 50px;
  border: 1px solid #dfe3e8;
  /* cursor: pointer; */
  background-color: white;
`;

const PostTitle = styled.h1`
  font-size: 20px;
  border: none;
  margin: 0;
  margin-bottom: 8px;
  padding: 0;
`;

const PostDescription = styled.p`
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  margin-bottom: 8px;
`;

const ThumbnailImage = styled.img`
  display: block;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MetaInner = styled.div`
  display: block;
  transform: translateY(-10px);
`;

const ContentInner = styled.div`
  display: block;
  margin-top: -8px;
  transition: all 333ms ease 0s;

  @media (max-width: 768px) {
    margin-top: -12px !important;
  }

  transform: scale3d(1, 1, 1);

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    transform: scale(1.04);
    transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow:
      0 8px 17px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.15);
    content: '';
    opacity: 0;
    z-index: -1;
  }

  &:hover {
    transform: scale3d(1.006, 1.006, 1);

    &::after {
      opacity: 1;
    }
  }
`;

// const SegmentGroup = styled.div`
//   display: flex;
//   width: 60%;
//   margin: 0 auto;
//   margin-bottom: 40px;
//   gap: 16px;
// `;

// const SegmentItem = styled.div`
//   flex: 1;

// `;
