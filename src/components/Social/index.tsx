import React from "react";

const Social = () => {
  const items = [
    { icon: "github", link: "https://github.com/kciter" },
    { icon: "facebook", link: "https://www.facebook.com/sunhyoup.lee/" },
    { icon: "envelope", link: "mailto:kciter@naver.com" },
    { icon: "rss-square", link: "/feed.xml" },
  ];

  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={item.icon}>
          <a
            href={item.link}
            target="_blank"
            style={{ marginRight: index !== items.length - 1 ? 5 : undefined }}
          >
            <i className={`fa fa-${item.icon}`} aria-hidden="true" />
          </a>
        </React.Fragment>
      ))}
    </>
  );
};

export default Social;
