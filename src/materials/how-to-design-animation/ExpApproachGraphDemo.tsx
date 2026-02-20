import React, { useRef, useEffect } from 'react';

const GRAPH_W = 280;
const GRAPH_H = 160;
const DURATION = 2;
const PAUSE = 1.2;
const CYCLE = DURATION + PAUSE;
const FPS = 60;

const CURVES = [
  { factor: 0.03, color: '#228be6', label: '0.03' },
  { factor: 0.1,  color: '#fab005', label: '0.1' },
  { factor: 0.3,  color: '#fa5252', label: '0.3' },
];

// 닫힌 형태: value(t) = 1 - (1 - factor)^(fps * t)
function expValue(t: number, factor: number): number {
  return 1 - Math.pow(1 - factor, FPS * t);
}

export const ExpApproachGraphDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = GRAPH_W * dpr;
    canvas.height = GRAPH_H * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const start = performance.now();

    const animate = (now: number) => {
      const t = Math.min(((now - start) / 1000) % CYCLE, DURATION);

      ctx.clearRect(0, 0, GRAPH_W, GRAPH_H);

      const pL = 16, pR = 12, pT = 16, pB = 28;
      const gw = GRAPH_W - pL - pR;
      const gh = GRAPH_H - pT - pB;

      // Axes
      ctx.strokeStyle = '#dee2e6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pL, pT);
      ctx.lineTo(pL, pT + gh);
      ctx.lineTo(pL + gw, pT + gh);
      ctx.stroke();

      // Target dashed line
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#adb5bd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pL, pT);
      ctx.lineTo(pL + gw, pT);
      ctx.stroke();
      ctx.setLineDash([]);

      // Labels
      ctx.fillStyle = '#adb5bd';
      ctx.font = '10px -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('target', pL + gw, pT - 2);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('time', pL + gw / 2, pT + gh + 14);

      // Draw curves
      const steps = 120;

      for (const { factor, color } of CURVES) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        for (let i = 0; i <= steps; i++) {
          const lt = (i / steps) * DURATION;
          const val = expValue(lt, factor);
          const x = pL + (i / steps) * gw;
          const y = pT + gh - val * gh;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Animated dots
      if (t < DURATION) {
        const progress = t / DURATION;
        const dx = pL + progress * gw;

        // Vertical guide
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#adb5bd';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.moveTo(dx, pT);
        ctx.lineTo(dx, pT + gh);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        for (const { factor, color } of CURVES) {
          const val = expValue(t, factor);
          const dy = pT + gh - val * gh;

          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(dx, dy, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // Legend
      ctx.font = '9px -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const legendX = pL + gw - 55;
      let legendY = pT + gh - 36;
      for (const { color, label } of CURVES) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(legendX, legendY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#868e96';
        ctx.fillText(`factor = ${label}`, legendX + 7, legendY);
        legendY += 13;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div style={{ margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
        <canvas
          ref={canvasRef}
          style={{ width: GRAPH_W, height: GRAPH_H, display: 'block' }}
        />
      </div>
      <div
        style={{
          fontSize: 11,
          color: '#adb5bd',
          textAlign: 'center',
          marginTop: 4,
        }}
      >
        지수적 접근 — factor가 클수록 빠르게 목표에 수렴한다
      </div>
    </div>
  );
};
