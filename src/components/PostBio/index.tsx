import Social from '@components/Social';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';

const PostBio = () => {
  return (
    <Container>
      <Avatar>
        <img src="/images/about/avatar.jpg" />
      </Avatar>

      <Summary>
        <div>
          Written by <Name to="/about">@kciter</Name>
        </div>
        <Description>가치있는 지식이 되기를 바랍니다</Description>
        <SocialIcons>
          <Social />
        </SocialIcons>
      </Summary>
    </Container>
  );
};

export default PostBio;

const Container = styled.div`
  display: flex;
  padding: 24px 0;
`;

const Avatar = styled.div`
  flex: 0 1 80px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Summary = styled.div`
  flex: 1;
  margin-left: 32px;
  font-size: 16px;
`;

const Name = styled(Link)`
  font-weight: bold;
  background: linear-gradient(to right, #191335, #191335 33.33333%, #00ab6c 66.66666%, #00cb8c);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
  background-size: 300% 100%;
  background-position: top left;

  &:hover {
    background-position: top left 100%;
  }
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 100;
  line-height: 1.4;
`;

const SocialIcons = styled.div`
  margin-left: -4px;
  a {
    font-size: 14px;
    color: #888;
  }
`;
