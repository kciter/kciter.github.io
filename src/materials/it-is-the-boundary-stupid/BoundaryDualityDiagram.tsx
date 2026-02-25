import React, { useRef, useEffect } from 'react';

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Source rectangle for monolith coordinate mapping
const SRC_MONO: Rect = { x: 60, y: 52, w: 200, h: 150 };

const TANGLED_CURVES = [
  { x1: 80, y1: 80, cx1: 130, cy1: 150, cx2: 190, cy2: 70, x2: 240, y2: 130, color: '#228be6' },
  { x1: 100, y1: 170, cx1: 140, cy1: 90, cx2: 200, cy2: 170, x2: 230, y2: 90, color: '#fa5252' },
  { x1: 75, y1: 130, cx1: 160, cy1: 60, cx2: 110, cy2: 190, x2: 245, y2: 150, color: '#fab005' },
  { x1: 90, y1: 100, cx1: 180, cy1: 180, cx2: 150, cy2: 80, x2: 235, y2: 160, color: '#40c057' },
  { x1: 110, y1: 160, cx1: 80, cy1: 100, cx2: 230, cy2: 140, x2: 200, y2: 80, color: '#845ef7' },
  { x1: 85, y1: 145, cx1: 170, cy1: 90, cx2: 120, cy2: 170, x2: 240, y2: 110, color: '#228be6' },
  { x1: 95, y1: 75, cx1: 210, cy1: 160, cx2: 100, cy2: 130, x2: 220, y2: 170, color: '#fa5252' },
  { x1: 120, y1: 180, cx1: 90, cy1: 80, cx2: 230, cy2: 120, x2: 180, y2: 75, color: '#fab005' },
  { x1: 78, y1: 110, cx1: 200, cy1: 170, cx2: 140, cy2: 60, x2: 235, y2: 140, color: '#40c057' },
  { x1: 105, y1: 90, cx1: 150, cy1: 180, cx2: 210, cy2: 100, x2: 240, y2: 170, color: '#845ef7' },
  { x1: 115, y1: 150, cx1: 80, cy1: 70, cx2: 240, cy2: 160, x2: 190, y2: 85, color: '#228be6' },
  { x1: 88, y1: 165, cx1: 170, cy1: 100, cx2: 120, cy2: 150, x2: 230, y2: 95, color: '#fa5252' },
];

const MONOLITH_NODES = [
  { x: 110, y: 100, color: '#228be6' },
  { x: 165, y: 85, color: '#fa5252' },
  { x: 210, y: 130, color: '#fab005' },
  { x: 130, y: 155, color: '#40c057' },
  { x: 185, y: 170, color: '#845ef7' },
  { x: 225, y: 95, color: '#228be6' },
  { x: 145, y: 120, color: '#fa5252' },
];

// Relative positions within module rect [0-1]
const MODULE_NODES_REL = [
  { rx: 0.33, ry: 0.28 },
  { rx: 0.67, ry: 0.54 },
  { rx: 0.33, ry: 0.8 },
];

const BOUNDARY_LABELS = ['데이터 변환', '에러 처리', '프로토콜'];

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

// ── Helpers ──

function mapXY(px: number, py: number, src: Rect, dst: Rect): [number, number] {
  return [
    dst.x + ((px - src.x) / src.w) * dst.w,
    dst.y + ((py - src.y) / src.h) * dst.h,
  ];
}

function drawNode(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawHArrowhead(ctx: CanvasRenderingContext2D, x: number, y: number, dir: 1 | -1, size: number) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - dir * size, y - size * 0.6);
  ctx.lineTo(x - dir * size, y + size * 0.6);
  ctx.closePath();
  ctx.fill();
}

function drawVArrowhead(ctx: CanvasRenderingContext2D, x: number, y: number, dir: 1 | -1, size: number) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - size * 0.6, y - dir * size);
  ctx.lineTo(x + size * 0.6, y - dir * size);
  ctx.closePath();
  ctx.fill();
}

function drawMonolith(ctx: CanvasRenderingContext2D, rect: Rect, nodeR: number) {
  // Background
  ctx.beginPath();
  ctx.roundRect(rect.x, rect.y, rect.w, rect.h, 14);
  ctx.fillStyle = '#f8f9fa';
  ctx.fill();

  // Tangled lines
  for (const c of TANGLED_CURVES) {
    const [x1, y1] = mapXY(c.x1, c.y1, SRC_MONO, rect);
    const [cx1, cy1] = mapXY(c.cx1, c.cy1, SRC_MONO, rect);
    const [cx2, cy2] = mapXY(c.cx2, c.cy2, SRC_MONO, rect);
    const [x2, y2] = mapXY(c.x2, c.y2, SRC_MONO, rect);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
    ctx.strokeStyle = c.color;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Border
  ctx.beginPath();
  ctx.roundRect(rect.x, rect.y, rect.w, rect.h, 14);
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Nodes
  for (const n of MONOLITH_NODES) {
    const [nx, ny] = mapXY(n.x, n.y, SRC_MONO, rect);
    drawNode(ctx, nx, ny, nodeR, n.color);
  }
}

function drawCleanModule(ctx: CanvasRenderingContext2D, rect: Rect, color: string, bgColor: string, nodeR: number) {
  ctx.beginPath();
  ctx.roundRect(rect.x, rect.y, rect.w, rect.h, 10);
  ctx.fillStyle = bgColor;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const nodes = MODULE_NODES_REL.map(n => ({
    x: rect.x + n.rx * rect.w,
    y: rect.y + n.ry * rect.h,
  }));

  // Clean lines
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(nodes[0].x, nodes[0].y);
  ctx.lineTo(nodes[1].x, nodes[1].y);
  ctx.lineTo(nodes[2].x, nodes[2].y);
  ctx.stroke();
  ctx.globalAlpha = 1;

  for (const n of nodes) {
    drawNode(ctx, n.x, n.y, nodeR, color);
  }
}

function drawBoundaryZone(
  ctx: CanvasRenderingContext2D,
  x1: number,
  x2: number,
  topY: number,
  bottomY: number,
  fontSize: number,
) {
  const midX = (x1 + x2) / 2;

  // Highlight background
  ctx.fillStyle = 'rgba(250, 82, 82, 0.05)';
  ctx.fillRect(x1, topY, x2 - x1, bottomY - topY);

  // Boundary arrows and labels
  const count = BOUNDARY_LABELS.length;
  const padY = (bottomY - topY) * 0.35;
  const spanY = bottomY - topY - padY * 2;

  for (let i = 0; i < count; i++) {
    const y = topY + padY + (spanY / (count - 1)) * i;

    ctx.strokeStyle = '#fa5252';
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1 + 6, y);
    ctx.lineTo(x2 - 6, y);
    ctx.stroke();

    ctx.fillStyle = '#fa5252';
    drawHArrowhead(ctx, x2 - 4, y, 1, 5);
    drawHArrowhead(ctx, x1 + 4, y, -1, 5);
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#868e96';
    ctx.font = `${fontSize}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(BOUNDARY_LABELS[i], midX, y - 4);
  }
}

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 640;
  const h = 280 * s;

  const leftCx = 160 * s;
  const rightCx = 470 * s;

  const monoRect: Rect = { x: 60 * s, y: 52 * s, w: 200 * s, h: 150 * s };
  const modARect: Rect = { x: 365 * s, y: 68 * s, w: 75 * s, h: 130 * s };
  const modBRect: Rect = { x: 500 * s, y: 68 * s, w: 75 * s, h: 130 * s };

  const titleFs = Math.max(13 * s, 11);
  const subtitleFs = Math.max(11 * s, 10);
  const boundaryFs = Math.max(9 * s, 8);
  const calloutFs = Math.max(10 * s, 9);
  const nodeR = Math.max(5 * s, 3);
  const smallNodeR = Math.max(4 * s, 3);

  // Left title
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('경계 없음', leftCx, 28 * s);

  // Monolith
  drawMonolith(ctx, monoRect, nodeR);

  // Left subtitle
  ctx.fillStyle = '#868e96';
  ctx.font = `${subtitleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('내부 복잡성 ↑', leftCx, 228 * s);

  // Dashed vertical separator
  ctx.strokeStyle = '#dee2e6';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(320 * s, 18 * s);
  ctx.lineTo(320 * s, 248 * s);
  ctx.stroke();
  ctx.setLineDash([]);

  // Horizontal arrow
  ctx.strokeStyle = '#868e96';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(280 * s, 127 * s);
  ctx.lineTo(354 * s, 127 * s);
  ctx.stroke();
  ctx.fillStyle = '#868e96';
  drawHArrowhead(ctx, 356 * s, 127 * s, 1, 7);

  // Right title
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('경계 있음', rightCx, 28 * s);

  // Boundary zone
  drawBoundaryZone(ctx, 440 * s, 500 * s, 52 * s, 202 * s, boundaryFs);

  // Modules
  drawCleanModule(ctx, modARect, '#228be6', '#e7f5ff', smallNodeR);
  drawCleanModule(ctx, modBRect, '#fab005', '#fff9db', smallNodeR);

  // Callout
  ctx.fillStyle = '#fa5252';
  ctx.font = `600 ${calloutFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('새로운 복잡성', rightCx, 58 * s);

  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(rightCx, 60 * s);
  ctx.lineTo(rightCx, 82 * s);
  ctx.stroke();
  ctx.fillStyle = '#fa5252';
  drawVArrowhead(ctx, rightCx, 86 * s, 1, 4);
  ctx.globalAlpha = 1;

  // Right subtitle
  ctx.fillStyle = '#868e96';
  ctx.font = `${subtitleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('내부 단순 · 경계 복잡성 ↑', rightCx, 228 * s);

  return h;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;

  // Section 1: Monolith
  const monoRect: Rect = { x: w * 0.08, y: 42, w: w * 0.84, h: w * 0.38 };

  ctx.fillStyle = '#495057';
  ctx.font = `600 13px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('경계 없음', cx, 22);

  drawMonolith(ctx, monoRect, 5);

  const monoBottom = monoRect.y + monoRect.h;

  ctx.fillStyle = '#868e96';
  ctx.font = `11px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('내부 복잡성 ↑', cx, monoBottom + 16);

  // Down arrow
  const arrowStartY = monoBottom + 32;
  ctx.strokeStyle = '#868e96';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, arrowStartY);
  ctx.lineTo(cx, arrowStartY + 24);
  ctx.stroke();
  ctx.fillStyle = '#868e96';
  drawVArrowhead(ctx, cx, arrowStartY + 28, 1, 7);

  // Section 2: Separated modules
  const sec2TitleY = arrowStartY + 48;
  ctx.fillStyle = '#495057';
  ctx.font = `600 13px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('경계 있음', cx, sec2TitleY);

  const modY = sec2TitleY + 36;
  const modH = w * 0.3;
  const modW = w * 0.33;
  const modARect: Rect = { x: w * 0.05, y: modY, w: modW, h: modH };
  const modBRect: Rect = { x: w * 0.62, y: modY, w: modW, h: modH };

  const bndX1 = w * 0.38;
  const bndX2 = w * 0.62;

  // Callout
  ctx.fillStyle = '#fa5252';
  ctx.font = `600 10px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('새로운 복잡성', cx, modY - 4);

  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, modY - 2);
  ctx.lineTo(cx, modY + 18);
  ctx.stroke();
  ctx.fillStyle = '#fa5252';
  drawVArrowhead(ctx, cx, modY + 22, 1, 4);
  ctx.globalAlpha = 1;

  // Boundary zone
  drawBoundaryZone(ctx, bndX1, bndX2, modY, modY + modH, 10);

  // Modules
  drawCleanModule(ctx, modARect, '#228be6', '#e7f5ff', 4);
  drawCleanModule(ctx, modBRect, '#fab005', '#fff9db', 4);

  const subtitleY = modY + modH + 18;
  ctx.fillStyle = '#868e96';
  ctx.font = `11px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('내부 단순 · 경계 복잡성 ↑', cx, subtitleY);

  return subtitleY + 20;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const BoundaryDualityDiagram = ({ caption }: Props) => {
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

      // Pre-compute height
      let h: number;
      if (isMobile) {
        // Estimate height for vertical layout
        const monoH = w * 0.38;
        const modH = w * 0.3;
        h = 42 + monoH + 32 + 32 + 28 + 36 + modH + 38;
      } else {
        h = 280 * (w / 640);
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
