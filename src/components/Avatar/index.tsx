import React from "react";

interface Props {
  src: string;
  alt?: string;
}

const Avatar = ({ src, alt }: Props) => {
  return (
    <div className="avatar">
      <img src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
