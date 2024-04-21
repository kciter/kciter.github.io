import React from "react";
import Social from "@components/Social";
import { Link } from "gatsby";
import styled from "@emotion/styled";

const Header = () => {
  const menus = [
    { name: "Writing", path: "/writing" },
    // { name: "Snippet", path: "/snippets" },
    { name: "About", path: "/about" },
  ];

  return (
    <Container>
      <TitleContainer>
        <Title href="/">kciter.so</Title>
        <Subtitle>devlog</Subtitle>
      </TitleContainer>
      
      <MenuContainer>
        <Menu>
          <a href="https://kciter.so/resume" target="_blank">
            Résumé
          </a>
          {menus.map(item => (
            <React.Fragment key={item.name}>
              <Link to={item.path}>{item.name}</Link>
            </React.Fragment>
          ))}
        </Menu>

        <SocialIcons>
          <Social />
        </SocialIcons>
      </MenuContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  margin-bottom: 40px;
  font-family: "Quattrocento Sans", sans-serif;

  margin-left: -16px;
  margin-right: -16px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(44px);
  padding: 10px 16px;
  border-radius: 12px;

  @media (max-width: 30rem) {
    margin-top: -16px;
    margin-left: -16px;
    margin-right: -16px;
    margin-bottom: 32px;
    border-radius: 0;
    grid-template-columns: 1fr;
    background: none;
  }
`

const TitleContainer = styled.div`
  width: 100%;
  margin-top: 8px;
`

const Title = styled.a`
  font-size: 32px;
  font-weight: 900;
  text-decoration: none;
  color: #505050;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    color: black;
  }
`

const Subtitle = styled.small`
  color: #999;
`

const MenuContainer = styled.nav`
  width: 100%;
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;

  
`

const Menu = styled.div`
  a {
    color: black;
    font-size: 1rem;
    padding-right: 15px;
    text-decoration: none;

    &:last-of-type {
      padding-right: 0;
    }
  }
`

const SocialIcons = styled.div`
  a {
    color: #999;
    font-size: 1rem;
  }

  @media (max-width: 30em) {
    a {
      color: black;
    }
  }
`