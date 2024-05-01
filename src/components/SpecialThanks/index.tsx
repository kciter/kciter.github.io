import styled from '@emotion/styled';
import React from 'react';

interface Sponsor {
  avatar: string;
  name: string;
  url: string;
}

const sponsors: Sponsor[] = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/82202674?v=4',
    name: 'seohyeon2222',
    url: 'https://github.com/seohyeon2222'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/25360781?v=4',
    name: 'ibcylon',
    url: 'https://github.com/ibcylon'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/118495919?v=4',
    name: '18-12847',
    url: 'https://github.com/18-12847'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/22555243?v=4',
    name: 'light8reeze',
    url: 'https://github.com/light8reeze'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/17980230?v=4',
    name: 'TerryChoi',
    url: 'https://github.com/JongtaekChoi'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/6335605?v=4',
    name: 'pilgwon',
    url: 'https://github.com/pilgwon'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/62709718?v=4',
    name: 'Wonse Shin',
    url: 'https://github.com/shinwonse'
  }
];

const SpecialThanks = () => {
  return (
    <Container>
      <Title>이 글을 후원해주신 고마운 분들</Title>

      <SponsorContainer>
        <Sponsors>
          {sponsors.map(sponser => (
            <a key={sponser.name} href={sponser.url} target="_blank" style={{ marginRight: 4 }}>
              <Sponsor src={sponser.avatar} alt={sponser.name} />
            </a>
          ))}
        </Sponsors>

        <SponsorButton href="https://github.com/sponsors/kciter" target="_blank">
          <svg height="14" viewBox="0 0 16 16" version="1.1" width="14">
            <path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path>
          </svg>

          <span>Sponsor</span>
        </SponsorButton>
      </SponsorContainer>
    </Container>
  );
};

export default SpecialThanks;

const Container = styled.div`
  margin-bottom: 8px;
`;

const Title = styled.div`
  margin-top: 48px;
  color: #454f5b;
  margin: 8px 0;
  font-size: 1.3em;
  font-weight: bold;
`;

const SponsorContainer = styled.div`
  display: flex;
`;

const Sponsors = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 30rem) {
    a:not(:first-of-type) {
      margin-left: -16px;
    }
  }
`;

const Sponsor = styled.img`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
`;

const SponsorButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 32px;
  border-radius: 7px;
  text-decoration: none;
  border: 1px solid #e1e4e8 !important;
  background-color: #fafbfc;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;

  svg {
    fill: red;
    margin-right: 4px;
  }

  &:hover {
    background-color: #f0f3f6;
  }
`;
