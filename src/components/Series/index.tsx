import styled from '@emotion/styled';
import { Link } from 'gatsby';
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

const Series = ({ items, title, currentItem }: SeriesProps) => {
  return (
    <SeriesContainer>
      <SeriesTitle>{title}</SeriesTitle>
      <SeriesList>
        {items.map(item => {
          return (
            <SeriesItem
              key={item.url}
              style={currentItem === item.title ? { color: '#00a962' } : undefined}
            >
              <Link
                to={item.url}
                style={currentItem === item.title ? { fontWeight: 'bold' } : undefined}
              >
                {item.title}
              </Link>
            </SeriesItem>
          );
        })}
      </SeriesList>
    </SeriesContainer>
  );
};

export default Series;

const SeriesContainer = styled.div`
  width: 100%;
  margin-top: 8px;
  padding: 16px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-sizing: border-box;
`;

const SeriesTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SeriesList = styled.ul`
  /* list-style: none; */
  padding: 0;
  padding-left: 24px;
  margin: 0;
`;

const SeriesItem = styled.li`
  a {
    text-decoration: none;
    color: #333;
  }
`;
