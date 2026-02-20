import React, { useRef, useEffect } from 'react';

// Shader-style hash (음수에도 안전)
function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function noise2d(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = smoothstep(x - ix);
  const fy = smoothstep(y - iy);

  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);

  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

const COUNT = 1000;
const SCALE = 0.006;
const SPEED = 1.2;

interface Particle {
  x: number;
  y: number;
  px: number;
  py: number;
}

export const NoiseFlowDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.getBoundingClientRect().width;
    const H = canvas.getBoundingClientRect().height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#0f0f1e';
    ctx.fillRect(0, 0, W, H);

    let time = 0;
    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const x = Math.random() * W;
      const y = Math.random() * H;
      return { x, y, px: x, py: y };
    });

    const animate = () => {
      time += 0.003;

      // 반투명 배경으로 잔상
      ctx.fillStyle = 'rgba(15, 15, 30, 0.03)';
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        p.px = p.x;
        p.py = p.y;

        // 노이즈에서 각도를 얻음
        const angle =
          noise2d(p.x * SCALE + time, p.y * SCALE) * Math.PI * 4;

        p.x += Math.cos(angle) * SPEED;
        p.y += Math.sin(angle) * SPEED;

        // 화면 밖으로 나가면 반대편에서 등장
        if (p.x < 0) {
          p.x += W;
          p.px = p.x;
        }
        if (p.x > W) {
          p.x -= W;
          p.px = p.x;
        }
        if (p.y < 0) {
          p.y += H;
          p.py = p.y;
        }
        if (p.y > H) {
          p.y -= H;
          p.py = p.y;
        }

        // 위치 기반 색상 (노이즈로 부드러운 그라데이션)
        const hue = 200 + noise2d(p.x * 0.005, p.y * 0.005 + 100) * 60;

        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `hsla(${hue}, 70%, 65%, 0.4)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      style={{
        border: '1px solid #dee2e6',
        borderRadius: 8,
        padding: 20,
        margin: '24px 0',
        background: '#fff',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: 250,
          display: 'block',
          borderRadius: 8,
        }}
      />
      <div
        style={{
          fontSize: 11,
          color: '#adb5bd',
          textAlign: 'center',
          marginTop: 10,
        }}
      >
        노이즈 함수가 만드는 흐름 — 인접한 파티클이 비슷한 방향으로 움직여 유기적 패턴이 생긴다
      </div>
    </div>
  );
};
