import React from "react";
import { graphql, PageProps } from "gatsby";
import DefaultTemplate from "./default";
import SEO from "@components/SEO";
import dayjs from "dayjs";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import PostFooter from "@components/PostFooter";
import RelatedPost from "@components/RelatedPost";
import TableOfContents from "@components/TableOfContents";
import { Helmet } from "react-helmet";
import $ from "jquery";
import { useEffect } from "react";
import { useState } from "react";

dayjs.extend(require("dayjs/plugin/localizedFormat"));

const SnippetTemplate = ({ data, location }: PageProps) => {
  const {
    body,
    tableOfContents,
    fields,
    frontmatter,
    excerpt,
  } = (data as any).mdx;

  const author = "Lee Sun-Hyoup";
  const date = dayjs(fields.date).locale("ko").format();
  const applicationLdJson = {
    headline: frontmatter.title,
    dateModified: date,
    datePublished: date,
    image: `${location.href}${frontmatter.image}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": location.href,
    },
    author: { "@type": "Person", name: author },
    url: location.href,
    description: excerpt,
    "@type": "BlogPosting",
    "@context": "https://schema.org",
  };

  useEffect(() => {
    if (typeof document === undefined) return;

    $(function () {
      $(".post-container a.footnote-ref").each((_, item) => {
        const href = $(item).attr("href")?.slice(1);
        const text = $("#" + href)
          .text()
          .replace("↩", "");

        $(item).attr("data-tooltip", text);
      });
    });
  }, []);

  return (
    <DefaultTemplate>
      <SEO
        title={frontmatter.title}
        description={excerpt}
        meta={[
          {
            name: `article:published_time`,
            content: dayjs(fields.date).locale("ko").format(),
          },
        ]}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(applicationLdJson)}
        </script>
      </Helmet>

      <h1 className="post-title">{frontmatter.title}</h1>

      <span className="post-date">
        Written on {dayjs(fields.date).locale("en").format("LL")}
      </span>

      <div className="post-content">
        {/* <MDXProvider> */}
        <MDXRenderer>{body}</MDXRenderer>
        {/* </MDXProvider> */}
      </div>

      <PostFooter tags={frontmatter.tags} comment={frontmatter.comments} />
    </DefaultTemplate>
  );
};

export default SnippetTemplate;

export const snippetQuery = graphql`
  query SnippetBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      tableOfContents
      excerpt(truncate: true)
      fields {
        slug
        date
      }
      frontmatter {
        title
        tags
        image
        comments
      }
    }
  }
`;
