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
  const headLen = 7 * s;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x, y1);
  ctx.lineTo(x, y2 - headLen);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y2);
  ctx.lineTo(x - 5 * s, y2 - headLen);
  ctx.lineTo(x + 5 * s, y2 - headLen);
  ctx.closePath();
  ctx.fill();
}

function drawHArrow(ctx: CanvasRenderingContext2D, x1: number, y: number, x2: number, color: string, s: number) {
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
  ctx.lineTo(x2 - dir * headLen, y - 5 * s);
  ctx.lineTo(x2 - dir * headLen, y + 5 * s);
  ctx.closePath();
  ctx.fill();
}

interface Props {
  caption?: string;
}

function drawScene(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 540;
  const titleFs = Math.max(13 * s, 11);
  const labelFs = Math.max(11 * s, 10);
  const smallFs = Math.max(9 * s, 8);

  const cx = w / 2;
  const boxW = 150 * s;
  const boxH = 38 * s;
  const stepGap = 28 * s;

  // 4단계 위에서 아래로
  const startY = 20 * s;
  const y1 = startY;
  const y2 = y1 + boxH + stepGap;
  const y3 = y2 + boxH + stepGap;
  const y4 = y3 + boxH + stepGap;

  // 1. 프롬프트 주입
  drawRoundRect(ctx, cx - boxW / 2, y1, boxW, boxH, 6 * s, '#e7f5ff', '#228be6', 1.2);
  ctx.fillStyle = '#1971c2';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('프롬프트 주입', cx, y1 + boxH / 2);

  // ↓
  drawVArrow(ctx, cx, y1 + boxH, y2, '#228be6', s);

  // 2. 에이전트 실행
  drawRoundRect(ctx, cx - boxW / 2, y2, boxW, boxH, 6 * s, '#fff9db', '#fab005', 1.2);
  ctx.fillStyle = '#e67700';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.fillText('에이전트 실행', cx, y2 + boxH / 2);

  // ↓
  drawVArrow(ctx, cx, y2 + boxH, y3, '#fab005', s);

  // 에이전트 실행 오른쪽에 상태 저장 표시
  const stateGap = 50 * s;
  const stateX = cx + boxW / 2 + stateGap;
  const stateW = 105 * s;
  const stateH = boxH;
  const stateCy = y2 + boxH / 2;
  drawRoundRect(ctx, stateX, stateCy - stateH / 2, stateW, stateH, 5 * s, '#f8f9fa', '#adb5bd', 1);
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('파일 시스템', stateX + stateW / 2, stateCy - 5 * s);
  ctx.fillText('+ git 히스토리', stateX + stateW / 2, stateCy + 9 * s);
  // 화살표: 에이전트 → 상태
  drawHArrow(ctx, cx + boxW / 2, stateCy, stateX, '#adb5bd', s);
  ctx.fillStyle = '#adb5bd';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('상태 저장', (cx + boxW / 2 + stateX) / 2, stateCy - 12 * s);

  // 3. 완료 기준 확인
  drawRoundRect(ctx, cx - boxW / 2, y3, boxW, boxH, 6 * s, '#ebfbee', '#40c057', 1.2);
  ctx.fillStyle = '#2b8a3e';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.fillText('완료 기준 확인', cx, y3 + boxH / 2);

  // 충족 시 완료 (오른쪽으로 탈출)
  const exitEndX = cx + boxW / 2 + stateGap;
  drawHArrow(ctx, cx + boxW / 2, y3 + boxH / 2, exitEndX, '#40c057', s);
  ctx.fillStyle = '#2b8a3e';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.fillText('충족 시 완료', exitEndX + 8 * s, y3 + boxH / 2);
  ctx.textAlign = 'center';

  // ↓ 미충족
  drawVArrow(ctx, cx, y3 + boxH, y4, '#fa5252', s);
  ctx.fillStyle = '#fa5252';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'right';
  ctx.fillText('미충족', cx - 8 * s, (y3 + boxH + y4) / 2);

  // 4. 같은 프롬프트 재주입
  drawRoundRect(ctx, cx - boxW / 2, y4, boxW, boxH, 6 * s, '#fff5f5', '#fa5252', 1.2);
  ctx.fillStyle = '#e03131';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('같은 프롬프트 재주입', cx, y4 + boxH / 2);

  // 루프 화살표: 4번 → 1번 (왼쪽을 돌아서 올라감)
  const loopX = cx - boxW / 2 - 24 * s;
  ctx.strokeStyle = '#fa5252';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - boxW / 2, y4 + boxH / 2);
  ctx.lineTo(loopX, y4 + boxH / 2);
  ctx.lineTo(loopX, y1 + boxH / 2);
  ctx.lineTo(cx - boxW / 2 - 7 * s, y1 + boxH / 2);
  ctx.stroke();
  // 화살표 머리 (오른쪽)
  ctx.fillStyle = '#fa5252';
  ctx.beginPath();
  ctx.moveTo(cx - boxW / 2, y1 + boxH / 2);
  ctx.lineTo(cx - boxW / 2 - 7 * s, y1 + boxH / 2 - 5 * s);
  ctx.lineTo(cx - boxW / 2 - 7 * s, y1 + boxH / 2 + 5 * s);
  ctx.closePath();
  ctx.fill();

  // 루프 라벨
  ctx.fillStyle = '#fa5252';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('반복', loopX - 12 * s, (y1 + y4 + boxH) / 2);

  return y4 + boxH + 20 * s;
}

export const RalphLoopDiagram = ({ caption }: Props) => {
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
