import React from "react";
import Social from "@components/Social";
import { Link } from "gatsby";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Social />

        <div className="post-date">
          <Link to="/menus/about">kciter.so | devlog by Lee Sun-Hyoup</Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
