import React, { useRef, useEffect } from 'react';

const RING_PERIOD = 1.5;
const GRAPH_W = 200;
const GRAPH_H = 60;

export const PulseBadgeDemo = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const graphCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = graphCanvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = GRAPH_W * dpr;
    canvas.height = GRAPH_H * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const start = performance.now();

    const animate = (now: number) => {
      const t = (now - start) / 1000;
      const p = (t % RING_PERIOD) / RING_PERIOD;

      // Ring animation
      if (ringRef.current) {
        const ringScale = 1 + p * 0.8;
        const opacity = 1 - p;
        ringRef.current.style.transform = `translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.opacity = `${opacity}`;
      }

      // Graph
      ctx.clearRect(0, 0, GRAPH_W, GRAPH_H);

      const padL = 24;
      const padR = 8;
      const padT = 8;
      const padB = 16;
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
      ctx.font = '9px -apple-system, monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText('1', padL - 4, padT);
      ctx.fillText('0', padL - 4, padT + gh);

      // Sawtooth wave (3 periods)
      const periods = 3;
      ctx.beginPath();
      ctx.strokeStyle = '#fa5252';
      ctx.lineWidth = 1.5;
      for (let i = 0; i <= periods; i++) {
        const x0 = padL + (i / periods) * gw;
        const x1 = padL + ((i + 1) / periods) * gw;
        if (i < periods) {
          ctx.moveTo(x0, padT + gh);
          ctx.lineTo(x1, padT);
          // Drop back to 0
          if (i < periods - 1) {
            ctx.moveTo(x1, padT);
            ctx.lineTo(x1, padT + gh);
          }
        }
      }
      ctx.stroke();

      // Current position dot
      const totalProgress = ((t % (RING_PERIOD * periods)) / (RING_PERIOD * periods));
      const currentPeriod = Math.floor(totalProgress * periods);
      const withinPeriod = p;
      const dotX = padL + ((currentPeriod + withinPeriod) / periods) * gw;
      const dotY = padT + gh - withinPeriod * gh;

      ctx.beginPath();
      ctx.fillStyle = '#fa5252';
      ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#adb5bd';
      ctx.font = '9px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('t % period', padL + gw / 2, padT + gh + 4);

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          height: 120,
          background: '#f8f9fa',
          borderRadius: 8,
        }}
      >
        {/* App icon with badge */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #228be6, #339af0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(34,139,230,0.3)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                fill="white"
              />
            </svg>
          </div>
          {/* Badge */}
          <div style={{ position: 'absolute', top: -6, right: -6 }}>
            <div
              ref={ringRef}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 22,
                height: 22,
                borderRadius: '50%',
                border: '2px solid #fa5252',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#fa5252',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fff',
              }}
            >
              3
            </div>
          </div>
        </div>

        {/* Sawtooth graph */}
        <canvas
          ref={graphCanvasRef}
          style={{
            width: GRAPH_W,
            height: GRAPH_H,
            display: 'block',
          }}
        />
      </div>
      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center', marginTop: 10 }}>
        {'톱니파 — 값이 0→1로 단방향 진행 후 리셋을 반복한다'}
      </div>
    </div>
  );
};
