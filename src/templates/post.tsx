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

dayjs.extend(require("dayjs/plugin/localizedFormat"));

const PostTemplate = ({ data, location }: PageProps) => {
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
          {
            name: `og:image`,
            content: `${location.href}${frontmatter.image}`,
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

      <img src={frontmatter.image} />

      <TableOfContents items={tableOfContents.items} />

      <div className="post-content">
        <MDXProvider>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </div>

      <PostFooter tags={frontmatter.tags} comment={frontmatter.comments} />
      <RelatedPost current={fields.slug} />
    </DefaultTemplate>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
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
        author
        categories
        tags
        image
        comments
      }
    }
  }
`;
