import styled from "@emotion/styled";
import React from "react";

interface Sponsor {
  avatar: string;
  name: string;
  url: string;
}

const sponsors: Sponsor[] = [
  {
    avatar: "https://avatars.githubusercontent.com/u/82202674?v=4",
    name: "seohyeon2222",
    url: "https://github.com/seohyeon2222",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/25360781?v=4",
    name: "ibcylon",
    url: "https://github.com/ibcylon",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/118495919?v=4",
    name: "18-12847",
    url: "https://github.com/18-12847",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/22555243?v=4",
    name: "light8reeze",
    url: "https://github.com/light8reeze",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/17980230?v=4",
    name: "TerryChoi",
    url: "https://github.com/JongtaekChoi",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/6335605?v=4",
    name: "pilgwon",
    url: "https://github.com/pilgwon",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/62709718?v=4",
    name: "Wonse Shin",
    url: "https://github.com/shinwonse",
  },
];

const SpecialThanks = () => {
  return (
    <Container>
      <Title>이 글을 후원해주신 고마운 분들</Title>

      <SponsorContainer>
        <Sponsors>
          {sponsors.map(sponser => (
            <a
              key={sponser.name}
              href={sponser.url}
              target="_blank"
              style={{ marginRight: 4 }}
            >
              <Sponsor src={sponser.avatar} alt={sponser.name} />
            </a>
          ))}
        </Sponsors>

        <iframe
          src="https://github.com/sponsors/kciter/button"
          title="Sponsor kciter"
          style={{ border: 0 }}
          className="sponser-button"
        ></iframe>
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

  .sponser-button {
    width: 120px;
    height: 32px;
    border-radius: 7px;
    background-color: white;
    color-scheme: light;
  }
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
