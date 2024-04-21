import React from "react";
import DefaultTemplate from "@templates/default";
import SEO from "@components/SEO";
import Posts from "@components/Posts";

const Index = () => {

  return (
    <DefaultTemplate>
      <SEO title="Writing" />

      <Posts />
    </DefaultTemplate>
  );
};

export default Index;
