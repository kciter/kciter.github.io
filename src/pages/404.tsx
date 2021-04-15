import React from "react";
import DefaultTemplate from "@templates/default";
import { Helmet } from "react-helmet";

const NotFoundPage = () => (
  <DefaultTemplate>
    <Helmet>
      <title>404 | kciter.so</title>
    </Helmet>

    <div className="page">
      <h1 className="page-title">404: Page not found</h1>

      <div className="not-found"></div>

      <p style={{ textAlign: "center" }}>There is nothing here.</p>
    </div>
  </DefaultTemplate>
);

export default NotFoundPage;
