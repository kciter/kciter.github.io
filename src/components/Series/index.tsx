import React from 'react';
import { useEffect } from 'react';
import Sticky from 'sticky-js';

interface Item {
  url: string;
  title: string;
}

interface SeriesProps {
  items: [Item];
  title: string;
  currentItem: string;
}

const List = ({ items, currentItem }: { items: [Item]; currentItem: string }) => {
  return (
    <ul>
      {items.map(item => {
        return (
          <li
            key={item.url}
            style={currentItem === item.title ? { color: 'red', fontWeight: 'bold' } : undefined}
          >
            <a href={item.url}>{item.title}</a>
          </li>
        );
      })}
    </ul>
  );
};

const Series = ({ items, title, currentItem }: SeriesProps) => {
  useEffect(() => {
    if (typeof document === undefined) return;
    new Sticky('.series');
  }, [items]);

  return (
    <div className="series" data-margin-top="50">
      <h4>{title}</h4>
      <List items={items} currentItem={currentItem} />
    </div>
  );
};

export default Series;
