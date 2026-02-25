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
  const s = w / 560;

  const colW = 190 * s;
  const gap = 50 * s;
  const leftX = (w - colW * 2 - gap) / 2;
  const rightX = leftX + colW + gap;

  const titleFs = Math.max(12 * s, 10);
  const subtitleFs = Math.max(9 * s, 8);
  const labelFs = Math.max(9 * s, 8);
  const smallFs = Math.max(8 * s, 7);
  const resultFs = Math.max(10 * s, 9);

  const headerY = 12 * s;
  const subY = headerY + 16 * s;
  const startY = subY + 18 * s;
  const eventH = 28 * s;
  const eventGap = 10 * s;
  const innerPad = 10 * s;

  const aCx = leftX + colW / 2;
  const bCx = rightX + colW / 2;

  // ── Left: 주문 서비스 (발행 순서) ──
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('주문 서비스', aCx, headerY);

  ctx.fillStyle = '#868e96';
  ctx.font = `${subtitleFs}px ${FONT}`;
  ctx.fillText('이벤트 발행 순서', aCx, subY);

  // Event 1
  const e1Y = startY;
  drawRoundRect(ctx, leftX + innerPad, e1Y, colW - innerPad * 2, eventH, 5, '#e7f5ff', '#74c0fc');
  ctx.fillStyle = '#228be6';
  ctx.font = `600 ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('① 주문 생성', aCx, e1Y + eventH / 2);

  // Arrow
  const a1Bottom = e1Y + eventH;
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(aCx, a1Bottom + 2);
  ctx.lineTo(aCx, a1Bottom + eventGap - 3);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#adb5bd';
  ctx.moveTo(aCx, a1Bottom + eventGap);
  ctx.lineTo(aCx - 3, a1Bottom + eventGap - 5);
  ctx.lineTo(aCx + 3, a1Bottom + eventGap - 5);
  ctx.closePath();
  ctx.fill();

  // Event 2
  const e2Y = a1Bottom + eventGap;
  drawRoundRect(ctx, leftX + innerPad, e2Y, colW - innerPad * 2, eventH, 5, '#fff9db', '#ffd43b');
  ctx.fillStyle = '#e8590c';
  ctx.font = `600 ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('② 주소 변경 (서울→부산)', aCx, e2Y + eventH / 2);

  // Result
  const aResultY = e2Y + eventH + eventGap + 6 * s;
  drawRoundRect(ctx, leftX + innerPad, aResultY, colW - innerPad * 2, eventH, 5, '#ebfbee', '#69db7c');
  ctx.fillStyle = '#40c057';
  ctx.font = `600 ${resultFs}px ${FONT}`;
  ctx.fillText('부산으로 배송 ✓', aCx, aResultY + eventH / 2);

  // ── Right: 배송 서비스 (수신 순서) ──
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('배송 서비스', bCx, headerY);

  ctx.fillStyle = '#868e96';
  ctx.font = `${subtitleFs}px ${FONT}`;
  ctx.fillText('이벤트 수신 순서', bCx, subY);

  // Event 2 arrives first
  const bE1Y = startY;
  drawRoundRect(ctx, rightX + innerPad, bE1Y, colW - innerPad * 2, eventH, 5, '#fff9db', '#ffd43b');
  ctx.fillStyle = '#e8590c';
  ctx.font = `600 ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('② 주소 변경 (서울→부산)', bCx, bE1Y + eventH / 2);

  // Note: ignored because order doesn't exist yet
  ctx.fillStyle = '#fa5252';
  ctx.globalAlpha = 0.6;
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('주문이 없어 무시됨', bCx, bE1Y + eventH + 2);
  ctx.globalAlpha = 1;

  // Arrow
  const b1Bottom = bE1Y + eventH + 12 * s;
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(bCx, b1Bottom + 2);
  ctx.lineTo(bCx, b1Bottom + eventGap - 3);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#adb5bd';
  ctx.moveTo(bCx, b1Bottom + eventGap);
  ctx.lineTo(bCx - 3, b1Bottom + eventGap - 5);
  ctx.lineTo(bCx + 3, b1Bottom + eventGap - 5);
  ctx.closePath();
  ctx.fill();

  // Event 1 arrives second
  const bE2Y = b1Bottom + eventGap;
  drawRoundRect(ctx, rightX + innerPad, bE2Y, colW - innerPad * 2, eventH, 5, '#e7f5ff', '#74c0fc');
  ctx.fillStyle = '#228be6';
  ctx.font = `600 ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('① 주문 생성', bCx, bE2Y + eventH / 2);

  // Result
  const bResultY = bE2Y + eventH + eventGap - 4 * s;
  drawRoundRect(ctx, rightX + innerPad, bResultY, colW - innerPad * 2, eventH, 5, '#fff5f5', '#ffc9c9');
  ctx.fillStyle = '#fa5252';
  ctx.font = `600 ${resultFs}px ${FONT}`;
  ctx.fillText('서울로 배송 ✗', bCx, bResultY + eventH / 2);

  // ── Crossing propagation lines ──
  const aE1Mid = e1Y + eventH / 2;
  const aE2Mid = e2Y + eventH / 2;
  const bE1Mid = bE1Y + eventH / 2;
  const bE2Mid = bE2Y + eventH / 2;

  // Event 1 (blue): left early → right late
  ctx.strokeStyle = '#228be6';
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(leftX + colW - innerPad, aE1Mid);
  ctx.lineTo(rightX + innerPad, bE2Mid);
  ctx.stroke();

  // Event 2 (orange): left late → right early
  ctx.strokeStyle = '#e8590c';
  ctx.beginPath();
  ctx.moveTo(leftX + colW - innerPad, aE2Mid);
  ctx.lineTo(rightX + innerPad, bE1Mid);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // "네트워크 지연" label at crossing point
  const midX = (leftX + colW + rightX) / 2;
  const crossY = (aE1Mid + aE2Mid) / 2;
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('네트워크 지연', midX, crossY - 2 * s);

  return Math.max(aResultY, bResultY) + eventH + 10 * s;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const pad = w * 0.08;
  const innerW = w - pad * 2 - 20;

  const eventH = 28;
  const eventGap = 8;

  let y = 6;

  // ── 주문 서비스 ──
  ctx.fillStyle = '#495057';
  ctx.font = `600 12px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('주문 서비스', cx, y);
  y += 16;
  ctx.fillStyle = '#868e96';
  ctx.font = `9px ${FONT}`;
  ctx.fillText('이벤트 발행 순서', cx, y);
  y += 18;

  drawRoundRect(ctx, pad + 10, y, innerW, eventH, 5, '#e7f5ff', '#74c0fc');
  ctx.fillStyle = '#228be6';
  ctx.font = `600 9px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('① 주문 생성', cx, y + eventH / 2);
  y += eventH + eventGap;

  drawRoundRect(ctx, pad + 10, y, innerW, eventH, 5, '#fff9db', '#ffd43b');
  ctx.fillStyle = '#e8590c';
  ctx.font = `600 9px ${FONT}`;
  ctx.fillText('② 주소 변경 (서울→부산)', cx, y + eventH / 2);
  y += eventH + eventGap + 4;

  drawRoundRect(ctx, pad + 10, y, innerW, eventH, 5, '#ebfbee', '#69db7c');
  ctx.fillStyle = '#40c057';
  ctx.font = `600 10px ${FONT}`;
  ctx.fillText('부산으로 배송 ✓', cx, y + eventH / 2);
  y += eventH + 14;

  // Separator
  ctx.strokeStyle = '#fa5252';
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(pad, y);
  ctx.lineTo(w - pad, y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  ctx.fillStyle = '#868e96';
  ctx.font = `8px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('네트워크 지연으로 순서 역전', cx, y - 3);
  y += 14;

  // ── 배송 서비스 ──
  ctx.fillStyle = '#495057';
  ctx.font = `600 12px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('배송 서비스', cx, y);
  y += 16;
  ctx.fillStyle = '#868e96';
  ctx.font = `9px ${FONT}`;
  ctx.fillText('이벤트 수신 순서', cx, y);
  y += 18;

  drawRoundRect(ctx, pad + 10, y, innerW, eventH, 5, '#fff9db', '#ffd43b');
  ctx.fillStyle = '#e8590c';
  ctx.font = `600 9px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('② 주소 변경 (서울→부산)', cx, y + eventH / 2);
  y += eventH + 2;

  ctx.fillStyle = '#fa5252';
  ctx.globalAlpha = 0.6;
  ctx.font = `8px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('주문이 없어 무시됨', cx, y);
  ctx.globalAlpha = 1;
  y += 14;

  drawRoundRect(ctx, pad + 10, y, innerW, eventH, 5, '#e7f5ff', '#74c0fc');
  ctx.fillStyle = '#228be6';
  ctx.font = `600 9px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('① 주문 생성', cx, y + eventH / 2);
  y += eventH + eventGap + 4;

  drawRoundRect(ctx, pad + 10, y, innerW, eventH, 5, '#fff5f5', '#ffc9c9');
  ctx.fillStyle = '#fa5252';
  ctx.font = `600 10px ${FONT}`;
  ctx.fillText('서울로 배송 ✗', cx, y + eventH / 2);
  y += eventH + 10;

  return y;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const DistributedOrderDiagram = ({ caption }: Props) => {
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
        h = 380;
      } else {
        h = 210 * (w / 560);
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
