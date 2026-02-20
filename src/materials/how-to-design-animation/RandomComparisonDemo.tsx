import React, { useRef, useEffect } from 'react';

const COUNT = 40;
const GRAVITY = 0.03;
const CYCLE = 3500;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

function createUncontrolled(cx: number, cy: number): Particle[] {
  return Array.from({ length: COUNT }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5; // 0~5: 일부는 거의 안 움직임
    return {
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1 + Math.random() * 8, // 1~9: 극단적 크기 차이
      opacity: 1,
      hue: Math.random() * 360, // 완전 무작위 색상
    };
  });
}

function createControlled(cx: number, cy: number): Particle[] {
  const baseHue = 20 + Math.random() * 30;
  return Array.from({ length: COUNT }, (_, i) => {
    const base = (i / COUNT) * Math.PI * 2;
    const angle = base + (Math.random() - 0.5) * 0.3; // 균등 배치 + 미세 편차
    const speed = 2 + Math.random() * 1.5; // 2~3.5: 일관된 속도 범위
    return {
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 2.5 + Math.random() * 1.5, // 2.5~4: 좁은 크기 범위
      opacity: 1,
      hue: baseHue + (Math.random() - 0.5) * 40, // 통일된 색상 계열
    };
  });
}

export const RandomComparisonDemo = () => {
  const c1Ref = useRef<HTMLCanvasElement>(null);
  const c2Ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const c1 = c1Ref.current;
    const c2 = c2Ref.current;
    if (!c1 || !c2) return;

    const dpr = window.devicePixelRatio || 1;
    const W = c1.getBoundingClientRect().width;
    const H = c1.getBoundingClientRect().height;

    c1.width = W * dpr;
    c1.height = H * dpr;
    c2.width = W * dpr;
    c2.height = H * dpr;

    const ctx1 = c1.getContext('2d')!;
    const ctx2 = c2.getContext('2d')!;
    ctx1.scale(dpr, dpr);
    ctx2.scale(dpr, dpr);

    const bg = '#0f0f1e';
    ctx1.fillStyle = bg;
    ctx1.fillRect(0, 0, W, H);
    ctx2.fillStyle = bg;
    ctx2.fillRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H / 2;
    let p1: Particle[] = createUncontrolled(cx, cy);
    let p2: Particle[] = createControlled(cx, cy);
    let lastBurst = performance.now();

    const step = (
      ctx: CanvasRenderingContext2D,
      particles: Particle[],
    ) => {
      ctx.fillStyle = 'rgba(15, 15, 30, 0.2)';
      ctx.fillRect(0, 0, W, H);
      for (const p of particles) {
        if (p.opacity <= 0) continue;
        p.vy += GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.opacity -= 0.008;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${Math.max(0, p.opacity)})`;
        ctx.fill();
      }
    };

    const animate = (now: number) => {
      if (now - lastBurst > CYCLE) {
        lastBurst = now;
        ctx1.fillStyle = bg;
        ctx1.fillRect(0, 0, W, H);
        ctx2.fillStyle = bg;
        ctx2.fillRect(0, 0, W, H);
        p1 = createUncontrolled(cx, cy);
        p2 = createControlled(cx, cy);
      }

      step(ctx1, p1);
      step(ctx2, p2);
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
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <canvas
            ref={c1Ref}
            style={{
              width: '100%',
              height: 200,
              display: 'block',
              borderRadius: 8,
            }}
          />
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#868e96',
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            순수 랜덤
          </div>
          <div style={{ fontSize: 10, color: '#adb5bd', marginTop: 6, lineHeight: 1.7, paddingLeft: 4 }}>
            속도 <span style={{ color: '#868e96' }}>0 ~ 5</span>
            <br />
            크기 <span style={{ color: '#868e96' }}>1 ~ 9</span>
            <br />
            색상 <span style={{ color: '#868e96' }}>0° ~ 360°</span>
            <br />
            분포 <span style={{ color: '#868e96' }}>무작위</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <canvas
            ref={c2Ref}
            style={{
              width: '100%',
              height: 200,
              display: 'block',
              borderRadius: 8,
            }}
          />
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#868e96',
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            통제된 랜덤
          </div>
          <div style={{ fontSize: 10, color: '#adb5bd', marginTop: 6, lineHeight: 1.7, paddingLeft: 4 }}>
            속도 <span style={{ color: '#868e96' }}>2 ~ 3.5</span>
            <br />
            크기 <span style={{ color: '#868e96' }}>2.5 ~ 4</span>
            <br />
            색상 <span style={{ color: '#868e96' }}>기준 hue ± 20°</span>
            <br />
            분포 <span style={{ color: '#868e96' }}>균등 배치 + 미세 편차</span>
          </div>
        </div>
      </div>
    </div>
  );
};
