import React, { useRef, useEffect } from 'react';

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

// ── Helpers ──

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string,
  stroke: string,
  lineWidth = 1.5,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function drawBubble(
  ctx: CanvasRenderingContext2D,
  cx: number,
  bottomY: number,
  text: string,
  fontSize: number,
) {
  const padH = 10;
  const padV = 6;
  ctx.font = `${fontSize}px ${FONT}`;
  const tw = ctx.measureText(text).width;
  const bw = tw + padH * 2;
  const bh = fontSize + padV * 2;
  const bx = cx - bw / 2;
  const by = bottomY - bh - 14;

  // Bubble rect
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 6);
  ctx.fillStyle = '#f8f9fa';
  ctx.fill();
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Tail (pointing down)
  ctx.beginPath();
  ctx.moveTo(cx - 5, by + bh - 0.5);
  ctx.lineTo(cx, by + bh + 7);
  ctx.lineTo(cx + 5, by + bh - 0.5);
  ctx.fillStyle = '#f8f9fa';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 5, by + bh);
  ctx.lineTo(cx, by + bh + 7);
  ctx.lineTo(cx + 5, by + bh);
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Text
  ctx.fillStyle = '#495057';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, by + bh / 2);
}

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 520;
  const h = 200 * s;

  const boxW = 140 * s;
  const boxH = 48 * s;
  const boxY = 115 * s;

  // Center boundary line
  const midX = w / 2;
  const callerX = midX - 30 * s - boxW;
  const calleeX = midX + 30 * s;

  const labelFs = Math.max(12 * s, 10);
  const bubbleFs = Math.max(10 * s, 9);
  const floatFs = Math.max(11 * s, 9);
  const smallFs = Math.max(9 * s, 8);

  // ── Caller box ──
  drawRoundRect(ctx, callerX, boxY, boxW, boxH, 10, '#e7f5ff', '#228be6');
  ctx.fillStyle = '#228be6';
  ctx.font = `600 ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('호출자', callerX + boxW / 2, boxY + boxH / 2);

  // ── Callee box ──
  drawRoundRect(ctx, calleeX, boxY, boxW, boxH, 10, '#fff9db', '#fab005');
  ctx.fillStyle = '#fab005';
  ctx.font = `600 ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('피호출자', calleeX + boxW / 2, boxY + boxH / 2);

  // ── Arrow from caller to boundary ──
  const arrowY = boxY + boxH / 2;
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(callerX + boxW + 4, arrowY);
  ctx.lineTo(midX - 4, arrowY);
  ctx.stroke();
  // arrowhead
  ctx.beginPath();
  ctx.fillStyle = '#adb5bd';
  ctx.moveTo(midX - 4, arrowY);
  ctx.lineTo(midX - 10, arrowY - 3.5);
  ctx.lineTo(midX - 10, arrowY + 3.5);
  ctx.closePath();
  ctx.fill();

  // ── Arrow from boundary to callee ──
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(midX + 4, arrowY);
  ctx.lineTo(calleeX - 4, arrowY);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#adb5bd';
  ctx.moveTo(calleeX - 4, arrowY);
  ctx.lineTo(calleeX - 10, arrowY - 3.5);
  ctx.lineTo(calleeX - 10, arrowY + 3.5);
  ctx.closePath();
  ctx.fill();

  // ── Speech bubbles (directly above each box, centered) ──
  drawBubble(ctx, callerX + boxW / 2, boxY, '"null은 안 오겠지"', bubbleFs);
  drawBubble(ctx, calleeX + boxW / 2, boxY, '"알아서 체크하겠지"', bubbleFs);

  // ── Floating responsibility pill ──
  const floatY = boxY - 58 * s;
  const floatText = '책임 (null 체크? 예외 처리?)';

  const pillW = 180 * s;
  const pillH = 26 * s;
  const pillX = midX - pillW / 2;
  const pillYY = floatY - pillH / 2;

  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = '#fa5252';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(pillX, pillYY, pillW, pillH, pillH / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#fa5252';
  ctx.font = `600 ${floatFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(floatText, midX, floatY);

  // Floating indicator lines
  const waveTopY = pillYY - 5 * s;
  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.25;
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    const ly = waveTopY - i * 4 * s;
    const lw = (14 - i * 4) * s;
    ctx.beginPath();
    ctx.moveTo(midX - lw, ly);
    ctx.lineTo(midX + lw, ly);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // ── Boundary: vertical dashed line (split around pill) ──
  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  // Top segment (above pill)
  ctx.beginPath();
  ctx.moveTo(midX, waveTopY - 14 * s);
  ctx.lineTo(midX, pillYY - 2);
  ctx.stroke();
  // Bottom segment (below pill to bottom)
  ctx.beginPath();
  ctx.moveTo(midX, pillYY + pillH + 2);
  ctx.lineTo(midX, 175 * s);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // Boundary label (offset to the right of the line)
  ctx.fillStyle = '#fa5252';
  ctx.globalAlpha = 0.5;
  ctx.font = `600 ${smallFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('경계', midX + 6, 163 * s);
  ctx.globalAlpha = 1;

  return h;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const boxW = w * 0.6;
  const boxH = 42;

  // ── Caller bubble + box ──
  const callerY = 38;
  drawBubble(ctx, cx, callerY, '"null은 안 오겠지"', 10);
  drawRoundRect(ctx, cx - boxW / 2, callerY, boxW, boxH, 10, '#e7f5ff', '#228be6');
  ctx.fillStyle = '#228be6';
  ctx.font = `600 12px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('호출자', cx, callerY + boxH / 2);

  // Arrow down
  const arrow1Top = callerY + boxH + 6;
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, arrow1Top);
  ctx.lineTo(cx, arrow1Top + 18);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#adb5bd';
  ctx.moveTo(cx, arrow1Top + 22);
  ctx.lineTo(cx - 3.5, arrow1Top + 16);
  ctx.lineTo(cx + 3.5, arrow1Top + 16);
  ctx.closePath();
  ctx.fill();

  // ── Boundary zone (horizontal dashed line + label) ──
  const bndY = arrow1Top + 32;
  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(w * 0.1, bndY);
  ctx.lineTo(w * 0.9, bndY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  ctx.fillStyle = '#fa5252';
  ctx.globalAlpha = 0.5;
  ctx.font = `600 9px ${FONT}`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('경계', w * 0.9, bndY - 4);
  ctx.globalAlpha = 1;

  // ── Floating responsibility pill ──
  const floatY = bndY + 30;
  const pillW = w * 0.75;
  const pillH = 26;

  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = '#fa5252';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(cx - pillW / 2, floatY - pillH / 2, pillW, pillH, pillH / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#fa5252';
  ctx.font = `600 10px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('책임 (null 체크? 예외 처리?)', cx, floatY);

  // Floating indicator
  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.25;
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    const ly = floatY - pillH / 2 - 5 - i * 4;
    const lw = 14 - i * 4;
    ctx.beginPath();
    ctx.moveTo(cx - lw, ly);
    ctx.lineTo(cx + lw, ly);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Arrow down
  const arrow2Top = floatY + pillH / 2 + 8;
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, arrow2Top);
  ctx.lineTo(cx, arrow2Top + 18);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#adb5bd';
  ctx.moveTo(cx, arrow2Top + 22);
  ctx.lineTo(cx - 3.5, arrow2Top + 16);
  ctx.lineTo(cx + 3.5, arrow2Top + 16);
  ctx.closePath();
  ctx.fill();

  // ── Callee box + bubble ──
  const calleeY = arrow2Top + 30;
  drawRoundRect(ctx, cx - boxW / 2, calleeY, boxW, boxH, 10, '#fff9db', '#fab005');
  ctx.fillStyle = '#fab005';
  ctx.font = `600 12px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('피호출자', cx, calleeY + boxH / 2);

  // Callee bubble (below)
  const bubbleY = calleeY + boxH + 10;
  const bText = '"알아서 체크하겠지"';
  ctx.font = `10px ${FONT}`;
  const btw = ctx.measureText(bText).width;
  const bbw = btw + 20;
  const bbh = 24;
  const bbx = cx - bbw / 2;

  ctx.beginPath();
  ctx.roundRect(bbx, bubbleY, bbw, bbh, 6);
  ctx.fillStyle = '#f8f9fa';
  ctx.fill();
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Tail pointing up
  ctx.beginPath();
  ctx.moveTo(cx - 5, bubbleY + 0.5);
  ctx.lineTo(cx, bubbleY - 7);
  ctx.lineTo(cx + 5, bubbleY + 0.5);
  ctx.fillStyle = '#f8f9fa';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 5, bubbleY);
  ctx.lineTo(cx, bubbleY - 7);
  ctx.lineTo(cx + 5, bubbleY);
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#495057';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(bText, cx, bubbleY + bbh / 2);

  return bubbleY + bbh + 16;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const CallerCalleeBoundaryDiagram = ({ caption }: Props) => {
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
        h = 320;
      } else {
        h = 200 * (w / 520);
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
