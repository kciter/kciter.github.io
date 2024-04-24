import PostBio from '@components/PostBio';
import Giscus from '@components/Giscus';
import SpecialThanks from '@components/SpecialThanks';
import React from 'react';
import styled from '@emotion/styled';

interface PostFooterProps {
  tags?: [string];
  comment?: boolean;
}

const PostFooter = ({ tags, comment }: PostFooterProps) => {
  return (
    <Container>
      {tags && (
        <Tags>
          {tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      )}

      <PostBio />

      <SpecialThanks />

      {comment && (
        <>
          <div id="comments">
            <Giscus repo="kciter/kciter.github.io" theme="light" />
          </div>
        </>
      )}
    </Container>
  );
};

export default PostFooter;

const Container = styled.div``;

const Tags = styled.div`
  width: 100%;
  margin-top: 4px;
`;

const Tag = styled.div`
  display: inline-block;
  height: 20px;
  padding: 0 8px;
  margin-right: 4px;
  font-size: 10px;
  line-height: 20px;
  color: #888;
  border-radius: 50px;
  border: 1px solid #dfe3e8;
  /* cursor: pointer; */
`;
