import React from "react";

interface ImageProps {
  src: string;
  caption?: string;
  width?: number;
}

const Image = ({ src, caption, width }: ImageProps) => {
  return (
    <figure>
      <img src={src} width={width} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default Image;
