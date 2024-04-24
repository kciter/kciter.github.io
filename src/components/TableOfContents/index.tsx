import styled from '@emotion/styled';
import React from 'react';
import { useEffect } from 'react';
import Sticky from 'sticky-js';

interface Item {
  url: string;
  title: string;
  items?: [Item];
}

export interface TableOfContentsProps {
  items: [Item];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  useEffect(() => {
    if (typeof document === undefined) return;
    new Sticky('.toc');
  }, [items]);

  return (
    <Container className="toc" data-margin-top="50">
      <ListContainer>
        {items.map(item => {
          return (
            <li key={item.url}>
              <a href={item.url}>{item.title}</a>

              {item.items && <List items={item.items} />}
            </li>
          );
        })}
      </ListContainer>
    </Container>
  );
};

export default TableOfContents;

const Container = styled.div`
  position: absolute;
  right: -20px;
  transform: translateX(100%);
  max-width: 250px;
  max-height: 80vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 1400px) {
    display: none;
  }
`;

const List = ({ items }: TableOfContentsProps) => {
  return (
    <ListContainer>
      {items.map(item => {
        return (
          <li key={item.url}>
            <a href={item.url}>{item.title}</a>

            {item.items && <List items={item.items} />}
          </li>
        );
      })}
    </ListContainer>
  );
};

const ListContainer = styled.ul`
  margin: 0 0 8px 0;
  padding: 0;
  max-width: 250px;
  width: 100%;
  height: 100%;

  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li ul {
    margin-left: 16px;
    border-left: 1px solid #dfe3e8;
  }
  a {
    display: block;
    margin-left: 6px;
    padding: 8px 12px 8px 12px;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
    text-decoration: none;
    color: #454f5b;
    border-radius: 4px;
    word-break: keep-all;
  }
  a:hover {
    color: #212b36;
    background-color: #f4f6f8;
  }
`;
