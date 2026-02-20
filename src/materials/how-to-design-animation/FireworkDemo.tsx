import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  hue: number;
}

const PARTICLE_COUNT = 40;
const GRAVITY = 0.05;

export const FireworkDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    type Phase = 'launch' | 'spread' | 'pause';
    type SubPhase = 'explode' | 'spread' | 'fade';

    let phase: Phase = 'launch';
    let subPhase: SubPhase = 'spread';
    let t = 0;
    let launchX = W * 0.5;
    let peakY = H * 0.25;
    let particles: Particle[] = [];
    let animId = 0;
    let hue = 30;
    let explodeRadius = 0;

    const setLabel = (text: string) => {
      if (labelRef.current) labelRef.current.textContent = text;
    };

    const reset = () => {
      phase = 'launch';
      t = 0;
      launchX = W * (0.3 + Math.random() * 0.4);
      peakY = H * (0.15 + Math.random() * 0.15);
      hue = Math.random() * 360;
      particles = [];
      explodeRadius = 0;
      setLabel('발사');
    };

    const explode = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        return {
          x: launchX,
          y: peakY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          opacity: 1,
          hue: hue + (Math.random() - 0.5) * 50,
        };
      });
    };

    ctx.fillStyle = '#0f0f1e';
    ctx.fillRect(0, 0, W, H);
    reset();

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 30, 0.25)';
      ctx.fillRect(0, 0, W, H);

      if (phase === 'launch') {
        t += 0.014;
        const progress = Math.min(1, t);
        const eased = progress * progress;
        const currentY = H - (H - peakY) * eased;

        ctx.beginPath();
        ctx.arc(launchX, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue}, 80%, 75%)`;
        ctx.fill();

        for (let i = 1; i <= 4; i++) {
          const ty = currentY + i * 5;
          if (ty > H) continue;
          ctx.beginPath();
          ctx.arc(
            launchX + (Math.random() - 0.5) * 2,
            ty,
            Math.max(0.5, 2.5 - i * 0.5),
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = `hsla(${hue}, 60%, 65%, ${1 - i * 0.25})`;
          ctx.fill();
        }

        if (progress >= 1) {
          phase = 'spread';
          subPhase = 'explode';
          t = 0;
          explode();
          explodeRadius = 0;
          setLabel('폭발');
        }
      } else if (phase === 'spread') {
        t++;

        if (subPhase === 'explode') {
          explodeRadius += 4;
          const flashOpacity = Math.max(0, 1 - explodeRadius / 40);
          ctx.beginPath();
          ctx.arc(launchX, peakY, explodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 80%, 85%, ${flashOpacity})`;
          ctx.fill();

          if (t > 10) {
            subPhase = 'spread';
            setLabel('확산');
          }
        }

        let aliveCount = 0;
        let totalOpacity = 0;

        for (const p of particles) {
          if (p.opacity <= 0) continue;
          aliveCount++;
          totalOpacity += p.opacity;

          p.vy += GRAVITY;
          p.x += p.vx;
          p.y += p.vy;
          p.opacity -= 0.007;
          p.vx *= 0.99;
          p.vy *= 0.99;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${Math.max(0, p.opacity)})`;
          ctx.fill();
        }

        const avgOpacity = aliveCount > 0 ? totalOpacity / aliveCount : 0;

        if (subPhase === 'spread' && avgOpacity < 0.35) {
          subPhase = 'fade';
          setLabel('소멸');
        }

        if (aliveCount === 0 || t > 220) {
          phase = 'pause';
          t = 0;
        }
      } else {
        t++;
        if (t > 80) {
          ctx.fillStyle = '#0f0f1e';
          ctx.fillRect(0, 0, W, H);
          reset();
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <span style={{ fontSize: 11, color: '#adb5bd' }}>
          발사 → 폭발 → 확산 → 소멸
        </span>
        <span
          ref={labelRef}
          style={{
            fontSize: 12,
            color: '#228be6',
            fontWeight: 600,
            padding: '2px 8px',
            background: '#e7f5ff',
            borderRadius: 4,
          }}
        >
          발사
        </span>
      </div>
    </div>
  );
};
