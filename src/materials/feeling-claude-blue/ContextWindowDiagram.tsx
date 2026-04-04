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

interface Props {
  caption?: string;
}

function drawScene(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 540;
  const titleFs = Math.max(13 * s, 11);
  const labelFs = Math.max(11 * s, 10);
  const smallFs = Math.max(9 * s, 8);

  // 컨테이너 크기
  const containerW = Math.min(280 * s, w * 0.55);
  const containerH = 320 * s;
  const containerX = w / 2 - containerW / 2 + 40 * s;
  const containerY = 20 * s;
  const pad = 8 * s;
  const gap = 6 * s;

  // 외부 컨테이너 (컨텍스트 윈도우)
  drawRoundRect(ctx, containerX, containerY, containerW, containerH, 8 * s, '#f8f9fa', '#adb5bd', 1.5);

  // 왼쪽 라벨 + 세로 화살표
  const arrowX = containerX - 30 * s;
  const arrowTop = containerY + 6 * s;
  const arrowBot = containerY + containerH - 6 * s;

  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.2;
  // 위 화살표
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowTop + 8 * s);
  ctx.lineTo(arrowX, arrowBot - 8 * s);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowTop);
  ctx.lineTo(arrowX - 4 * s, arrowTop + 8 * s);
  ctx.lineTo(arrowX + 4 * s, arrowTop + 8 * s);
  ctx.closePath();
  ctx.fillStyle = '#adb5bd';
  ctx.fill();
  // 아래 화살표
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowBot);
  ctx.lineTo(arrowX - 4 * s, arrowBot - 8 * s);
  ctx.lineTo(arrowX + 4 * s, arrowBot - 8 * s);
  ctx.closePath();
  ctx.fill();

  // 라벨
  ctx.save();
  ctx.translate(arrowX - 14 * s, containerY + containerH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#868e96';
  ctx.font = `${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('컨텍스트 윈도우', 0, 0);
  ctx.restore();

  // 블록들
  const blockX = containerX + pad;
  const blockW = containerW - pad * 2;
  let curY = containerY + pad;

  // 시스템 프롬프트
  const sysH = 50 * s;
  drawRoundRect(ctx, blockX, curY, blockW, sysH, 6 * s, '#e7f5ff', '#228be6', 1.2);
  ctx.fillStyle = '#1971c2';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('시스템 프롬프트', blockX + blockW / 2, curY + sysH / 2 - 8 * s);
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.fillText('"코드 리뷰 전문가로서..."', blockX + blockW / 2, curY + sysH / 2 + 8 * s);
  curY += sysH + gap;

  // 도구 정의
  const toolH = 36 * s;
  drawRoundRect(ctx, blockX, curY, blockW, toolH, 6 * s, '#ebfbee', '#40c057', 1.2);
  ctx.fillStyle = '#2b8a3e';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('도구 정의', blockX + blockW / 2, curY + toolH / 2);
  curY += toolH + gap;

  // 이전 대화 기록 (여러 줄)
  const convH = 100 * s;
  drawRoundRect(ctx, blockX, curY, blockW, convH, 6 * s, '#fff9db', '#fab005', 1.2);
  ctx.fillStyle = '#e67700';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('이전 대화 기록', blockX + blockW / 2, curY + 18 * s);
  // 대화 줄들
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.fillText('사용자: "이 함수를 설명해줘"', blockX + blockW / 2, curY + 40 * s);
  ctx.fillText('모델: "이 함수는..."', blockX + blockW / 2, curY + 56 * s);
  ctx.fillText('사용자: "그러면 버그는?"', blockX + blockW / 2, curY + 72 * s);
  ctx.fillText('모델: "여기서 발생할 수..."', blockX + blockW / 2, curY + 88 * s);
  curY += convH + gap;

  // 사용자 질문
  const userH = 36 * s;
  drawRoundRect(ctx, blockX, curY, blockW, userH, 6 * s, '#e7f5ff', '#228be6', 1.2);
  ctx.fillStyle = '#1971c2';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('현재 사용자 질문', blockX + blockW / 2, curY + userH / 2);
  curY += userH + gap;

  // 남은 공간
  const remainH = containerY + containerH - pad - curY;
  if (remainH > 10 * s) {
    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 1;
    ctx.setLineDash([4 * s, 4 * s]);
    ctx.beginPath();
    ctx.roundRect(blockX, curY, blockW, remainH, 6 * s);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#adb5bd';
    ctx.font = `${smallFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('여유 공간', blockX + blockW / 2, curY + remainH / 2);
  }

  return containerY + containerH + 20 * s;
}

export const ContextWindowDiagram = ({ caption }: Props) => {
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
