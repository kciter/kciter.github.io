import React, { useRef, useEffect } from 'react';

const DURATION = 2;
const PAUSE = 1;
const CYCLE = DURATION + PAUSE;
const GRAPH_W = 240;
const GRAPH_H = 160;

export const FadeInGraphDemo = () => {
  const boxRef = useRef<HTMLDivElement>(null);
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
      const elapsed = (now - start) / 1000;
      const cycleT = elapsed % CYCLE;
      const p = Math.min(cycleT / DURATION, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);

      // Box opacity
      if (boxRef.current) {
        boxRef.current.style.opacity = `${eased}`;
      }

      // Graph
      ctx.clearRect(0, 0, GRAPH_W, GRAPH_H);

      const padL = 36;
      const padR = 16;
      const padT = 16;
      const padB = 28;
      const gw = GRAPH_W - padL - padR;
      const gh = GRAPH_H - padT - padB;

      // Axes
      ctx.strokeStyle = '#dee2e6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, padT + gh);
      ctx.lineTo(padL + gw, padT + gh);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = '#adb5bd';
      ctx.font = '10px -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('1', padL - 6, padT + 2);
      ctx.fillText('0', padL - 6, padT + gh);

      // X-axis labels
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('0s', padL, padT + gh + 6);
      ctx.fillText(`${DURATION}s`, padL + gw, padT + gh + 6);

      // Axis titles
      ctx.save();
      ctx.translate(11, padT + gh / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('opacity', 0, 0);
      ctx.restore();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('time', padL + gw / 2, padT + gh + 14);

      // Curve (ease-out cubic)
      ctx.beginPath();
      ctx.strokeStyle = '#228be6';
      ctx.lineWidth = 2;
      const steps = 100;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const v = 1 - Math.pow(1 - t, 3);
        const x = padL + t * gw;
        const y = padT + gh - v * gh;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Current position dot
      if (p < 1) {
        const dotX = padL + p * gw;
        const dotY = padT + gh - eased * gh;

        // Vertical/horizontal guide lines
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#228be6';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.moveTo(dotX, padT + gh);
        ctx.lineTo(dotX, dotY);
        ctx.moveTo(padL, dotY);
        ctx.lineTo(dotX, dotY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        // Dot
        ctx.beginPath();
        ctx.fillStyle = '#228be6';
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div style={{ margin: '24px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 48,
          padding: '24px 0',
          flexWrap: 'wrap',
        }}
      >
        {/* Fade-in box */}
        <div
          ref={boxRef}
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #228be6, #339af0)',
            boxShadow: '0 2px 8px rgba(34,139,230,0.3)',
            opacity: 0,
          }}
        />

        {/* Graph */}
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            maxWidth: GRAPH_W,
            aspectRatio: `${GRAPH_W} / ${GRAPH_H}`,
            display: 'block',
          }}
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
        페이드인 — 시간에 따라 투명도가 0에서 1로 변한다
      </div>
    </div>
  );
};
