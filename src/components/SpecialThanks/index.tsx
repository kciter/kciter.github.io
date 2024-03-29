import Avatar from "@components/Avatar";
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
];

const SpecialThanks = () => {
  return (
    <div className="special-thanks">
      <h3>이 글을 후원해주신 고마운 분들</h3>
      <div className="sponsors">
        <div className="avatars">
          {sponsors.map(sponser => (
            <a
              key={sponser.name}
              href={sponser.url}
              target="_blank"
              style={{ marginRight: 4 }}
            >
              <Avatar src={sponser.avatar} />
            </a>
          ))}
        </div>
        <iframe
          src="https://github.com/sponsors/kciter/button"
          title="Sponsor kciter"
          style={{ border: 0 }}
          className="sponser-button"
        ></iframe>
      </div>
    </div>
  );
};

export default SpecialThanks;
