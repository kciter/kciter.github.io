import React, { useLayoutEffect } from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';
import DefaultTemplate from '@templates/default';
import SEO from '@components/SEO';
import dayjs from 'dayjs';
import PostFooter from '@components/PostFooter';
import RelatedPost from '@components/RelatedPost';
import TableOfContents from '@components/TableOfContents';
import { Helmet } from 'react-helmet';
import $ from 'jquery';
import { useEffect } from 'react';
import { useState } from 'react';
import Series from '@components/Series';
import styled from '@emotion/styled';

dayjs.extend(require('dayjs/plugin/localizedFormat'));

const PostTemplate = ({ data, location, pageContext, children }: PageProps) => {
  const { tableOfContents, fields, frontmatter, excerpt } = (data as any).mdx;

  const { series } = pageContext as any;

  const author = 'Lee Sun-Hyoup';
  const date = dayjs(fields.date).locale('ko').format();
  const applicationLdJson = {
    headline: frontmatter.title,
    dateModified: date,
    datePublished: date,
    image: `${location.href}${frontmatter.image}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': location.href
    },
    author: { '@type': 'Person', name: author },
    url: location.href,
    description: excerpt,
    '@type': 'BlogPosting',
    '@context': 'https://schema.org'
  };

  useEffect(() => {
    if (typeof document === undefined) return;

    $(function () {
      $('.post-container a[data-footnote-ref]').each((_, item) => {
        const href = $(item).attr('href')?.slice(1);
        const text = $('#' + href)
          .text()
          .replace('↩', '');

        $(item).attr('data-tooltip', text);
      });
    });
  }, []);

  const [posts, setPosts] = useState();
  useEffect(() => {
    setPosts(
      (data as any).allMdx.edges
        .filter((item: any) => item.node.fields.slug !== fields.slug)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)
    );
  }, []);

  const draft = frontmatter.draft && process.env.NODE_ENV !== 'development';

  return (
    <DefaultTemplate>
      <SEO
        title={frontmatter.title}
        description={excerpt}
        meta={[
          {
            name: `article:published_time`,
            content: dayjs(fields.date).locale('ko').format()
          },
          {
            name: `image`,
            content: `https://kciter.so${frontmatter.image}`
          },
          {
            property: `og:image`,
            content: `https://kciter.so${frontmatter.image}`
          },
          {
            property: `og:image:secure_url`,
            content: `https://kciter.so${frontmatter.image}`
          }
        ]}
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(applicationLdJson)}</script>
      </Helmet>

      <h1 className="post-title">{frontmatter.title}</h1>

      <span className="post-date">Written on {dayjs(fields.date).locale('en').format('LL')}</span>

      {frontmatter.image && <img src={frontmatter.image} style={{ width: '100%' }} />}

      {draft || (tableOfContents.items && <TableOfContents items={tableOfContents.items} />)}

      {draft ||
        (series?.items && (
          <Series title={series.title} items={series.items} currentItem={frontmatter.title} />
        ))}

      <div className="post-content">
        {draft ? <NotYetPublished>Not yet published</NotYetPublished> : children}
      </div>

      <PostFooter tags={frontmatter.tags} comment={frontmatter.comments} />

      {posts && <RelatedPost posts={posts} current={fields.slug} />}
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
      excerpt
      fields {
        slug
        date
      }
      frontmatter {
        title
        categories
        tags
        image
        comments
        draft
      }
    }
    allMdx(
      filter: {
        fields: { type: { eq: "post" } }
        frontmatter: { draft: { ne: true }, hide: { ne: true } }
      }
    ) {
      edges {
        node {
          fields {
            date
            slug
          }
          frontmatter {
            title
            image
          }
        }
      }
    }
  }
`;

const NotYetPublished = styled.div`
  margin: 16px 0;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;
