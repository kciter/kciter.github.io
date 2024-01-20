import Social from "@components/Social";
import React from "react";

const PostBio = () => {
  return (
    <div className="post-bio-container">
      <div className="avatar">
        <img src="/images/about/avatar.jpg" />
      </div>

      <div className="summary">
        <div>
          Written by{" "}
          <a className="name" href="/about">
            @kciter
          </a>
        </div>
        <div className="description">
          가치있는 지식이 되기를 바라며 / CoBalt. CTO.
        </div>
        <div className="socials">
          <Social />
        </div>
      </div>
    </div>
  );
};

export default PostBio;
