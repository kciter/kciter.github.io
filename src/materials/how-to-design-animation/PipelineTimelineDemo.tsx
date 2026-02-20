import React, { useRef, useEffect } from 'react';

const CANVAS_W = 400;
const CANVAS_H = 110;

const TRACKS = [
  { label: '배경', start: 0, duration: 200, color: '#228be6' },
  { label: '카드', start: 200, duration: 300, color: '#fab005' },
  { label: '내용', start: 500, duration: 200, color: '#fa5252' }
];

const TOTAL = 700;
const PAUSE = 800;
const CYCLE = TOTAL + PAUSE;

const TRACK_H = 18;
const TRACK_GAP = 8;
const LABEL_W = 36;
const PAD_L = LABEL_W + 12;
const PAD_R = 16;
const PAD_T = 12;
const PAD_B = 22;

export const PipelineTimelineDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const barW = CANVAS_W - PAD_L - PAD_R;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = ((now - start) / 1000) * 1000; // ms
      const t = elapsed % CYCLE;

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Draw tracks
      TRACKS.forEach((track, i) => {
        const y = PAD_T + i * (TRACK_H + TRACK_GAP);

        // Label
        ctx.fillStyle = '#868e96';
        ctx.font = '11px -apple-system, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(track.label, LABEL_W, y + TRACK_H / 2);

        // Background bar
        ctx.fillStyle = '#f1f3f5';
        ctx.beginPath();
        ctx.roundRect(PAD_L, y, barW, TRACK_H, 4);
        ctx.fill();

        // Active bar
        const x0 = PAD_L + (track.start / TOTAL) * barW;
        const w = (track.duration / TOTAL) * barW;

        ctx.globalAlpha = 0.2;
        ctx.fillStyle = track.color;
        ctx.beginPath();
        ctx.roundRect(x0, y, w, TRACK_H, 4);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Filled portion based on current time
        if (t > track.start) {
          const progress = Math.min((t - track.start) / track.duration, 1);
          const filledW = w * progress;
          ctx.fillStyle = track.color;
          ctx.beginPath();
          ctx.roundRect(x0, y, filledW, TRACK_H, 4);
          ctx.fill();
        }
      });

      // Time axis
      const axisY = PAD_T + TRACKS.length * (TRACK_H + TRACK_GAP);
      ctx.strokeStyle = '#dee2e6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PAD_L, axisY);
      ctx.lineTo(PAD_L + barW, axisY);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      ctx.fillStyle = '#dee2e6';
      ctx.moveTo(PAD_L + barW, axisY);
      ctx.lineTo(PAD_L + barW - 5, axisY - 3);
      ctx.lineTo(PAD_L + barW - 5, axisY + 3);
      ctx.closePath();
      ctx.fill();

      // Time label
      ctx.fillStyle = '#adb5bd';
      ctx.font = '10px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('시간', PAD_L + barW / 2, axisY + 4);

      // Playhead
      if (t < TOTAL) {
        const px = PAD_L + (t / TOTAL) * barW;
        ctx.strokeStyle = '#495057';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(px, PAD_T - 2);
        ctx.lineTo(px, axisY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div style={{ margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '18px 0' }}>
        <canvas ref={canvasRef} style={{ width: CANVAS_W, height: CANVAS_H, display: 'block' }} />
      </div>
    </div>
  );
};
