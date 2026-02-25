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

// ── Draw the scale at a given tilt angle ──

function drawScale(
  ctx: CanvasRenderingContext2D,
  w: number,
  angle: number,
  s: number,
) {
  const cx = w / 2;

  const labelFs = Math.max(9.5 * s, 8);
  const smallFs = Math.max(8 * s, 7);

  // Dimensions
  const beamLen = 300 * s;
  const beamHalf = beamLen / 2;
  const pivotY = 60 * s;
  const fulcrumH = 28 * s;
  const fulcrumW = 24 * s;
  const chainLen = 16 * s;
  const panW = 125 * s;
  const panH = 50 * s;
  const panInset = 22 * s;

  // ── Fulcrum ──
  ctx.beginPath();
  ctx.moveTo(cx, pivotY - fulcrumH);
  ctx.lineTo(cx - fulcrumW / 2, pivotY);
  ctx.lineTo(cx + fulcrumW / 2, pivotY);
  ctx.closePath();
  ctx.fillStyle = '#868e96';
  ctx.fill();

  // Base
  const baseW = 56 * s;
  const baseH = 6 * s;
  drawRoundRect(ctx, cx - baseW / 2, pivotY, baseW, baseH, 3, '#adb5bd', '#868e96', 1);

  // ── Beam (rotated) ──
  const beamTop = pivotY - fulcrumH;
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);

  const lx = cx - beamHalf * cosA;
  const ly = beamTop - beamHalf * sinA;
  const rx = cx + beamHalf * cosA;
  const ry = beamTop + beamHalf * sinA;

  ctx.strokeStyle = '#343a40';
  ctx.lineWidth = 4 * s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(lx, ly);
  ctx.lineTo(rx, ry);
  ctx.stroke();
  ctx.lineCap = 'butt';

  // Pivot dot
  ctx.beginPath();
  ctx.arc(cx, beamTop, 3.5 * s, 0, Math.PI * 2);
  ctx.fillStyle = '#495057';
  ctx.fill();

  // ── Left pan ──
  const lAnchorX = lx + panInset * cosA;
  const lAnchorY = ly + panInset * sinA;
  const lTopY = lAnchorY + chainLen;
  const lCx = lAnchorX;

  ctx.strokeStyle = '#868e96';
  ctx.lineWidth = 1.5 * s;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(lAnchorX, lAnchorY);
  ctx.lineTo(lCx - panW * 0.3, lTopY);
  ctx.moveTo(lAnchorX, lAnchorY);
  ctx.lineTo(lCx + panW * 0.3, lTopY);
  ctx.stroke();
  ctx.globalAlpha = 1;

  drawRoundRect(ctx, lCx - panW / 2, lTopY, panW, panH, 8, '#fff5f5', '#ffc9c9');
  ctx.fillStyle = '#fa5252';
  ctx.font = `600 ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('경계를 긋지 않음', lCx, lTopY + panH * 0.36);
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.fillText('내부 복잡성 ↑', lCx, lTopY + panH * 0.68);

  // ── Right pan ──
  const rAnchorX = rx - panInset * cosA;
  const rAnchorY = ry - panInset * sinA;
  const rTopY = rAnchorY + chainLen;
  const rCx = rAnchorX;

  ctx.strokeStyle = '#868e96';
  ctx.lineWidth = 1.5 * s;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(rAnchorX, rAnchorY);
  ctx.lineTo(rCx - panW * 0.3, rTopY);
  ctx.moveTo(rAnchorX, rAnchorY);
  ctx.lineTo(rCx + panW * 0.3, rTopY);
  ctx.stroke();
  ctx.globalAlpha = 1;

  drawRoundRect(ctx, rCx - panW / 2, rTopY, panW, panH, 8, '#e7f5ff', '#74c0fc');
  ctx.fillStyle = '#228be6';
  ctx.font = `600 ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('경계를 그음', rCx, rTopY + panH * 0.36);
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.fillText('경계 관리 비용 ↑', rCx, rTopY + panH * 0.68);
}

// ── Component ──

interface Props {
  caption?: string;
}

export const TradeoffScaleDiagram = ({ caption }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let raf: number;

    const animate = (time: number) => {
      const w = container.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      const s = w / 540;

      const h = 155 * s;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const angle = Math.sin(time * 0.0015) * 0.14;
      drawScale(ctx, w, angle, s);

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
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
