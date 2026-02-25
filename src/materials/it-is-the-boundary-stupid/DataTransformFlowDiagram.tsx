import React, { useRef, useEffect } from 'react';

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';
const MONO = 'Menlo, Monaco, "Courier New", monospace';

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: number | number[], fill: string, stroke: string, lineWidth = 1.5,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

const STAGES = [
  { title: 'DB', subtitle: '테이블 행', color: '#845ef7', bg: '#f3f0ff', border: '#b197fc' },
  { title: '서버', subtitle: '도메인 객체', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
  { title: 'API', subtitle: 'JSON', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
  { title: '클라이언트', subtitle: 'JS 객체', color: '#fab005', bg: '#fff9db', border: '#ffd43b' },
];

const BOUNDARY_LABELS = ['행 → 객체', '객체 → JSON', 'JSON → 객체'];

const CODE_LINES = [
  [], // DB — drawn as table
  ['User {', '  id = 1,', '  name = "kciter"', '}'],
  ['{', '  "id": 1,', '  "name": "kciter"', '}'],
  ['{', '  id: 1,', '  name: "kciter"', '}'],
];

// ── Mini DB table ──

function drawDBTable(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, fs: number,
) {
  const rowH = fs * 2;
  const col1W = w * 0.28;
  const col2W = w - col1W;

  // Header background
  ctx.fillStyle = '#e5dbff';
  ctx.beginPath();
  ctx.roundRect(x, y, w, rowH, [3, 3, 0, 0]);
  ctx.fill();

  // Grid outline
  ctx.strokeStyle = '#b197fc';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, w, rowH * 2, 3);
  ctx.stroke();

  // Column divider
  ctx.beginPath();
  ctx.moveTo(x + col1W, y);
  ctx.lineTo(x + col1W, y + rowH * 2);
  ctx.stroke();

  // Row divider
  ctx.beginPath();
  ctx.moveTo(x, y + rowH);
  ctx.lineTo(x + w, y + rowH);
  ctx.stroke();

  // Header text
  ctx.fillStyle = '#845ef7';
  ctx.font = `600 ${fs}px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('id', x + col1W / 2, y + rowH / 2);
  ctx.fillText('name', x + col1W + col2W / 2, y + rowH / 2);

  // Data row
  ctx.fillStyle = '#495057';
  ctx.font = `${fs}px ${MONO}`;
  ctx.fillText('1', x + col1W / 2, y + rowH * 1.5);
  ctx.fillText('"kciter"', x + col1W + col2W / 2, y + rowH * 1.5);
}

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 640;

  const pad = 20 * s;
  const gap = 30 * s;
  const boxW = (w - pad * 2 - gap * 3) / 4;
  const boxH = 115 * s;
  const boxY = 14 * s;

  const titleFs = Math.max(11 * s, 9);
  const subFs = Math.max(9 * s, 7);
  const codeFs = Math.max(8 * s, 7);
  const lineH = Math.max(12 * s, 10);

  for (let i = 0; i < 4; i++) {
    const x = pad + i * (boxW + gap);
    const st = STAGES[i];

    // Box
    drawRoundRect(ctx, x, boxY, boxW, boxH, 8, st.bg, st.border);

    // Title
    ctx.fillStyle = st.color;
    ctx.font = `600 ${titleFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(st.title, x + boxW / 2, boxY + 8 * s);

    // Subtitle
    ctx.fillStyle = '#868e96';
    ctx.font = `${subFs}px ${FONT}`;
    ctx.fillText(st.subtitle, x + boxW / 2, boxY + 22 * s);

    // Code area background
    const codeY = boxY + 36 * s;
    const codeAreaH = boxH - 42 * s;
    ctx.beginPath();
    ctx.roundRect(x + 4 * s, codeY, boxW - 8 * s, codeAreaH, 4);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fill();

    const codePad = 8 * s;

    if (i === 0) {
      drawDBTable(ctx, x + codePad, codeY + 6 * s, boxW - codePad * 2, codeFs);
    } else {
      ctx.fillStyle = '#495057';
      ctx.font = `${codeFs}px ${MONO}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (let j = 0; j < CODE_LINES[i].length; j++) {
        ctx.fillText(CODE_LINES[i][j], x + codePad, codeY + 6 * s + j * lineH);
      }
    }
  }

  // Arrows and boundaries between boxes
  for (let i = 0; i < 3; i++) {
    const x1 = pad + boxW + i * (boxW + gap);
    const x2 = x1 + gap;
    const midX = (x1 + x2) / 2;
    const arrowY = boxY + boxH / 2;

    // Arrow line
    ctx.strokeStyle = '#adb5bd';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1 + 2, arrowY);
    ctx.lineTo(x2 - 6, arrowY);
    ctx.stroke();

    // Arrowhead
    ctx.beginPath();
    ctx.fillStyle = '#adb5bd';
    ctx.moveTo(x2 - 2, arrowY);
    ctx.lineTo(x2 - 8, arrowY - 3);
    ctx.lineTo(x2 - 8, arrowY + 3);
    ctx.closePath();
    ctx.fill();

    // Boundary dashed line
    ctx.strokeStyle = '#fa5252';
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(midX, boxY - 6 * s);
    ctx.lineTo(midX, boxY + boxH + 6 * s);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // Boundary label
    ctx.fillStyle = '#fa5252';
    ctx.globalAlpha = 0.6;
    ctx.font = `${Math.max(8 * s, 7)}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(BOUNDARY_LABELS[i], midX, boxY + boxH + 10 * s);
    ctx.globalAlpha = 1;
  }

  return boxY + boxH + 28 * s;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const pad = w * 0.06;
  const boxW = w - pad * 2;
  const boxH = 70;
  const gapH = 34;

  let y = 10;

  for (let i = 0; i < 4; i++) {
    const st = STAGES[i];

    // Box
    drawRoundRect(ctx, pad, y, boxW, boxH, 8, st.bg, st.border);

    // Title + subtitle
    ctx.fillStyle = st.color;
    ctx.font = `600 11px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(`${st.title} · ${st.subtitle}`, cx, y + 6);

    // Code representation
    const codeY = y + 24;

    if (i === 0) {
      const tableW = Math.min(boxW * 0.6, 180);
      drawDBTable(ctx, cx - tableW / 2, codeY, tableW, 8);
    } else {
      ctx.fillStyle = '#495057';
      ctx.font = `8px ${MONO}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (let j = 0; j < CODE_LINES[i].length; j++) {
        ctx.fillText(CODE_LINES[i][j], pad + 12, codeY + j * 11);
      }
    }

    y += boxH;

    if (i < 3) {
      // Arrow
      ctx.strokeStyle = '#adb5bd';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, y + 4);
      ctx.lineTo(cx, y + gapH - 8);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = '#adb5bd';
      ctx.moveTo(cx, y + gapH - 4);
      ctx.lineTo(cx - 3.5, y + gapH - 10);
      ctx.lineTo(cx + 3.5, y + gapH - 10);
      ctx.closePath();
      ctx.fill();

      // Boundary dashed line
      const bndY = y + gapH / 2;
      ctx.strokeStyle = '#fa5252';
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pad, bndY);
      ctx.lineTo(w - pad, bndY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // Boundary label
      ctx.fillStyle = '#fa5252';
      ctx.globalAlpha = 0.6;
      ctx.font = `9px ${FONT}`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(BOUNDARY_LABELS[i], w - pad, bndY - 3);
      ctx.globalAlpha = 1;

      y += gapH;
    }
  }

  return y + 10;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const DataTransformFlowDiagram = ({ caption }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const draw = () => {
      const w = container.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      const isMobile = w < 480;

      const ctx = canvas.getContext('2d')!;

      let h: number;
      if (isMobile) {
        h = 4 * 70 + 3 * 34 + 20;
      } else {
        h = 160 * (w / 640);
      }

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      if (isMobile) {
        drawVertical(ctx, w);
      } else {
        drawHorizontal(ctx, w);
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <figure>
      <div ref={containerRef}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />
      </div>
      {caption && <figcaption dangerouslySetInnerHTML={{ __html: caption }} />}
    </figure>
  );
};
