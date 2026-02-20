import React, { useRef, useEffect, useState } from 'react';

const GRAVITY = 0.15;
const DRAG = 0.02;
const COUNT = 80;

const COLORS = ['#228be6', '#40c057', '#fab005', '#fa5252', '#845ef7', '#ff922b'];

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
}

function createBurst(cx: number, cy: number): Confetti[] {
  return Array.from({ length: COUNT }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
    const speed = 4 + Math.random() * 6;
    return {
      x: cx + (Math.random() - 0.5) * 20,
      y: cy,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
      vy: Math.sin(angle) * speed - Math.random() * 2,
      w: 4 + Math.random() * 4,
      h: 6 + Math.random() * 8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 1
    };
  });
}

export const ConfettiDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Confetti[]>([]);
  const [active, setActive] = useState(false);

  const launch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.getBoundingClientRect().width;
    particlesRef.current = createBurst(W / 2, 20);
    setActive(true);
  };

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.getBoundingClientRect().width;
    const H = canvas.getBoundingClientRect().height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = false;

      for (const p of particlesRef.current) {
        if (p.opacity <= 0) continue;
        alive = true;

        // 1. 힘: 중력 + 공기 저항
        p.vy += GRAVITY;
        p.vx *= 1 - DRAG;
        p.vy *= 1 - DRAG * 0.5;

        // 2. 적분
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // 3. 제약: 바닥 근처에서 페이드아웃
        if (p.y > H - 20) {
          p.opacity -= 0.05;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (alive) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setActive(false);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return (
    <div
      style={{
        border: '1px solid #dee2e6',
        borderRadius: 8,
        padding: 20,
        margin: '24px 0',
        background: '#fff'
      }}
    >
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: 220,
            display: 'block',
            borderRadius: 8,
            background: '#f8f9fa'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            textAlign: 'center'
          }}
        >
          <button
            onClick={launch}
            style={{
              padding: '8px 24px',
              borderRadius: 20,
              border: 'none',
              background: '#228be6',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            발사
          </button>
        </div>
      </div>
      <div
        style={{
          fontSize: 11,
          color: '#adb5bd',
          textAlign: 'center',
          marginTop: 10
        }}
      >
        규칙만 정의하면 자연스러운 움직임이 만들어진다
      </div>
    </div>
  );
};
