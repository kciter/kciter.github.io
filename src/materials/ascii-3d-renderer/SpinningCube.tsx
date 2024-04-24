import React, { useRef } from 'react';

const width = 60;
const height = 22;
let A = 0,
  B = 0,
  C = 0;

let cubeWidth = 20;
let zBuffer = new Array(width * height).fill(0);
let buffer = new Array(width * height).fill(' ');
const distanceFromCam = 100;
const K1 = 40;

let x, y, z;
let ooz;
let xp, yp;
let idx;

function calculateX(i: number, j: number, k: number) {
  return (
    j * Math.sin(A) * Math.sin(B) * Math.cos(C) -
    k * Math.cos(A) * Math.sin(B) * Math.cos(C) +
    j * Math.cos(A) * Math.sin(C) +
    k * Math.sin(A) * Math.sin(C) +
    i * Math.cos(B) * Math.cos(C)
  );
}

function calculateY(i: number, j: number, k: number) {
  return (
    j * Math.cos(A) * Math.cos(C) +
    k * Math.sin(A) * Math.cos(C) -
    j * Math.sin(A) * Math.sin(B) * Math.sin(C) +
    k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
    i * Math.cos(B) * Math.sin(C)
  );
}

function calculateZ(i: number, j: number, k: number) {
  return k * Math.cos(A) * Math.cos(B) - j * Math.sin(A) * Math.cos(B) + i * Math.sin(B);
}

function calculateForSurface(cubeX: number, cubeY: number, cubeZ: number, ch: string) {
  x = calculateX(cubeX, cubeY, cubeZ);
  y = calculateY(cubeX, cubeY, cubeZ);
  z = calculateZ(cubeX, cubeY, cubeZ) + distanceFromCam;

  ooz = 1 / z;

  xp = Math.floor(width / 2 + K1 * ooz * x * 2);
  yp = Math.floor(height / 2 + K1 * ooz * y);

  idx = xp + yp * width;
  if (idx >= 0 && idx < width * height) {
    if (ooz > zBuffer[idx]) {
      zBuffer[idx] = ooz;
      buffer[idx] = ch;
    }
  }
}

export const SpinningCube = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    let fpsInterval = 24;
    let then = Date.now();
    let handleId: number;

    function animate() {
      const now = Date.now();
      const elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        buffer.fill('.');
        zBuffer.fill(0);
        cubeWidth = 12;

        // First cube
        for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += 0.6) {
          for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += 0.6) {
            calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
            calculateForSurface(cubeWidth, cubeY, cubeX, '$');
            calculateForSurface(-cubeWidth, cubeY, -cubeX, '%');
            calculateForSurface(-cubeX, cubeY, cubeWidth, '#');
            calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
            calculateForSurface(cubeX, cubeWidth, cubeY, '+');
          }
        }

        setResult(buffer.join('').replace(/.{60}/g, '$&<br />').replace(/\./g, '&nbsp;'));

        A += 0.05;
        B += 0.05;
        C += 0.01;
      }

      handleId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(handleId);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'monospace',
        fontSize: ((ref.current?.clientWidth || 0) / 700) * 14,
        lineHeight: (ref.current?.clientWidth || 0) < 500 ? 1.8 : 1.4,
        textAlign: 'center'
      }}
      dangerouslySetInnerHTML={{ __html: result }}
    />
  );
};
