import React from 'react';
import DefaultTemplate from '@templates/default';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';

const NotFoundPage = () => (
  <DefaultTemplate>
    <Helmet>
      <title>404 | kciter.so</title>
    </Helmet>

    <div className="page">
      <h1 className="page-title">404: Page not found</h1>

      <NotFoundImage />

      <p style={{ textAlign: 'center' }}>There is nothing here.</p>
    </div>
  </DefaultTemplate>
);

export default NotFoundPage;

const NotFoundImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  background: url(/not-found.gif) no-repeat center center;
  background-size: contain;
`;
