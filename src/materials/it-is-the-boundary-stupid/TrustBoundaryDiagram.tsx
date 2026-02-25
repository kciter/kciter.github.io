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

const CHECK_ITEMS = ['입력 검증', '서명 확인', '신원 인증'];

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 520;
  const pad = 16 * s;
  const centerY = 68 * s;

  const boxW = 120 * s;
  const boxH = 80 * s;
  const boxY = centerY - boxH / 2;

  const circR = 50 * s;
  const circX = w / 2;

  const titleFs = Math.max(12 * s, 9);
  const labelFs = Math.max(10 * s, 8);
  const smallFs = Math.max(9 * s, 7);

  // ── Left box: untrusted (dashed border) ──
  ctx.beginPath();
  ctx.roundRect(pad, boxY, boxW, boxH, 10);
  ctx.fillStyle = '#fff5f5';
  ctx.fill();
  ctx.strokeStyle = '#fa5252';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#e03131';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('경계 밖', pad + boxW / 2, centerY - 6 * s);

  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.fillText('신뢰할 수 없는 영역', pad + boxW / 2, centerY + 10 * s);

  // ── Right box: trusted (solid border) ──
  const rzX = w - pad - boxW;
  drawRoundRect(ctx, rzX, boxY, boxW, boxH, 10, '#e7f5ff', '#228be6');

  ctx.fillStyle = '#228be6';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('경계 안', rzX + boxW / 2, centerY - 6 * s);

  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.fillText('신뢰할 수 있는 영역', rzX + boxW / 2, centerY + 10 * s);

  // ── Boundary dashed lines (above & below circle) ──
  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  // Top segment
  ctx.beginPath();
  ctx.moveTo(circX, 2 * s);
  ctx.lineTo(circX, centerY - circR - 2);
  ctx.stroke();
  // Bottom segment
  ctx.beginPath();
  ctx.moveTo(circX, centerY + circR + 2);
  ctx.lineTo(circX, centerY + circR + 18 * s);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // "경계" label
  ctx.fillStyle = '#fa5252';
  ctx.globalAlpha = 0.5;
  ctx.font = `600 ${smallFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('경계', circX + 4, 2 * s);
  ctx.globalAlpha = 1;

  // ── Circle: verification checkpoint ──
  ctx.beginPath();
  ctx.arc(circX, centerY, circR, 0, Math.PI * 2);
  ctx.fillStyle = '#fff9db';
  ctx.fill();
  ctx.strokeStyle = '#fab005';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Items inside circle
  ctx.fillStyle = '#e8590c';
  ctx.font = `600 ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < CHECK_ITEMS.length; i++) {
    ctx.fillText(CHECK_ITEMS[i], circX, centerY - 18 * s + i * 13 * s);
  }
  ctx.fillText('...', circX, centerY + 21 * s);

  // Question below circle
  ctx.fillStyle = '#e8590c';
  ctx.globalAlpha = 0.6;
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('신뢰할 수 있는 요청인가?', circX, centerY + circR + 20 * s);
  ctx.globalAlpha = 1;

  // ── Arrows ──
  // Left box → circle
  const arrLeftEnd = circX - circR - 4;
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(pad + boxW + 4, centerY);
  ctx.lineTo(arrLeftEnd, centerY);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#adb5bd';
  ctx.moveTo(arrLeftEnd + 2, centerY);
  ctx.lineTo(arrLeftEnd - 4, centerY - 3.5);
  ctx.lineTo(arrLeftEnd - 4, centerY + 3.5);
  ctx.closePath();
  ctx.fill();

  // Circle → right box (green arrowhead)
  const arrRightStart = circX + circR + 4;
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(arrRightStart, centerY);
  ctx.lineTo(rzX - 6, centerY);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#40c057';
  ctx.moveTo(rzX - 2, centerY);
  ctx.lineTo(rzX - 8, centerY - 3.5);
  ctx.lineTo(rzX - 8, centerY + 3.5);
  ctx.closePath();
  ctx.fill();

  return centerY + circR + 38 * s;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const pad = w * 0.1;
  const boxW = w - pad * 2;
  const boxH = 46;
  const circR = 44;

  // ── Top box: untrusted ──
  const topY = 8;
  ctx.beginPath();
  ctx.roundRect(pad, topY, boxW, boxH, 10);
  ctx.fillStyle = '#fff5f5';
  ctx.fill();
  ctx.strokeStyle = '#fa5252';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#e03131';
  ctx.font = `600 11px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('경계 밖', cx, topY + boxH / 2 - 5);

  ctx.fillStyle = '#868e96';
  ctx.font = `8px ${FONT}`;
  ctx.fillText('신뢰할 수 없는 영역', cx, topY + boxH / 2 + 9);

  // ── Arrow down ──
  const arr1Top = topY + boxH + 4;
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, arr1Top);
  ctx.lineTo(cx, arr1Top + 14);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#adb5bd';
  ctx.moveTo(cx, arr1Top + 18);
  ctx.lineTo(cx - 3.5, arr1Top + 12);
  ctx.lineTo(cx + 3.5, arr1Top + 12);
  ctx.closePath();
  ctx.fill();

  // ── Boundary dashed line (behind circle) ──
  const circCY = arr1Top + 22 + circR;

  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(pad, circCY);
  ctx.lineTo(cx - circR - 4, circCY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + circR + 4, circCY);
  ctx.lineTo(w - pad, circCY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  ctx.fillStyle = '#fa5252';
  ctx.globalAlpha = 0.5;
  ctx.font = `600 9px ${FONT}`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('경계', w - pad, circCY - 4);
  ctx.globalAlpha = 1;

  // ── Circle: verification checkpoint ──
  ctx.beginPath();
  ctx.arc(cx, circCY, circR, 0, Math.PI * 2);
  ctx.fillStyle = '#fff9db';
  ctx.fill();
  ctx.strokeStyle = '#fab005';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#e8590c';
  ctx.font = `600 10px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < CHECK_ITEMS.length; i++) {
    ctx.fillText(CHECK_ITEMS[i], cx, circCY - 16 + i * 12);
  }
  ctx.fillText('...', cx, circCY + 20);

  // Question below circle
  ctx.fillStyle = '#e8590c';
  ctx.globalAlpha = 0.6;
  ctx.font = `8px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('신뢰할 수 있는 요청인가?', cx, circCY + circR + 5);
  ctx.globalAlpha = 1;

  // ── Arrow down ──
  const arr2Top = circCY + circR + 20;
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, arr2Top);
  ctx.lineTo(cx, arr2Top + 14);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#40c057';
  ctx.moveTo(cx, arr2Top + 18);
  ctx.lineTo(cx - 3.5, arr2Top + 12);
  ctx.lineTo(cx + 3.5, arr2Top + 12);
  ctx.closePath();
  ctx.fill();

  // ── Bottom box: trusted ──
  const botY = arr2Top + 22;
  drawRoundRect(ctx, pad, botY, boxW, boxH, 10, '#e7f5ff', '#228be6');

  ctx.fillStyle = '#228be6';
  ctx.font = `600 11px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('경계 안', cx, botY + boxH / 2 - 5);

  ctx.fillStyle = '#868e96';
  ctx.font = `8px ${FONT}`;
  ctx.fillText('신뢰할 수 있는 영역', cx, botY + boxH / 2 + 9);

  return botY + boxH + 10;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const TrustBoundaryDiagram = ({ caption }: Props) => {
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
        h = 300;
      } else {
        h = 162 * (w / 520);
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
