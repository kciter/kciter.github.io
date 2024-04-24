import React from 'react';
import Social from '@components/Social';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const Footer = () => {
  return (
    <FooterContainer>
      <Social />

      <Copyright>
        <Link to="/about">kciter.so | devlog by Lee Sun-Hyoup</Link>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  color: #999;
  text-align: center;
  margin: 2rem;

  a {
    color: #999;
    padding: 10px;
    text-decoration: none;

    &:hover {
      color: #333;
    }
  }
`;

const Copyright = styled.div`
  display: block;
  margin-top: 16px;
  margin-bottom: 1rem;
  color: #9a9a9a;
  font-family: 'Quattrocento Sans', sans-serif;
  font-size: 0.8rem;
`;
