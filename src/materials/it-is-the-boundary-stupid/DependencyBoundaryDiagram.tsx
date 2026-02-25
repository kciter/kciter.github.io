import React, { useRef, useEffect } from 'react';

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: number, fill: string, stroke: string, lineWidth = 1.5,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 540;
  const h = 210 * s;

  const midX = w / 2;

  // ── Left zone: "내가 통제하는 코드" ──
  const lzX = 20 * s;
  const lzY = 32 * s;
  const lzW = midX - 36 * s;
  const lzH = 150 * s;

  // Zone background
  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.roundRect(lzX, lzY, lzW, lzH, 10);
  ctx.fill();
  ctx.strokeStyle = '#228be6';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Zone title
  const titleFs = Math.max(11 * s, 9);
  ctx.fillStyle = '#228be6';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('내가 통제하는 코드', lzX + lzW / 2, lzY + 8 * s);

  // Inner boxes
  const innerFs = Math.max(10 * s, 8);
  const innerBoxes = ['내 서비스', '내 모듈', '내 함수'];
  const ibW = (lzW - 40 * s) / 3;
  const ibH = 36 * s;
  const ibY = lzY + 30 * s + (lzH - 30 * s - ibH) / 2;

  for (let i = 0; i < innerBoxes.length; i++) {
    const ibX = lzX + 12 * s + i * (ibW + 8 * s);
    drawRoundRect(ctx, ibX, ibY, ibW, ibH, 6, '#e7f5ff', '#74c0fc', 1);
    ctx.fillStyle = '#228be6';
    ctx.font = `${innerFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(innerBoxes[i], ibX + ibW / 2, ibY + ibH / 2);
  }

  // Stable indicator
  const stableFs = Math.max(9 * s, 7);
  ctx.fillStyle = '#228be6';
  ctx.globalAlpha = 0.5;
  ctx.font = `${stableFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('안정적', lzX + lzW / 2, lzY + lzH - 6 * s);
  ctx.globalAlpha = 1;

  // ── Boundary: vertical dashed line ──
  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(midX, 18 * s);
  ctx.lineTo(midX, 195 * s);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  ctx.fillStyle = '#fa5252';
  ctx.globalAlpha = 0.6;
  ctx.font = `600 ${Math.max(9 * s, 7)}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('경계', midX + 5, 185 * s);
  ctx.globalAlpha = 1;

  // ── Right zone: "통제할 수 없는 코드" ──
  const rzX = midX + 16 * s;
  const rzW = w - rzX - 20 * s;

  // Zone background (slightly unsettling)
  ctx.fillStyle = '#fff5f5';
  ctx.beginPath();
  ctx.roundRect(rzX, lzY, rzW, lzH, 10);
  ctx.fill();
  ctx.strokeStyle = '#fa5252';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Zone title
  ctx.fillStyle = '#e03131';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('통제할 수 없는 코드', rzX + rzW / 2, lzY + 8 * s);

  // External items with "change" indicators
  const items = [
    { label: '외부 API', sub: 'v2 → v3 ⚡' },
    { label: '라이브러리', sub: 'breaking 💥' },
    { label: '런타임', sub: 'update ⚠️' },
  ];

  const eiW = (rzW - 40 * s) / 3;
  const eiH = 36 * s;
  const eiY = ibY;

  for (let i = 0; i < items.length; i++) {
    const eiX = rzX + 12 * s + i * (eiW + 8 * s);
    drawRoundRect(ctx, eiX, eiY, eiW, eiH, 6, '#ffe3e3', '#ffa8a8', 1);

    ctx.fillStyle = '#e03131';
    ctx.font = `${innerFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(items[i].label, eiX + eiW / 2, eiY + eiH / 2 - 5 * s);

    ctx.fillStyle = '#868e96';
    ctx.font = `${Math.max(8 * s, 7)}px ${FONT}`;
    ctx.fillText(items[i].sub, eiX + eiW / 2, eiY + eiH / 2 + 7 * s);
  }

  // Unstable indicator
  ctx.fillStyle = '#e03131';
  ctx.globalAlpha = 0.5;
  ctx.font = `${stableFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('예고 없이 변한다', rzX + rzW / 2, lzY + lzH - 6 * s);
  ctx.globalAlpha = 1;

  // ── Arrows crossing boundary ──
  const arrowYs = [ibY + ibH * 0.3, ibY + ibH * 0.7];
  for (const ay of arrowYs) {
    ctx.strokeStyle = '#adb5bd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(lzX + lzW - 2, ay);
    ctx.lineTo(rzX + 2, ay);
    ctx.stroke();

    // Arrowhead pointing right
    ctx.beginPath();
    ctx.fillStyle = '#adb5bd';
    ctx.moveTo(rzX, ay);
    ctx.lineTo(rzX - 5, ay - 3);
    ctx.lineTo(rzX - 5, ay + 3);
    ctx.closePath();
    ctx.fill();
  }

  return h;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const pad = w * 0.05;
  const zoneW = w - pad * 2;

  // ── Top zone: "내가 통제하는 코드" ──
  const lzY = 14;
  const lzH = 110;

  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.roundRect(pad, lzY, zoneW, lzH, 10);
  ctx.fill();
  ctx.strokeStyle = '#228be6';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#228be6';
  ctx.font = `600 11px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('내가 통제하는 코드', cx, lzY + 8);

  const innerBoxes = ['내 서비스', '내 모듈', '내 함수'];
  const ibW = (zoneW - 32) / 3;
  const ibH = 32;
  const ibY = lzY + 32;

  for (let i = 0; i < innerBoxes.length; i++) {
    const ibX = pad + 8 + i * (ibW + 8);
    drawRoundRect(ctx, ibX, ibY, ibW, ibH, 6, '#e7f5ff', '#74c0fc', 1);
    ctx.fillStyle = '#228be6';
    ctx.font = `9px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(innerBoxes[i], ibX + ibW / 2, ibY + ibH / 2);
  }

  ctx.fillStyle = '#228be6';
  ctx.globalAlpha = 0.5;
  ctx.font = `9px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('안정적', cx, lzY + lzH - 6);
  ctx.globalAlpha = 1;

  // ── Boundary: horizontal dashed line ──
  const bndY = lzY + lzH + 20;
  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(w * 0.08, bndY);
  ctx.lineTo(w * 0.92, bndY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  ctx.fillStyle = '#fa5252';
  ctx.globalAlpha = 0.6;
  ctx.font = `600 9px ${FONT}`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('경계', w * 0.92, bndY - 4);
  ctx.globalAlpha = 1;

  // Arrows
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, lzY + lzH);
  ctx.lineTo(cx, bndY + 18);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#adb5bd';
  ctx.moveTo(cx, bndY + 20);
  ctx.lineTo(cx - 3.5, bndY + 14);
  ctx.lineTo(cx + 3.5, bndY + 14);
  ctx.closePath();
  ctx.fill();

  // ── Bottom zone: "통제할 수 없는 코드" ──
  const rzY = bndY + 22;
  const rzH = 110;

  ctx.fillStyle = '#fff5f5';
  ctx.beginPath();
  ctx.roundRect(pad, rzY, zoneW, rzH, 10);
  ctx.fill();
  ctx.strokeStyle = '#fa5252';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#e03131';
  ctx.font = `600 11px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('통제할 수 없는 코드', cx, rzY + 8);

  const items = [
    { label: '외부 API', sub: 'v2 → v3 ⚡' },
    { label: '라이브러리', sub: 'breaking 💥' },
    { label: '런타임', sub: 'update ⚠️' },
  ];

  const eiY = rzY + 32;
  for (let i = 0; i < items.length; i++) {
    const eiX = pad + 8 + i * (ibW + 8);
    drawRoundRect(ctx, eiX, eiY, ibW, ibH, 6, '#ffe3e3', '#ffa8a8', 1);

    ctx.fillStyle = '#e03131';
    ctx.font = `9px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(items[i].label, eiX + ibW / 2, eiY + ibH / 2 - 5);

    ctx.fillStyle = '#868e96';
    ctx.font = `7px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(items[i].sub, eiX + ibW / 2, eiY + ibH / 2 + 7);
  }

  ctx.fillStyle = '#e03131';
  ctx.globalAlpha = 0.5;
  ctx.font = `9px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('예고 없이 변한다', cx, rzY + rzH - 6);
  ctx.globalAlpha = 1;

  return rzY + rzH + 14;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const DependencyBoundaryDiagram = ({ caption }: Props) => {
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
        h = 280;
      } else {
        h = 210 * (w / 540);
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
