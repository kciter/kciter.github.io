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

function drawVArrow(ctx: CanvasRenderingContext2D, x: number, y1: number, y2: number, color: string, s: number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x, y1);
  ctx.lineTo(x, y2);
  ctx.stroke();
  const size = 5 * s;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(x, y2 + 1);
  ctx.lineTo(x - size * 0.6, y2 - size);
  ctx.lineTo(x + size * 0.6, y2 - size);
  ctx.closePath();
  ctx.fill();
}

const DEV_STEPS = ['배송지 검증', '재고 확인', '결제 처리', '알림 발송'];

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 640;
  const h = 320 * s;

  const titleFs = Math.max(13 * s, 11);
  const labelFs = Math.max(11 * s, 10);
  const smallFs = Math.max(9 * s, 8);

  const leftCx = w * 0.28;
  const rightCx = w * 0.72;

  // Dashed vertical separator
  ctx.strokeStyle = '#dee2e6';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, 14 * s);
  ctx.lineTo(w * 0.5, h - 14 * s);
  ctx.stroke();
  ctx.setLineDash([]);

  // ── Left: Developer view ──
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('개발자 시점', leftCx, 28 * s);

  const boxW = 130 * s;
  const boxH = 32 * s;
  const startY = 56 * s;
  const gap = 18 * s;
  const colors = ['#228be6', '#40c057', '#fab005', '#845ef7'];
  const bgColors = ['#e7f5ff', '#ebfbee', '#fff9db', '#f3f0ff'];

  for (let i = 0; i < DEV_STEPS.length; i++) {
    const bx = leftCx - boxW / 2;
    const by = startY + i * (boxH + gap);

    drawRoundRect(ctx, bx, by, boxW, boxH, 8, bgColors[i], colors[i]);
    ctx.fillStyle = colors[i];
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(DEV_STEPS[i], leftCx, by + boxH / 2);

    if (i < DEV_STEPS.length - 1) {
      drawVArrow(ctx, leftCx, by + boxH + 2, by + boxH + gap - 2, '#adb5bd', s);
    }
  }

  // Bracket label (left side)
  const firstY = startY;
  const lastY = startY + (DEV_STEPS.length - 1) * (boxH + gap) + boxH;
  const bracketX = leftCx - boxW / 2 - 16 * s;
  const midY = (firstY + lastY) / 2;

  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(bracketX, firstY);
  ctx.lineTo(bracketX - 8 * s, firstY);
  ctx.lineTo(bracketX - 8 * s, lastY);
  ctx.lineTo(bracketX, lastY);
  ctx.stroke();

  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('각 단계에서', bracketX - 14 * s, midY - 8 * s);
  ctx.fillText('검증 · 예외 처리', bracketX - 14 * s, midY + 8 * s);

  // ── Right: User view ──
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('사용자 시점', rightCx, 28 * s);

  // Single big button
  const btnW = 150 * s;
  const btnH = 50 * s;
  const btnX = rightCx - btnW / 2;
  const btnY = midY - btnH / 2;

  drawRoundRect(ctx, btnX, btnY, btnW, btnH, 12, '#228be6', '#1971c2', 2);
  ctx.fillStyle = '#fff';
  ctx.font = `600 ${Math.max(15 * s, 12)}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('구매하기', rightCx, btnY + btnH / 2);

  // Subtitle
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('버튼 하나면 끝', rightCx, btnY + btnH + 20 * s);

  return h;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const titleFs = 13;
  const labelFs = 11;
  const smallFs = 9;

  // ── Top: Developer view ──
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('개발자 시점', cx, 20);

  const boxW = Math.min(w * 0.6, 160);
  const boxH = 30;
  const startY = 42;
  const gap = 14;
  const colors = ['#228be6', '#40c057', '#fab005', '#845ef7'];
  const bgColors = ['#e7f5ff', '#ebfbee', '#fff9db', '#f3f0ff'];

  for (let i = 0; i < DEV_STEPS.length; i++) {
    const bx = cx - boxW / 2;
    const by = startY + i * (boxH + gap);

    drawRoundRect(ctx, bx, by, boxW, boxH, 7, bgColors[i], colors[i]);
    ctx.fillStyle = colors[i];
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(DEV_STEPS[i], cx, by + boxH / 2);

    if (i < DEV_STEPS.length - 1) {
      drawVArrow(ctx, cx, by + boxH + 2, by + boxH + gap - 2, '#adb5bd', 1);
    }
  }

  const lastBoxBottom = startY + (DEV_STEPS.length - 1) * (boxH + gap) + boxH;

  // Dashed horizontal separator
  const sepY = lastBoxBottom + 24;
  ctx.strokeStyle = '#dee2e6';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.15, sepY);
  ctx.lineTo(w * 0.85, sepY);
  ctx.stroke();
  ctx.setLineDash([]);

  // ── Bottom: User view ──
  const userTitleY = sepY + 24;
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('사용자 시점', cx, userTitleY);

  const btnW = Math.min(w * 0.5, 140);
  const btnH = 44;
  const btnX = cx - btnW / 2;
  const btnY = userTitleY + 22;

  drawRoundRect(ctx, btnX, btnY, btnW, btnH, 10, '#228be6', '#1971c2', 2);
  ctx.fillStyle = '#fff';
  ctx.font = `600 14px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('구매하기', cx, btnY + btnH / 2);

  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('버튼 하나면 끝', cx, btnY + btnH + 18);

  return btnY + btnH + 40;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const UserDevBoundaryDiagram = ({ caption }: Props) => {
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
        h = 340;
      } else {
        h = 320 * (w / 640);
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
