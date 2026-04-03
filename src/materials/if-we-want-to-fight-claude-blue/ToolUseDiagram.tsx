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

function drawHArrow(
  ctx: CanvasRenderingContext2D,
  x1: number, y: number, x2: number,
  color: string, s: number,
) {
  const dir = x2 > x1 ? 1 : -1;
  const headLen = 7 * s;

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2 - dir * headLen, y);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y);
  ctx.lineTo(x2 - dir * headLen, y - headLen * 0.5);
  ctx.lineTo(x2 - dir * headLen, y + headLen * 0.5);
  ctx.closePath();
  ctx.fill();
}

interface Props {
  caption?: string;
}

function drawScene(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 540;
  const titleFs = Math.max(13 * s, 11);
  const msgFs = Math.max(10 * s, 9);
  const smallFs = Math.max(9 * s, 8);

  const boxW = 100 * s;
  const boxH = 36 * s;

  // 두 라이프라인 X 위치
  const leftMargin = Math.max(w * 0.2, 80 * s);
  const rightMargin = Math.max(w * 0.2, 80 * s);
  const clientX = leftMargin;
  const apiX = w - rightMargin;

  const topY = 10 * s;

  // 헤더 박스
  drawRoundRect(ctx, clientX - boxW / 2, topY, boxW, boxH, 6 * s, '#f8f9fa', '#adb5bd', 1.2);
  ctx.fillStyle = '#495057';
  ctx.font = `bold ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('클라이언트', clientX, topY + boxH / 2);

  drawRoundRect(ctx, apiX - boxW / 2, topY, boxW, boxH, 6 * s, '#e7f5ff', '#228be6', 1.2);
  ctx.fillStyle = '#1971c2';
  ctx.font = `bold ${titleFs}px ${FONT}`;
  ctx.fillText('API (모델)', apiX, topY + boxH / 2);

  // 라이프라인 시작
  const lineStartY = topY + boxH;
  const stepH = 52 * s;
  const midX = (clientX + apiX) / 2;

  // 라이프라인 점선
  const lineEndY = lineStartY + stepH * 5.2;
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.setLineDash([4 * s, 4 * s]);
  ctx.beginPath();
  ctx.moveTo(clientX, lineStartY);
  ctx.lineTo(clientX, lineEndY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(apiX, lineStartY);
  ctx.lineTo(apiX, lineEndY);
  ctx.stroke();
  ctx.setLineDash([]);

  // ① 클라이언트 → API
  const y1 = lineStartY + stepH * 0.7;
  drawHArrow(ctx, clientX, y1, apiX, '#868e96', s);
  ctx.fillStyle = '#495057';
  ctx.font = `${msgFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('① "서울 날씨 알려줘"', midX, y1 - 10 * s);

  // ② API → 클라이언트
  const y2 = lineStartY + stepH * 1.7;
  drawHArrow(ctx, apiX, y2, clientX, '#228be6', s);
  ctx.fillStyle = '#1971c2';
  ctx.font = `${msgFs}px ${FONT}`;
  ctx.fillText('② get_weather("서울")', midX, y2 - 10 * s);

  // 함수 실행 (클라이언트 쪽 셀프 화살표 대신 라벨)
  const y2b = lineStartY + stepH * 2.4;
  const selfW = 40 * s;
  ctx.strokeStyle = '#40c057';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(clientX, y2b - 10 * s);
  ctx.lineTo(clientX + selfW, y2b - 10 * s);
  ctx.lineTo(clientX + selfW, y2b + 10 * s);
  ctx.lineTo(clientX + 7 * s, y2b + 10 * s);
  ctx.stroke();
  // 화살표 머리
  ctx.fillStyle = '#40c057';
  ctx.beginPath();
  ctx.moveTo(clientX, y2b + 10 * s);
  ctx.lineTo(clientX + 7 * s, y2b + 10 * s - 4 * s);
  ctx.lineTo(clientX + 7 * s, y2b + 10 * s + 4 * s);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#2b8a3e';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.fillText('함수 실행', clientX + selfW + 6 * s, y2b);

  // ③ 클라이언트 → API
  const y3 = lineStartY + stepH * 3.4;
  drawHArrow(ctx, clientX, y3, apiX, '#40c057', s);
  ctx.fillStyle = '#2b8a3e';
  ctx.font = `${msgFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('③ 실행 결과: 18°C, 맑음', midX, y3 - 10 * s);

  // ④ API → 클라이언트
  const y4 = lineStartY + stepH * 4.4;
  drawHArrow(ctx, apiX, y4, clientX, '#228be6', s);
  ctx.fillStyle = '#1971c2';
  ctx.font = `${msgFs}px ${FONT}`;
  ctx.fillText('④ "서울은 18°C, 맑습니다"', midX, y4 - 10 * s);

  return lineEndY + 10 * s;
}

export const ToolUseDiagram = ({ caption }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const draw = () => {
      const w = container.clientWidth;
      const dpr = window.devicePixelRatio || 1;

      const ctx = canvas.getContext('2d')!;

      canvas.width = 1;
      canvas.height = 1;
      const h = drawScene(ctx, w);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      drawScene(ctx, w);
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
