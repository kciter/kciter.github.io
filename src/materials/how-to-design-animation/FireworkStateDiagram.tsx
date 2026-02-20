import React, { useRef, useEffect } from 'react';

const CANVAS_W = 460;
const CANVAS_H = 72;

const STATES = [
  { label: '발사', color: '#228be6' },
  { label: '폭발', color: '#fab005' },
  { label: '확산', color: '#fa5252' },
  { label: '소멸', color: '#868e96' }
];

const TRANSITIONS = ['속도 = 0', '즉시', '시간 경과'];

export const FireworkStateDiagram = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const nodeW = 68;
    const nodeH = 32;
    const gap = 42;
    const totalW = STATES.length * nodeW + (STATES.length - 1) * gap;
    const startX = (CANVAS_W - totalW) / 2;
    const cy = CANVAS_H / 2;

    // Draw arrows and transition labels
    for (let i = 0; i < STATES.length - 1; i++) {
      const x1 = startX + i * (nodeW + gap) + nodeW;
      const x2 = startX + (i + 1) * (nodeW + gap);
      const midX = (x1 + x2) / 2;

      // Arrow line
      ctx.strokeStyle = '#adb5bd';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1 + 4, cy);
      ctx.lineTo(x2 - 6, cy);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      ctx.fillStyle = '#adb5bd';
      ctx.moveTo(x2 - 4, cy);
      ctx.lineTo(x2 - 10, cy - 3.5);
      ctx.lineTo(x2 - 10, cy + 3.5);
      ctx.closePath();
      ctx.fill();

      // Transition label
      ctx.fillStyle = '#868e96';
      ctx.font = '10px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(TRANSITIONS[i], midX, cy - nodeH / 2 + 2);
    }

    // Draw nodes
    for (let i = 0; i < STATES.length; i++) {
      const x = startX + i * (nodeW + gap);

      // Node background
      ctx.beginPath();
      ctx.roundRect(x, cy - nodeH / 2, nodeW, nodeH, 6);
      ctx.fillStyle = STATES[i].color;
      ctx.fill();

      // Node label
      ctx.fillStyle = '#fff';
      ctx.font = '600 12px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(STATES[i].label, x + nodeW / 2, cy);
    }
  }, []);

  return (
    <div style={{ margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
        <canvas ref={canvasRef} style={{ width: CANVAS_W, height: CANVAS_H, display: 'block' }} />
      </div>
    </div>
  );
};
