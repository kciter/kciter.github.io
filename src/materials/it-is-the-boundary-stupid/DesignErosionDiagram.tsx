import React, { useRef, useEffect } from 'react';

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

const STAGES = [
  { title: '요구사항', fill: 1.0, color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
  { title: '설계', fill: 0.75, color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
  { title: '구현', fill: 0.50, color: '#fab005', bg: '#fff9db', border: '#ffd43b' },
  { title: '운영', fill: 0.30, color: '#fa5252', bg: '#fff5f5', border: '#ffc9c9' },
];

const BOUNDARY_LABELS = ['해석 차이', '타협·제약', '환경 변화'];

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

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 640;

  const pad = 24 * s;
  const gap = 36 * s;
  const boxW = (w - pad * 2 - gap * 3) / 4;
  const boxH = 120 * s;
  const boxY = 14 * s;

  const titleFs = Math.max(11 * s, 9);
  const smallFs = Math.max(9 * s, 7);
  const percentFs = Math.max(10 * s, 8);

  const barTopY = boxY + 30 * s;
  const barH = boxH - 36 * s;
  const barPad = 10 * s;

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

    // Signal bar background (empty = lost)
    const bx = x + barPad;
    const bw = boxW - barPad * 2;

    ctx.beginPath();
    ctx.roundRect(bx, barTopY, bw, barH, 4);
    ctx.fillStyle = 'rgba(250, 82, 82, 0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Signal bar fill (from bottom)
    const fillH = barH * st.fill;
    const fillY = barTopY + barH - fillH;

    ctx.beginPath();
    ctx.roundRect(bx, fillY, bw, fillH, [0, 0, 4, 4]);
    ctx.fillStyle = st.color;
    ctx.globalAlpha = 0.25;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Top rounded corners for full fill
    if (st.fill === 1) {
      ctx.beginPath();
      ctx.roundRect(bx, fillY, bw, fillH, 4);
      ctx.fillStyle = st.color;
      ctx.globalAlpha = 0.25;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Percentage label
    ctx.fillStyle = st.color;
    ctx.font = `600 ${percentFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round(st.fill * 100)}%`, x + boxW / 2, fillY + fillH / 2);

    // "손실" label in empty area if there's loss
    if (st.fill < 1) {
      const lostH = barH - fillH;
      if (lostH > 14 * s) {
        ctx.fillStyle = '#fa5252';
        ctx.globalAlpha = 0.5;
        ctx.font = `${smallFs}px ${FONT}`;
        ctx.fillText('손실', x + boxW / 2, barTopY + lostH / 2);
        ctx.globalAlpha = 1;
      }
    }
  }

  // Arrows and boundary labels between boxes
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

  // Bottom gap comparison
  const lineY = boxY + boxH + 32 * s;
  const leftX = pad + boxW / 2;
  const rightX = pad + 3 * (boxW + gap) + boxW / 2;

  // Labels above the line
  ctx.fillStyle = '#228be6';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('원래 의도', leftX, lineY - 4 * s);

  ctx.fillStyle = '#fa5252';
  ctx.fillText('최종 결과', rightX, lineY - 4 * s);

  // Dashed line
  ctx.strokeStyle = '#868e96';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(leftX, lineY);
  ctx.lineTo(rightX, lineY);
  ctx.stroke();
  ctx.setLineDash([]);

  // "← 간극 →" below the line
  const midBottomX = (leftX + rightX) / 2;
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('← 간극 →', midBottomX, lineY + 4 * s);

  return lineY + 20 * s;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const pad = w * 0.06;
  const boxW = w - pad * 2;
  const boxH = 70;
  const gapH = 34;

  const barW = boxW * 0.7;
  const barH = 10;

  let y = 10;

  for (let i = 0; i < 4; i++) {
    const st = STAGES[i];

    // Box
    drawRoundRect(ctx, pad, y, boxW, boxH, 8, st.bg, st.border);

    // Title
    ctx.fillStyle = st.color;
    ctx.font = `600 11px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(st.title, cx, y + 8);

    // Horizontal bar
    const barX = cx - barW / 2;
    const barY = y + 30;

    // Bar background
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 3);
    ctx.fillStyle = 'rgba(250, 82, 82, 0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Bar fill (from left)
    const fillW = barW * st.fill;
    ctx.beginPath();
    ctx.roundRect(barX, barY, fillW, barH, st.fill === 1 ? 3 : [3, 0, 0, 3]);
    ctx.fillStyle = st.color;
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Percentage
    ctx.fillStyle = st.color;
    ctx.font = `600 9px ${FONT}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round(st.fill * 100)}%`, barX + fillW + 6, barY + barH / 2);

    // "손실" label
    if (st.fill < 1) {
      const lostW = barW - fillW;
      if (lostW > 30) {
        ctx.fillStyle = '#fa5252';
        ctx.globalAlpha = 0.5;
        ctx.font = `8px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('손실', barX + fillW + lostW / 2, barY + barH + 3);
        ctx.globalAlpha = 1;
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

  // Bottom gap comparison
  y += 12;
  ctx.fillStyle = '#228be6';
  ctx.font = `9px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('원래 의도 100%', cx, y);

  y += 14;
  ctx.fillStyle = '#495057';
  ctx.font = `600 9px ${FONT}`;
  ctx.fillText('↕ 간극', cx, y);

  y += 14;
  ctx.fillStyle = '#fa5252';
  ctx.font = `9px ${FONT}`;
  ctx.fillText('최종 결과 30%', cx, y);

  return y + 16;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const DesignErosionDiagram = ({ caption }: Props) => {
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
        h = 4 * 70 + 3 * 34 + 60;
      } else {
        h = 180 * (w / 640);
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
