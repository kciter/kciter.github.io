import React, { useEffect, useRef } from "react";
import { ASCII3DRenderer as Renderer } from "./renderer";

export const ASCII3DRenderer = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderer = new Renderer(ref.current, 100, 40);
    renderer.loadFromString(mesh);
    renderer.run();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        fontSize: 12,
        width: "100%",
        fontFamily: "monospace",
        lineHeight: 1,
      }}
    />
  );
};

const mesh = `
# Blender v2.90.1 OBJ File: ''
# www.blender.org
o Cube
v -1.000000 1.000000 1.000000
v -1.000000 -1.000000 1.000000
v -1.000000 1.000000 -1.000000
v -1.000000 -1.000000 -1.000000
v 1.000000 1.000000 1.000000
v 1.000000 -1.000000 1.000000
v 1.000000 1.000000 -1.000000
v 1.000000 -1.000000 -1.000000
s off
f 5 3 1
f 3 8 4
f 7 6 8
f 2 8 6
f 1 4 2
f 5 2 6
f 5 7 3
f 3 7 8
f 7 5 6
f 2 4 8
f 1 3 4
f 5 1 2
`;
