import React, { useRef, useEffect } from 'react';

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

const DURATION = 3;
const PAUSE = 1.2;
const CYCLE = DURATION + PAUSE;

interface Props {
  caption?: string;
}

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

function drawArrowhead(ctx: CanvasRenderingContext2D, x: number, y: number, dir: 1 | -1, size: number) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - dir * size, y - size * 0.55);
  ctx.lineTo(x - dir * size, y + size * 0.55);
  ctx.closePath();
  ctx.fill();
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number, p: number): number {
  const s = w / 640;
  const h = 220 * s;

  const titleFs = Math.max(13 * s, 11);
  const labelFs = Math.max(11 * s, 10);
  const codeFs = Math.max(10 * s, 9);

  const boxW = 120 * s;
  const boxH = 140 * s;
  const boxY = (h - boxH) / 2 + 10 * s;
  const gap = w - boxW * 2;
  const clientX = 40 * s;
  const serverX = w - boxW - 40 * s;

  // 클라이언트 박스
  drawRoundRect(ctx, clientX, boxY, boxW, boxH, 8 * s, '#f8f9fa', '#dee2e6');
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('클라이언트', clientX + boxW / 2, boxY + 24 * s);

  // 클라이언트 아이콘 (모니터)
  const iconCx = clientX + boxW / 2;
  const iconCy = boxY + boxH / 2 + 10 * s;
  const iconW = 36 * s;
  const iconH = 26 * s;
  drawRoundRect(ctx, iconCx - iconW / 2, iconCy - iconH / 2, iconW, iconH, 3 * s, '#e7f5ff', '#228be6', 1.2);
  ctx.fillStyle = '#228be6';
  ctx.beginPath();
  ctx.moveTo(iconCx - 6 * s, iconCy + iconH / 2);
  ctx.lineTo(iconCx + 6 * s, iconCy + iconH / 2);
  ctx.lineTo(iconCx + 4 * s, iconCy + iconH / 2 + 6 * s);
  ctx.lineTo(iconCx - 4 * s, iconCy + iconH / 2 + 6 * s);
  ctx.closePath();
  ctx.fillStyle = '#dee2e6';
  ctx.fill();

  // 서버 박스
  drawRoundRect(ctx, serverX, boxY, boxW, boxH, 8 * s, '#f8f9fa', '#dee2e6');
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('LLM API', serverX + boxW / 2, boxY + 24 * s);

  // 서버 아이콘 (서버 랙)
  const sIconCx = serverX + boxW / 2;
  const sIconCy = boxY + boxH / 2 + 10 * s;
  const rackW = 32 * s;
  const rackH = 8 * s;
  for (let i = 0; i < 3; i++) {
    const ry = sIconCy - 12 * s + i * (rackH + 3 * s);
    drawRoundRect(ctx, sIconCx - rackW / 2, ry, rackW, rackH, 2 * s, '#e7f5ff', '#228be6', 1);
    ctx.beginPath();
    ctx.arc(sIconCx + rackW / 2 - 5 * s, ry + rackH / 2, 2 * s, 0, Math.PI * 2);
    ctx.fillStyle = '#228be6';
    ctx.fill();
  }

  // 화살표 영역
  const arrowStartX = clientX + boxW + 12 * s;
  const arrowEndX = serverX - 12 * s;
  const arrowMid = (arrowStartX + arrowEndX) / 2;
  const reqY = boxY + boxH * 0.32;
  const resY = boxY + boxH * 0.72;

  // 요청 화살표 (위)
  const reqPhase = Math.min(p / 0.35, 1);
  const reqEased = easeInOutCubic(reqPhase);
  if (reqPhase > 0) {
    const reqTipX = arrowStartX + (arrowEndX - arrowStartX) * reqEased;
    ctx.strokeStyle = '#228be6';
    ctx.lineWidth = 1.8 * s;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(arrowStartX, reqY);
    ctx.lineTo(reqTipX, reqY);
    ctx.stroke();
    ctx.fillStyle = '#228be6';
    drawArrowhead(ctx, reqTipX, reqY, 1, 7 * s);

    // 요청 라벨
    ctx.globalAlpha = reqEased;
    ctx.fillStyle = '#228be6';
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('요청', arrowMid, reqY - 10 * s);
    ctx.globalAlpha = 1;

    // 요청 패킷 (고정 위치)
    const pw = 110 * s;
    const ph = 22 * s;
    ctx.globalAlpha = reqEased * 0.9;
    drawRoundRect(ctx, arrowMid - pw / 2, reqY + 6 * s, pw, ph, 4 * s, '#e7f5ff', '#228be6', 1);
    ctx.fillStyle = '#228be6';
    ctx.font = `${codeFs}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('Hello, Claude', arrowMid, reqY + 6 * s + ph / 2 + 1);
    ctx.globalAlpha = 1;
  }

  // 서버 처리 표시 (가운데 단계)
  const procPhase = Math.max(0, Math.min((p - 0.3) / 0.25, 1));
  if (procPhase > 0) {
    ctx.globalAlpha = procPhase;
    ctx.fillStyle = '#fab005';
    ctx.font = `${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    const dots = '.'.repeat(1 + Math.floor((p * 10) % 3));
    ctx.fillText(`생성 중${dots}`, serverX + boxW / 2, boxY + boxH + 16 * s);
    ctx.globalAlpha = 1;
  }

  // 응답 화살표 (아래, 스트리밍)
  const resPhase = Math.max(0, Math.min((p - 0.5) / 0.45, 1));
  const resEased = easeInOutCubic(resPhase);
  if (resPhase > 0) {
    const resTipX = arrowEndX - (arrowEndX - arrowStartX) * resEased;
    ctx.strokeStyle = '#40c057';
    ctx.lineWidth = 1.8 * s;
    ctx.setLineDash([4 * s, 3 * s]);
    ctx.beginPath();
    ctx.moveTo(arrowEndX, resY);
    ctx.lineTo(resTipX, resY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#40c057';
    drawArrowhead(ctx, resTipX, resY, -1, 7 * s);

    // 응답 라벨
    ctx.globalAlpha = resEased;
    ctx.fillStyle = '#40c057';
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('스트리밍 응답', arrowMid, resY - 10 * s);
    ctx.globalAlpha = 1;

    // 스트리밍 텍스트 토큰들 (토큰 단위로 뚝뚝 나타남)
    const tokens = ['Hello', '!', ' How', ' can', ' I', ' help', ' you', ' today?'];
    // resEased 0~0.85 구간에서 토큰이 하나씩 나타남 (나머지는 완료 상태 유지)
    const tokenProgress = Math.min(resEased / 0.85, 1);
    const tokenIndex = Math.min(Math.floor(tokenProgress * tokens.length), tokens.length);
    if (tokenIndex > 0) {
      const visibleText = tokens.slice(0, tokenIndex).join('');
      ctx.font = `${codeFs}px monospace`;
      const measuredW = ctx.measureText(visibleText).width;
      const tw = Math.max(measuredW + 24 * s, 60 * s);
      const th = 22 * s;
      const tx = arrowMid - tw / 2;
      ctx.globalAlpha = 0.9;
      drawRoundRect(ctx, tx, resY + 4 * s, tw, th, 4 * s, '#ebfbee', '#40c057', 1);
      ctx.fillStyle = '#40c057';
      ctx.font = `${codeFs}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(visibleText, arrowMid, resY + 4 * s + th / 2 + 1);
      ctx.globalAlpha = 1;
    }
  }

  return h + 24 * s;
}

function drawVertical(ctx: CanvasRenderingContext2D, w: number, p: number): number {
  const s = w / 360;
  const titleFs = Math.max(12 * s, 11);
  const labelFs = Math.max(10 * s, 9);
  const codeFs = Math.max(9 * s, 8);

  const boxW = 120 * s;
  const boxH = 60 * s;
  const cx = w / 2;
  const clientY = 20 * s;
  const serverY = clientY + boxH + 160 * s;
  const totalH = serverY + boxH + 30 * s;

  // 클라이언트 박스
  drawRoundRect(ctx, cx - boxW / 2, clientY, boxW, boxH, 8 * s, '#f8f9fa', '#dee2e6');
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('클라이언트', cx, clientY + boxH / 2);

  // 서버 박스
  drawRoundRect(ctx, cx - boxW / 2, serverY, boxW, boxH, 8 * s, '#f8f9fa', '#dee2e6');
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.fillText('LLM API', cx, serverY + boxH / 2);

  const arrowStartY = clientY + boxH + 4 * s;
  const arrowEndY = serverY - 4 * s;
  const arrowLen = arrowEndY - arrowStartY;
  const reqX = cx - 28 * s;
  const resX = cx + 28 * s;
  const arrowMidY = arrowStartY + arrowLen / 2;

  // 요청 화살표 (왼쪽, 아래로)
  const reqPhase = Math.min(p / 0.35, 1);
  const reqEased = easeInOutCubic(reqPhase);
  if (reqPhase > 0) {
    const tipY = arrowStartY + arrowLen * reqEased;
    ctx.strokeStyle = '#228be6';
    ctx.lineWidth = 1.8 * s;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(reqX, arrowStartY);
    ctx.lineTo(reqX, tipY);
    ctx.stroke();
    ctx.fillStyle = '#228be6';
    ctx.beginPath();
    ctx.moveTo(reqX, tipY);
    ctx.lineTo(reqX - 5 * s, tipY - 7 * s);
    ctx.lineTo(reqX + 5 * s, tipY - 7 * s);
    ctx.closePath();
    ctx.fill();

    // 요청 라벨
    ctx.globalAlpha = reqEased;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'right';
    ctx.fillText('요청', reqX - 10 * s, arrowMidY - 6 * s);
    ctx.globalAlpha = 1;

    // 요청 패킷 (화살표 중간 아래쪽에 고정)
    ctx.globalAlpha = reqEased;
    const pw = 100 * s;
    const ph = 22 * s;
    const packetBoxX = cx - pw - 10 * s;
    drawRoundRect(ctx, packetBoxX, arrowMidY + 6 * s, pw, ph, 4 * s, '#e7f5ff', '#228be6', 1);
    ctx.fillStyle = '#228be6';
    ctx.font = `${codeFs}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('Hello, Claude', packetBoxX + pw / 2, arrowMidY + 6 * s + ph / 2 + 1);
    ctx.globalAlpha = 1;
  }

  // 서버 처리 표시
  const procPhase = Math.max(0, Math.min((p - 0.3) / 0.25, 1));
  if (procPhase > 0) {
    ctx.globalAlpha = procPhase;
    ctx.fillStyle = '#fab005';
    ctx.font = `${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    const dots = '.'.repeat(1 + Math.floor((p * 10) % 3));
    ctx.fillText(`생성 중${dots}`, cx, serverY - 14 * s);
    ctx.globalAlpha = 1;
  }

  // 응답 화살표 (오른쪽, 위로, 점선)
  const resPhase = Math.max(0, Math.min((p - 0.5) / 0.45, 1));
  const resEased = easeInOutCubic(resPhase);
  if (resPhase > 0) {
    const tipY = arrowEndY - arrowLen * resEased;
    ctx.strokeStyle = '#40c057';
    ctx.lineWidth = 1.8 * s;
    ctx.setLineDash([4 * s, 3 * s]);
    ctx.beginPath();
    ctx.moveTo(resX, arrowEndY);
    ctx.lineTo(resX, tipY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#40c057';
    ctx.beginPath();
    ctx.moveTo(resX, tipY);
    ctx.lineTo(resX - 5 * s, tipY + 7 * s);
    ctx.lineTo(resX + 5 * s, tipY + 7 * s);
    ctx.closePath();
    ctx.fill();

    // 응답 라벨
    ctx.globalAlpha = resEased;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'left';
    ctx.fillText('응답', resX + 10 * s, arrowMidY + 6 * s + 22 * s / 2 + 1);
    ctx.globalAlpha = 1;

    // 스트리밍 토큰 (중앙에서 살짝 우측, 위쪽)
    const tokens = ['Hello', '!', ' How', ' can', ' I', ' help', ' you', ' today?'];
    const tokenProgress = Math.min(resEased / 0.85, 1);
    const tokenIndex = Math.min(Math.floor(tokenProgress * tokens.length), tokens.length);
    if (tokenIndex > 0) {
      const visibleText = tokens.slice(0, tokenIndex).join('');
      ctx.font = `${codeFs}px monospace`;
      const measuredW = ctx.measureText(visibleText).width;
      const tw = Math.max(measuredW + 28 * s, 50 * s);
      const tokenBoxX = cx - 20 * s;
      const maxTw = w - tokenBoxX - 10 * s;
      const clampedTw = Math.min(tw, maxTw);
      const th = 22 * s;
      const tokenBoxY = arrowMidY - 6 * s - th;
      ctx.globalAlpha = 0.9;
      drawRoundRect(ctx, tokenBoxX, tokenBoxY, clampedTw, th, 4 * s, '#ebfbee', '#40c057', 1);
      ctx.fillStyle = '#40c057';
      ctx.font = `${codeFs}px monospace`;
      ctx.textAlign = 'left';
      ctx.fillText(visibleText, tokenBoxX + 8 * s, tokenBoxY + th / 2 + 1);
      ctx.globalAlpha = 1;
    }
  }

  return totalH;
}

export const LlmApiDiagram = ({ caption }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let raf: number;

    const animate = (time: number) => {
      if (!startRef.current) startRef.current = time;
      const elapsed = (time - startRef.current) / 1000;
      const cycleT = elapsed % CYCLE;
      const p = Math.min(cycleT / DURATION, 1);

      const w = container.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      const isMobile = w < 480;

      const ctx = canvas.getContext('2d')!;

      // 먼저 높이 계산 (임시 캔버스에서)
      canvas.width = 1;
      canvas.height = 1;
      const tempCtx = canvas.getContext('2d')!;
      const h = isMobile ? drawVertical(tempCtx, w, p) : drawHorizontal(tempCtx, w, p);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      if (isMobile) {
        drawVertical(ctx, w, p);
      } else {
        drawHorizontal(ctx, w, p);
      }

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
