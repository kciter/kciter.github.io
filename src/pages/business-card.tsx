import React from 'react';
import DefaultTemplate from '@templates/default';
import SEO from '@components/SEO';
import styled from '@emotion/styled';

const BusinessCardPage = () => {
  return (
    <DefaultTemplate>
      <SEO title="Business Card" />

      <BioContainer>
        <AvatarContainer>
          <Avatar src="/images/about/avatar.jpg" />
        </AvatarContainer>

        <Introduction>
          <ProfileName>Sunhyoup Lee</ProfileName>
          <ProfileDescription>Just Developer</ProfileDescription>
        </Introduction>
      </BioContainer>

      <ButtonStack>
        <Button href="https://www.linkedin.com/in/kciter" target="_blank" rel="noopener noreferrer">
          <ButtonIcon className={`fa fa-linkedin`} aria-hidden="true" />
          LinkedIn
        </Button>

        <Button href="https://github.com/kciter" target="_blank" rel="noopener noreferrer">
          <ButtonIcon className={`fa fa-github`} aria-hidden="true" />
          GitHub
        </Button>

        <Button
          href="https://www.facebook.com/sunhyoup.lee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonIcon className={`fa fa-facebook`} aria-hidden="true" />
          Facebook
        </Button>

        <Button href="https://kciter.so" target="_blank" rel="noopener noreferrer">
          <ButtonIcon className={`fa fa-user`} aria-hidden="true" />
          Blog
        </Button>

        <Button href="sms:01024646979&body=안녕하세요" target="_blank" rel="noopener noreferrer">
          Send Message
        </Button>
      </ButtonStack>
    </DefaultTemplate>
  );
};

export default BusinessCardPage;

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

const ButtonStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonIcon = styled.i`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
`;

const Button = styled.a`
  position: relative;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 9999px;
  box-sizing: border-box;
`;
