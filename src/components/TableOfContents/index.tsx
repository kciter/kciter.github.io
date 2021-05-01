import React from "react";
import { useEffect } from "react";
import Sticky from "sticky-js";

interface Item {
  url: string;
  title: string;
  items?: [Item];
}

interface TableOfContentsProps {
  items: [Item];
}

const List = ({ items }: TableOfContentsProps) => {
  return (
    <ul>
      {items.map(item => {
        return (
          <li key={item.url}>
            <a href={item.url}>{item.title}</a>

            {item.items && <List items={item.items} />}
          </li>
        );
      })}
    </ul>
  );
};

const TableOfContents = ({ items }: TableOfContentsProps) => {
  useEffect(() => {
    if (typeof document === undefined) return;
    new Sticky(".toc");
  }, []);

  return (
    <div className="toc" data-margin-top="50">
      <List items={items} />
    </div>
  );
};

export default TableOfContents;
