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
  ctx.lineTo(x2 - dir * headLen, y - headLen * 0.5);
  ctx.lineTo(x2 - dir * headLen, y + headLen * 0.5);
  ctx.closePath();
  ctx.fill();
}

interface Props {
  caption?: string;
}

function drawScene(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 580;
  const titleFs = Math.max(14 * s, 11);
  const labelFs = Math.max(11 * s, 10);
  const smallFs = Math.max(10 * s, 9);

  // 전체 높이
  const h = 270 * s;
  const cx = w / 2;

  // 하네스 외부 점선 박스
  const pad = 24 * s;
  const harnessX = pad;
  const harnessY = 30 * s;
  const harnessW = w - pad * 2;
  const harnessH = h - 44 * s;

  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8 * s, 5 * s]);
  ctx.beginPath();
  ctx.roundRect(harnessX, harnessY, harnessW, harnessH, 12 * s);
  ctx.stroke();
  ctx.setLineDash([]);

  // 하네스 라벨
  ctx.font = `bold ${titleFs}px ${FONT}`;
  const hlabelText = '하네스 (Harness)';
  const hlabelW = ctx.measureText(hlabelText).width;
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(cx - hlabelW / 2 - 10 * s, harnessY - 10 * s, hlabelW + 20 * s, 20 * s);
  ctx.fillStyle = '#495057';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(hlabelText, cx, harnessY);

  // 세로 3단 구조: 가이드 → 모델 → 센서 (위에서 아래로)
  const innerX = harnessX + 30 * s;
  const innerW = harnessW - 60 * s;

  // === 1행: 가이드 ===
  const guideY = harnessY + 40 * s;
  const guideH = 36 * s;

  // 가이드 라벨
  ctx.fillStyle = '#845ef7';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.fillText('가이드 (행동 전)', innerX, guideY - 10 * s);

  // 가이드 블록들 가로 배치
  const guides = ['CLAUDE.md', '코딩 컨벤션', 'API 문서'];
  const guideBlockW = (innerW - (guides.length - 1) * 10 * s) / guides.length;
  guides.forEach((label, i) => {
    const gx = innerX + i * (guideBlockW + 10 * s);
    drawRoundRect(ctx, gx, guideY, guideBlockW, guideH, 6 * s, '#f3f0ff', '#845ef7', 1.2);
    ctx.fillStyle = '#6741d9';
    ctx.font = `${smallFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(label, gx + guideBlockW / 2, guideY + guideH / 2);
  });

  // === 2행: 모델 ===
  const modelY = guideY + guideH + 22 * s;
  const modelH = 50 * s;
  const modelW = 160 * s;
  const modelX = cx - modelW / 2;

  // 가이드 → 모델 화살표 (아래로)
  ctx.strokeStyle = '#845ef7';
  ctx.lineWidth = 1.5;
  const arrowDownY1 = guideY + guideH;
  const arrowDownY2 = modelY;
  ctx.beginPath();
  ctx.moveTo(cx, arrowDownY1 + 4 * s);
  ctx.lineTo(cx, arrowDownY2 - 7 * s);
  ctx.stroke();
  ctx.fillStyle = '#845ef7';
  ctx.beginPath();
  ctx.moveTo(cx, arrowDownY2);
  ctx.lineTo(cx - 5 * s, arrowDownY2 - 7 * s);
  ctx.lineTo(cx + 5 * s, arrowDownY2 - 7 * s);
  ctx.closePath();
  ctx.fill();

  // 모델 박스
  drawRoundRect(ctx, modelX, modelY, modelW, modelH, 8 * s, '#e7f5ff', '#228be6', 1.5);
  ctx.fillStyle = '#1971c2';
  ctx.font = `bold ${Math.max(13 * s, 11)}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('모델 (행동)', cx, modelY + modelH / 2);

  // === 3행: 센서 ===
  const sensorY = modelY + modelH + 22 * s;
  const sensorH = 36 * s;

  // 모델 → 센서 화살표 (아래로)
  ctx.strokeStyle = '#228be6';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, modelY + modelH + 4 * s);
  ctx.lineTo(cx, sensorY - 7 * s);
  ctx.stroke();
  ctx.fillStyle = '#228be6';
  ctx.beginPath();
  ctx.moveTo(cx, sensorY);
  ctx.lineTo(cx - 5 * s, sensorY - 7 * s);
  ctx.lineTo(cx + 5 * s, sensorY - 7 * s);
  ctx.closePath();
  ctx.fill();

  // 센서 라벨
  ctx.fillStyle = '#40c057';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.fillText('센서 (행동 후 검증)', innerX, sensorY - 10 * s);

  // 센서 블록들 가로 배치
  const sensors = ['린터', '테스트', '타입 체커'];
  const sensorBlockW = (innerW - (sensors.length - 1) * 10 * s) / sensors.length;
  sensors.forEach((label, i) => {
    const sx = innerX + i * (sensorBlockW + 10 * s);
    drawRoundRect(ctx, sx, sensorY, sensorBlockW, sensorH, 6 * s, '#ebfbee', '#40c057', 1.2);
    ctx.fillStyle = '#2b8a3e';
    ctx.font = `${smallFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(label, sx + sensorBlockW / 2, sensorY + sensorH / 2);
  });

  // 피드백 루프: 센서(타입 체커) → 모델 (오른쪽을 돌아서 올라감)
  const lastSensorX = innerX + 2 * (sensorBlockW + 10 * s); // 타입 체커 X
  const lastSensorRight = lastSensorX + sensorBlockW;
  const loopX = harnessX + harnessW - 14 * s;
  const loopTop = modelY + modelH / 2;
  const loopBot = sensorY + sensorH / 2;

  ctx.strokeStyle = '#40c057';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(lastSensorRight, loopBot);
  ctx.lineTo(loopX, loopBot);
  ctx.lineTo(loopX, loopTop);
  ctx.lineTo(modelX + modelW + 7 * s, loopTop);
  ctx.stroke();
  // 화살표 머리 (왼쪽 방향)
  ctx.fillStyle = '#40c057';
  ctx.beginPath();
  ctx.moveTo(modelX + modelW, loopTop);
  ctx.lineTo(modelX + modelW + 7 * s, loopTop - 5 * s);
  ctx.lineTo(modelX + modelW + 7 * s, loopTop + 5 * s);
  ctx.closePath();
  ctx.fill();

  // 피드백 라벨
  ctx.fillStyle = '#40c057';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('피드백 (문제 시 재시도)', loopX - (loopX - modelX - modelW) / 2, loopTop - 10 * s);

  return h;
}

export const HarnessDiagram = ({ caption }: Props) => {
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
