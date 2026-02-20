import React, { useRef, useEffect, useState, useCallback } from 'react';

type EasingPreset = {
  name: string;
  label: string;
  p1: [number, number];
  p2: [number, number];
};

const PRESETS: EasingPreset[] = [
  { name: 'linear', label: 'Linear', p1: [0, 0], p2: [1, 1] },
  { name: 'ease', label: 'Ease', p1: [0.25, 0.1], p2: [0.25, 1.0] },
  { name: 'ease-in', label: 'Ease In', p1: [0.42, 0], p2: [1, 1] },
  { name: 'ease-out', label: 'Ease Out', p1: [0, 0], p2: [0.58, 1] },
  { name: 'overshoot', label: 'Overshoot', p1: [0.68, -0.55], p2: [0.27, 1.55] },
];

function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return (t: number): number => {
    // Newton-Raphson method to find t for given x
    let guessT = t;
    for (let i = 0; i < 8; i++) {
      const currentX = sampleCurveX(guessT, p1x, p2x);
      const slope = sampleCurveDerivativeX(guessT, p1x, p2x);
      if (Math.abs(slope) < 1e-6) break;
      guessT -= (currentX - t) / slope;
    }
    return sampleCurveY(guessT, p1y, p2y);
  };
}

function sampleCurveX(t: number, p1x: number, p2x: number): number {
  return ((1 - 3 * p2x + 3 * p1x) * t + (3 * p2x - 6 * p1x)) * t * t + 3 * p1x * t;
}

function sampleCurveY(t: number, p1y: number, p2y: number): number {
  return ((1 - 3 * p2y + 3 * p1y) * t + (3 * p2y - 6 * p1y)) * t * t + 3 * p1y * t;
}

function sampleCurveDerivativeX(t: number, p1x: number, p2x: number): number {
  return (3 * (1 - 3 * p2x + 3 * p1x) * t + 2 * (3 * p2x - 6 * p1x)) * t + 3 * p1x;
}

export const EasingVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(1); // default: ease
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const DURATION = 1500;

  const drawCurve = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, currentProgress: number) => {
    const padding = 40;
    const graphW = width - padding * 2;
    const graphH = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(padding, padding, graphW, graphH);

    // Grid lines
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const x = padding + (graphW * i) / 4;
      const y = padding + (graphH * i) / 4;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + graphH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + graphW, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#adb5bd';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + graphH);
    ctx.lineTo(padding + graphW, padding + graphH);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#868e96';
    ctx.font = '11px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('0', padding, padding + graphH + 16);
    ctx.fillText('1', padding + graphW, padding + graphH + 16);
    ctx.fillText('time →', padding + graphW / 2, padding + graphH + 32);
    ctx.save();
    ctx.translate(14, padding + graphH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('value →', 0, 0);
    ctx.restore();

    const preset = PRESETS[selected];
    const easing = cubicBezier(preset.p1[0], preset.p1[1], preset.p2[0], preset.p2[1]);

    // Draw curve
    ctx.beginPath();
    ctx.strokeStyle = '#228be6';
    ctx.lineWidth = 2.5;
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const v = easing(t);
      const x = padding + t * graphW;
      const y = padding + graphH - v * graphH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw progress indicator
    if (currentProgress > 0) {
      const v = easing(Math.min(currentProgress, 1));
      const px = padding + currentProgress * graphW;
      const py = padding + graphH - v * graphH;

      // Dotted lines to axes
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#ff6b6b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, padding + graphH);
      ctx.lineTo(px, py);
      ctx.lineTo(padding, py);
      ctx.stroke();
      ctx.setLineDash([]);

      // Dot on curve
      ctx.beginPath();
      ctx.fillStyle = '#ff6b6b';
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [selected]);

  const play = useCallback(() => {
    setIsPlaying(true);
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);

      if (p < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    drawCurve(ctx, rect.width, rect.height, progress);
  }, [selected, progress, drawCurve]);

  const preset = PRESETS[selected];
  const easedProgress = progress > 0
    ? cubicBezier(preset.p1[0], preset.p1[1], preset.p2[0], preset.p2[1])(Math.min(progress, 1))
    : 0;

  return (
    <div ref={containerRef} style={{
      border: '1px solid #dee2e6',
      borderRadius: 8,
      padding: 20,
      margin: '24px 0',
      background: '#fff',
    }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {PRESETS.map((p, i) => (
          <button
            key={p.name}
            onClick={() => { setSelected(i); setProgress(0); setIsPlaying(false); cancelAnimationFrame(animRef.current); }}
            style={{
              padding: '6px 14px',
              border: i === selected ? '2px solid #228be6' : '1px solid #dee2e6',
              borderRadius: 6,
              background: i === selected ? '#e7f5ff' : '#fff',
              color: i === selected ? '#1971c2' : '#495057',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: i === selected ? 600 : 400,
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', flexWrap: 'wrap' }}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', maxWidth: 320, height: 240, flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: '#868e96', marginBottom: 4 }}>
              cubic-bezier({preset.p1[0]}, {preset.p1[1]}, {preset.p2[0]}, {preset.p2[1]})
            </div>
            <div style={{
              position: 'relative',
              height: 40,
              background: '#f1f3f5',
              borderRadius: 8,
              marginTop: 12,
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                left: `${easedProgress * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#228be6',
                transition: 'none',
              }} />
            </div>
            <div style={{ fontSize: 11, color: '#adb5bd', marginTop: 4, textAlign: 'center' }}>
              ← 이 공의 위치가 커브를 따라 변합니다 →
            </div>
          </div>
          <button
            onClick={() => { setProgress(0); setTimeout(play, 50); }}
            disabled={isPlaying}
            style={{
              marginTop: 16,
              padding: '10px 24px',
              background: isPlaying ? '#adb5bd' : '#228be6',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: isPlaying ? 'default' : 'pointer',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {isPlaying ? '재생 중...' : '▶ 재생'}
          </button>
        </div>
      </div>
    </div>
  );
};
