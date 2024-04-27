import React, { useEffect, useRef, useState } from 'react';
import { ASCII3DRenderer as Renderer } from './renderer';

export const ASCII3DRenderer = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderer = new Renderer(ref.current, 80, 40);
    renderer.loadFromString(mesh);
    renderer.run();
  }, [ref.current]);

  const [width, setWidth] = useState<number>(0);

  const handleResize = () => {
    setWidth(ref.current?.clientWidth || 0);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        fontSize: (width / 700) * 14,
        lineHeight: 1,
        width: '100%',
        fontFamily: 'monospace'
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
