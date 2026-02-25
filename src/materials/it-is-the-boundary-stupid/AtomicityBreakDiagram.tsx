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

const SERVICES = [
  { label: '결제 서비스', status: '✓ 완료', color: '#40c057', bg: '#ebfbee', border: '#69db7c', statusBg: '#d3f9d8' },
  { label: '재고 서비스', status: '✗ 실패', color: '#fa5252', bg: '#fff5f5', border: '#ffc9c9', statusBg: '#ffe3e3' },
  { label: '알림 서비스', status: '— 미실행', color: '#868e96', bg: '#f8f9fa', border: '#dee2e6', statusBg: '#e9ecef' },
];

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 540;

  const pad = 20 * s;
  const boxW = 120 * s;
  const boxH = 60 * s;
  const gap = 30 * s;
  const totalBoxW = boxW * 3 + gap * 2;
  const startX = (w - totalBoxW) / 2;
  const startY = 50 * s;

  const titleFs = Math.max(11 * s, 9);
  const labelFs = Math.max(9 * s, 8);
  const statusFs = Math.max(8 * s, 7);
  const smallFs = Math.max(7 * s, 6);

  // Title: "processOrder()"
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('processOrder()', w / 2, 10 * s);

  // Spanning arrow under title
  const arrowY = 34 * s;
  ctx.strokeStyle = '#495057';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(startX + 10 * s, arrowY);
  ctx.lineTo(startX + totalBoxW - 10 * s, arrowY);
  ctx.stroke();
  // Left tick
  ctx.beginPath();
  ctx.moveTo(startX + 10 * s, arrowY - 3);
  ctx.lineTo(startX + 10 * s, arrowY + 3);
  ctx.stroke();
  // Right arrowhead
  ctx.beginPath();
  ctx.fillStyle = '#495057';
  ctx.moveTo(startX + totalBoxW - 10 * s, arrowY);
  ctx.lineTo(startX + totalBoxW - 16 * s, arrowY - 3);
  ctx.lineTo(startX + totalBoxW - 16 * s, arrowY + 3);
  ctx.closePath();
  ctx.fill();

  // "하나의 작업" label
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('하나의 작업', w / 2, arrowY - 5);

  // Service boxes
  for (let i = 0; i < SERVICES.length; i++) {
    const svc = SERVICES[i];
    const x = startX + i * (boxW + gap);
    const cx = x + boxW / 2;

    // Box
    drawRoundRect(ctx, x, startY, boxW, boxH, 8, svc.bg, svc.border);

    // Service name
    ctx.fillStyle = svc.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(svc.label, cx, startY + boxH * 0.35);

    // Status badge
    const badgeW = 56 * s;
    const badgeH = 16 * s;
    const badgeX = cx - badgeW / 2;
    const badgeY = startY + boxH * 0.55;
    drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 4, svc.statusBg, svc.border, 1);
    ctx.fillStyle = svc.color;
    ctx.font = `600 ${statusFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(svc.status, cx, badgeY + badgeH / 2);

    // Boundary dashed line between services
    if (i < SERVICES.length - 1) {
      const bndX = x + boxW + gap / 2;
      ctx.strokeStyle = '#fa5252';
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(bndX, startY - 6 * s);
      ctx.lineTo(bndX, startY + boxH + 6 * s);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // "경계" label
      ctx.fillStyle = '#fa5252';
      ctx.globalAlpha = 0.5;
      ctx.font = `${smallFs}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('경계', bndX, startY + boxH + 8 * s);
      ctx.globalAlpha = 1;
    }

    // Arrow between boxes
    if (i < SERVICES.length - 1) {
      const arrowStartX = x + boxW + 3 * s;
      const arrowEndX = x + boxW + gap - 3 * s;
      const acy = startY + boxH / 2;

      ctx.strokeStyle = i === 0 ? '#40c057' : '#fa5252';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(arrowStartX, acy);
      ctx.lineTo(arrowEndX - 5, acy);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = i === 0 ? '#40c057' : '#fa5252';
      ctx.moveTo(arrowEndX, acy);
      ctx.lineTo(arrowEndX - 6, acy - 3);
      ctx.lineTo(arrowEndX - 6, acy + 3);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      // X mark on failed arrow
      if (i === 1) {
        const mx = (arrowStartX + arrowEndX) / 2;
        ctx.strokeStyle = '#fa5252';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mx - 4, acy - 4);
        ctx.lineTo(mx + 4, acy + 4);
        ctx.moveTo(mx + 4, acy - 4);
        ctx.lineTo(mx - 4, acy + 4);
        ctx.stroke();
      }
    }
  }

  // Bottom: inconsistency callout
  const calloutY = startY + boxH + 24 * s;
  const calloutW = totalBoxW * 0.7;
  const calloutH = 18 * s;
  const calloutX = (w - calloutW) / 2;
  drawRoundRect(ctx, calloutX, calloutY, calloutW, calloutH, 4, '#fff5f5', '#ffc9c9', 1);
  ctx.fillStyle = '#fa5252';
  ctx.font = `600 ${statusFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('결제는 완료, 재고는 미차감 — 불일치 상태', w / 2, calloutY + calloutH / 2);

  return calloutY + calloutH + 10 * s;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const pad = w * 0.08;
  const boxW = w - pad * 2;
  const boxH = 48;
  const gap = 28;

  let y = 4;

  // Title
  ctx.fillStyle = '#495057';
  ctx.font = `600 11px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('processOrder()', cx, y);
  y += 18;

  for (let i = 0; i < SERVICES.length; i++) {
    const svc = SERVICES[i];

    // Box
    drawRoundRect(ctx, pad, y, boxW, boxH, 8, svc.bg, svc.border);

    // Service name
    ctx.fillStyle = svc.color;
    ctx.font = `600 9px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(svc.label, cx, y + boxH * 0.35);

    // Status badge
    const badgeW = 60;
    const badgeH = 16;
    const badgeX = cx - badgeW / 2;
    const badgeY = y + boxH * 0.52;
    drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 4, svc.statusBg, svc.border, 1);
    ctx.fillStyle = svc.color;
    ctx.font = `600 8px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(svc.status, cx, badgeY + badgeH / 2);

    y += boxH;

    // Boundary + arrow between
    if (i < SERVICES.length - 1) {
      // Boundary line
      const bndY = y + gap / 2;
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

      ctx.fillStyle = '#fa5252';
      ctx.globalAlpha = 0.5;
      ctx.font = `7px ${FONT}`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('경계', w - pad, bndY - 2);
      ctx.globalAlpha = 1;

      // Arrow
      ctx.strokeStyle = i === 0 ? '#40c057' : '#fa5252';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx, y + 3);
      ctx.lineTo(cx, y + gap - 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = i === 0 ? '#40c057' : '#fa5252';
      ctx.moveTo(cx, y + gap - 2);
      ctx.lineTo(cx - 3, y + gap - 7);
      ctx.lineTo(cx + 3, y + gap - 7);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      // X mark on failed arrow
      if (i === 1) {
        const my = y + gap / 2;
        ctx.strokeStyle = '#fa5252';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 4, my - 4);
        ctx.lineTo(cx + 4, my + 4);
        ctx.moveTo(cx + 4, my - 4);
        ctx.lineTo(cx - 4, my + 4);
        ctx.stroke();
      }

      y += gap;
    }
  }

  // Inconsistency callout
  y += 10;
  const calloutW = boxW * 0.9;
  const calloutH = 16;
  const calloutX = cx - calloutW / 2;
  drawRoundRect(ctx, calloutX, y, calloutW, calloutH, 4, '#fff5f5', '#ffc9c9', 1);
  ctx.fillStyle = '#fa5252';
  ctx.font = `600 8px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('결제 완료, 재고 미차감 — 불일치 상태', cx, y + calloutH / 2);

  return y + calloutH + 10;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const AtomicityBreakDiagram = ({ caption }: Props) => {
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
        h = 260;
      } else {
        h = 175 * (w / 540);
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
