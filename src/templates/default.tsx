import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import '../assets/styles/prismjs-theme.css';
import '../assets/styles/main.css';

import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';

interface DefaultTemplateProps {
  children: React.ReactNode;
}

const DefaultTemplate = ({ children }: DefaultTemplateProps) => {
  return (
    <>
      <Global styles={globalStyles} />

      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="color-scheme" content="light" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700%7CPT+Sans:400"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Code+Pro" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quattrocento+Sans" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Helmet>

      <Container>
        <Header />

        <div className="post-container">{children}</div>

        <Footer />
      </Container>
    </>
  );
};

export default DefaultTemplate;

const globalStyles = css`
  html {
    text-size-adjust: none;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    font-size: 16px;
    color: #212b36;

    &::before {
      content: '';
      position: absolute;
      inset: 0px;
      z-index: -100;
      background-image: url(/header-gradient.svg);
      background-repeat: no-repeat;
      background-position:
        center top,
        center bottom;
      background-size: 1400px;
      opacity: 0.4;
    }

    @media (max-width: 768px) {
      font-size: 14px;

      h1 {
        font-size: 1.5rem;
      }

      .post-content {
        line-height: 1.8;
      }

      &::before {
        background-size: 800px;
      }
    }
  }
`;

const Container = styled.div`
  padding-top: 16px;
  margin-left: auto;
  margin-right: auto;
  width: 715px;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;
