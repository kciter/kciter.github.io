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

  const titleFs = Math.max(10 * s, 8);
  const labelFs = Math.max(9 * s, 7);
  const smallFs = Math.max(7.5 * s, 6.5);
  const tinyFs = Math.max(6.5 * s, 6);

  const sectionW = 210 * s;
  const sectionGap = 40 * s;
  const leftSX = (w - sectionW * 2 - sectionGap) / 2;
  const rightSX = leftSX + sectionW + sectionGap;

  // ── Section titles ──
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('기능 조직', leftSX + sectionW / 2, 14 * s);
  ctx.fillText('목적 조직', rightSX + sectionW / 2, 14 * s);

  const divX = (leftSX + sectionW + rightSX) / 2;

  // ════════════════════════════════════════
  // LEFT: Functional teams → Layered architecture
  // ════════════════════════════════════════

  const lTeams = [
    { label: '프론트엔드팀', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
    { label: '백엔드팀', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
    { label: '데이터팀', color: '#fab005', bg: '#fff9db', border: '#ffe066' },
  ];

  const lBoxW = sectionW - 20 * s;
  const lBoxH = 26 * s;
  const lGap = 3 * s;
  const lStartX = leftSX + (sectionW - lBoxW) / 2;
  let lY = 28 * s;

  // Team label
  ctx.fillStyle = '#868e96';
  ctx.font = `${tinyFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText('조직', lStartX, lY - 2);
  lY += 2;

  for (let i = 0; i < lTeams.length; i++) {
    const t = lTeams[i];
    drawRoundRect(ctx, lStartX, lY, lBoxW, lBoxH, 6, t.bg, t.border);
    ctx.fillStyle = t.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.label, lStartX + lBoxW / 2, lY + lBoxH / 2);

    // Horizontal boundary between teams
    if (i < lTeams.length - 1) {
      const bndY = lY + lBoxH + lGap / 2;
      ctx.strokeStyle = '#fa5252';
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(lStartX - 6 * s, bndY);
      ctx.lineTo(lStartX + lBoxW + 6 * s, bndY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    lY += lBoxH + lGap;
  }

  // Arrow down
  const arrowTopY = lY + 4 * s;
  const arrowBotY = arrowTopY + 16 * s;
  const arrowCX = leftSX + sectionW / 2;
  ctx.strokeStyle = '#868e96';
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(arrowCX, arrowTopY);
  ctx.lineTo(arrowCX, arrowBotY - 4);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#868e96';
  ctx.moveTo(arrowCX, arrowBotY);
  ctx.lineTo(arrowCX - 3.5, arrowBotY - 6);
  ctx.lineTo(arrowCX + 3.5, arrowBotY - 6);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  // System layers
  const lLayers = [
    { label: 'UI Layer', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
    { label: 'API Layer', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
    { label: 'DB Layer', color: '#fab005', bg: '#fff9db', border: '#ffe066' },
  ];

  let sY = arrowBotY + 6 * s;

  ctx.fillStyle = '#868e96';
  ctx.font = `${tinyFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText('시스템', lStartX, sY - 2);
  sY += 2;

  for (let i = 0; i < lLayers.length; i++) {
    const l = lLayers[i];
    drawRoundRect(ctx, lStartX, sY, lBoxW, lBoxH, 6, l.bg, l.border);
    ctx.fillStyle = l.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(l.label, lStartX + lBoxW / 2, sY + lBoxH / 2);

    if (i < lLayers.length - 1) {
      const bndY = sY + lBoxH + lGap / 2;
      ctx.strokeStyle = '#fa5252';
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(lStartX - 6 * s, bndY);
      ctx.lineTo(lStartX + lBoxW + 6 * s, bndY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    sY += lBoxH + lGap;
  }

  // Record left bottom for alignment
  const leftBottomY = sY;

  // Left caption
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('경계가 수평 → 변경이 모든 팀을 관통', leftSX + sectionW / 2, sY + 4 * s);

  // ════════════════════════════════════════
  // RIGHT: Team Topologies → Domain services
  // ════════════════════════════════════════

  const rTeams = [
    { label: '주문', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
    { label: '결제', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
    { label: '배송', color: '#fab005', bg: '#fff9db', border: '#ffe066' },
  ];

  const rColW = (sectionW - 12 * s) / 3;
  const rColGap = 6 * s;
  const rStartX = rightSX;
  const rRowH = 26 * s;
  const rRowGap = 3 * s;
  const rRows = ['FE', 'BE', 'DB'];

  let rY = 28 * s;

  ctx.fillStyle = '#868e96';
  ctx.font = `${tinyFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText('조직', rStartX, rY - 2);
  rY += 2;

  // Team header row
  for (let col = 0; col < rTeams.length; col++) {
    const t = rTeams[col];
    const cx = rStartX + col * (rColW + rColGap);
    drawRoundRect(ctx, cx, rY, rColW, rRowH, 6, t.bg, t.border);
    ctx.fillStyle = t.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.label + '팀', cx + rColW / 2, rY + rRowH / 2);
  }

  rY += rRowH + rRowGap;

  // Sublayers (FE, BE, DB) per team
  for (let row = 0; row < rRows.length; row++) {
    for (let col = 0; col < rTeams.length; col++) {
      const t = rTeams[col];
      const cx = rStartX + col * (rColW + rColGap);
      drawRoundRect(ctx, cx, rY, rColW, rRowH, 4, t.bg + '80', t.border + '60', 1);
      ctx.fillStyle = t.color;
      ctx.globalAlpha = 0.6;
      ctx.font = `${smallFs}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(rRows[row], cx + rColW / 2, rY + rRowH / 2);
      ctx.globalAlpha = 1;
    }
    rY += rRowH + rRowGap;
  }

  // Vertical boundaries between columns
  for (let col = 0; col < rTeams.length - 1; col++) {
    const bx = rStartX + (col + 1) * (rColW + rColGap) - rColGap / 2;
    ctx.strokeStyle = '#fa5252';
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(bx, 30 * s);
    ctx.lineTo(bx, rY - rRowGap);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  // Arrow down
  const rArrowTopY = rY + 4 * s;
  const rArrowBotY = rArrowTopY + 16 * s;
  const rArrowCX = rightSX + sectionW / 2;
  ctx.strokeStyle = '#868e96';
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(rArrowCX, rArrowTopY);
  ctx.lineTo(rArrowCX, rArrowBotY - 4);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#868e96';
  ctx.moveTo(rArrowCX, rArrowBotY);
  ctx.lineTo(rArrowCX - 3.5, rArrowBotY - 6);
  ctx.lineTo(rArrowCX + 3.5, rArrowBotY - 6);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  // Service boxes (vertical columns)
  let rsY = rArrowBotY + 6 * s;

  ctx.fillStyle = '#868e96';
  ctx.font = `${tinyFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText('시스템', rStartX, rsY - 2);
  rsY += 2;

  const svcNames = ['주문 서비스', '결제 서비스', '배송 서비스'];
  const svcH = Math.max(leftBottomY - rsY - 3, rRowH * 1.5);

  for (let col = 0; col < rTeams.length; col++) {
    const t = rTeams[col];
    const cx = rStartX + col * (rColW + rColGap);
    drawRoundRect(ctx, cx, rsY, rColW, svcH, 6, t.bg, t.border);
    ctx.fillStyle = t.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Vertical text for service name
    const name = svcNames[col];
    ctx.fillText(name, cx + rColW / 2, rsY + svcH / 2);
  }

  // Vertical boundaries between service columns
  for (let col = 0; col < rTeams.length - 1; col++) {
    const bx = rStartX + (col + 1) * (rColW + rColGap) - rColGap / 2;
    ctx.strokeStyle = '#fa5252';
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(bx, rsY - 4 * s);
    ctx.lineTo(bx, rsY + svcH + 4 * s);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  // Right caption
  const rBottomY = rsY + svcH;
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('경계가 수직 → 변경이 팀 안에서 완결', rightSX + sectionW / 2, leftBottomY + 4 * s);

  // ── Vertical divider (drawn last so we know the full height) ──
  const bottomY = rBottomY + 18 * s;
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(divX, 4 * s);
  ctx.lineTo(divX, bottomY - 4 * s);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  return bottomY;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const pad = w * 0.04;

  const titleFs = 9;
  const labelFs = 8;
  const smallFs = 7;
  const tinyFs = 6.5;

  let y = 4;

  // ── LEFT SECTION: Functional ──
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('기능 조직', cx, y);
  y += 16;

  const lTeams = [
    { label: '프론트엔드팀', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
    { label: '백엔드팀', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
    { label: '데이터팀', color: '#fab005', bg: '#fff9db', border: '#ffe066' },
  ];

  const boxW = w - pad * 2;
  const boxH = 22;
  const gap = 3;

  // Team label
  ctx.fillStyle = '#868e96';
  ctx.font = `${tinyFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText('조직', pad, y - 1);

  for (let i = 0; i < lTeams.length; i++) {
    const t = lTeams[i];
    drawRoundRect(ctx, pad, y, boxW, boxH, 5, t.bg, t.border, 1);
    ctx.fillStyle = t.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.label, cx, y + boxH / 2);
    y += boxH + gap;
  }

  // Arrow
  y += 2;
  ctx.strokeStyle = '#868e96';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(cx, y);
  ctx.lineTo(cx, y + 10);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#868e96';
  ctx.moveTo(cx, y + 13);
  ctx.lineTo(cx - 3, y + 8);
  ctx.lineTo(cx + 3, y + 8);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  y += 16;

  // System layers
  ctx.fillStyle = '#868e96';
  ctx.font = `${tinyFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText('시스템', pad, y - 1);

  const lLayers = [
    { label: 'UI Layer', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
    { label: 'API Layer', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
    { label: 'DB Layer', color: '#fab005', bg: '#fff9db', border: '#ffe066' },
  ];

  for (let i = 0; i < lLayers.length; i++) {
    const l = lLayers[i];
    drawRoundRect(ctx, pad, y, boxW, boxH, 5, l.bg, l.border, 1);
    ctx.fillStyle = l.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(l.label, cx, y + boxH / 2);
    y += boxH + gap;
  }

  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('경계가 수평 → 변경이 모든 팀을 관통', cx, y + 2);
  y += 18;

  // ── Divider ──
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(pad, y);
  ctx.lineTo(w - pad, y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  y += 12;

  // ── RIGHT SECTION: Team Topologies ──
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('목적 조직', cx, y);
  y += 16;

  const rTeams = [
    { label: '주문', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
    { label: '결제', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
    { label: '배송', color: '#fab005', bg: '#fff9db', border: '#ffe066' },
  ];

  const colW = (boxW - 8) / 3;
  const colGap = 4;
  const rRows = ['FE', 'BE', 'DB'];

  ctx.fillStyle = '#868e96';
  ctx.font = `${tinyFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText('조직', pad, y - 1);

  // Team headers
  for (let col = 0; col < rTeams.length; col++) {
    const t = rTeams[col];
    const colX = pad + col * (colW + colGap);
    drawRoundRect(ctx, colX, y, colW, boxH, 5, t.bg, t.border, 1);
    ctx.fillStyle = t.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.label + '팀', colX + colW / 2, y + boxH / 2);
  }
  y += boxH + gap;

  // Sublayers
  for (let row = 0; row < rRows.length; row++) {
    for (let col = 0; col < rTeams.length; col++) {
      const t = rTeams[col];
      const colX = pad + col * (colW + colGap);
      drawRoundRect(ctx, colX, y, colW, boxH, 4, t.bg + '80', t.border + '60', 1);
      ctx.fillStyle = t.color;
      ctx.globalAlpha = 0.6;
      ctx.font = `${smallFs}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(rRows[row], colX + colW / 2, y + boxH / 2);
      ctx.globalAlpha = 1;
    }
    y += boxH + gap;
  }

  // Arrow
  y += 2;
  ctx.strokeStyle = '#868e96';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(cx, y);
  ctx.lineTo(cx, y + 10);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#868e96';
  ctx.moveTo(cx, y + 13);
  ctx.lineTo(cx - 3, y + 8);
  ctx.lineTo(cx + 3, y + 8);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  y += 16;

  // Service columns
  ctx.fillStyle = '#868e96';
  ctx.font = `${tinyFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText('시스템', pad, y - 1);

  const svcNames = ['주문 서비스', '결제 서비스', '배송 서비스'];
  const svcH = 50;

  for (let col = 0; col < rTeams.length; col++) {
    const t = rTeams[col];
    const colX = pad + col * (colW + colGap);
    drawRoundRect(ctx, colX, y, colW, svcH, 5, t.bg, t.border, 1);
    ctx.fillStyle = t.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(svcNames[col], colX + colW / 2, y + svcH / 2);
  }
  y += svcH;

  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('경계가 수직 → 변경이 팀 안에서 완결', cx, y + 4);

  return y + 18;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const ConwaysLawDiagram = ({ caption }: Props) => {
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
        h = 420;
      } else {
        h = 250 * (w / 540);
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
