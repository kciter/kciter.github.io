import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Helmet } from "react-helmet";
import "../assets/styles/main.css";
import "../assets/styles/prismjs-theme.css";

interface DefaultTemplateProps {
  children: React.ReactNode;
}

const DefaultTemplate = ({ children }: DefaultTemplateProps) => {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700%7CPT+Sans:400"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Quattrocento+Sans"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Helmet>

      <div className="container">
        <Header />

        <div className="post-container">{children}</div>

        <Footer />
      </div>
    </>
  );
};

export default DefaultTemplate;
