import React from "react";
import Social from "@components/Social";
import { Link } from "gatsby";

const Header = () => {
  const menus = [
    { name: "Writing", path: "writing" },
    { name: "About", path: "about" },
  ];

  return (
    <header className="masthead">
      <h3 className="masthead-title">
        <a href="/" style={{ marginRight: 5 }}>
          kciter.so
        </a>
        <small className="masthead-subtitle">devlog</small>
        <div className="menu">
          <nav className="menu-content">
            <a href="https://kciter.so/resume" target="_blank">
              Résumé
            </a>
            {menus.map(item => (
              <React.Fragment key={item.name}>
                <Link to={`/menus/${item.path}`}>{item.name}</Link>
              </React.Fragment>
            ))}
          </nav>
          <nav className="social-icons">
            <Social />
          </nav>
        </div>
      </h3>
    </header>
  );
};

export default Header;
