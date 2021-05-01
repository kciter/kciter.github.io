import React from "react";
import DefaultTemplate from "@templates/default";
import SEO from "@components/SEO";
import { graphql, useStaticQuery } from "gatsby";
import dayjs from "dayjs";

dayjs.extend(require("dayjs/plugin/localizedFormat"));

const Snippets = () => {
  const result = useStaticQuery(graphql`
    {
      allMdx(
        sort: { fields: [fields___date], order: DESC }
        filter: { fields: { type: { eq: "snippet" } } }
      ) {
        group(field: fields___year) {
          edges {
            node {
              fields {
                date
                year
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  `);

  const group = result.allMdx.group.reverse();

  return (
    <DefaultTemplate>
      <SEO title="Snippets" />

      <div>
        {group.map((item: any) => {
          const year = item.edges[0].node.fields.year;
          return (
            <React.Fragment key={year}>
              <h1>{year}</h1>
              {item.edges.map((post: any) => (
                <div className="posts" key={post.node.fields.slug}>
                  <a href={post.node.fields.slug}>
                    {post.node.frontmatter.title}
                  </a>
                  <span className="post-date">
                    <i className="fa fa-calendar" aria-hidden="true" />{" "}
                    {dayjs(post.node.fields.date).locale("en").format("LL")}
                  </span>
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </DefaultTemplate>
  );
};

export default Snippets;
