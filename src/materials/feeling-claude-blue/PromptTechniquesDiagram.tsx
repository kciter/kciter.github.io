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

function drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, s: number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 6 * s;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * Math.cos(angle - 0.4), y2 - headLen * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - headLen * Math.cos(angle + 0.4), y2 - headLen * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fill();
}

interface BlockDef {
  label: string;
  fill: string;
  stroke: string;
  textColor: string;
}

function drawColumn(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, colW: number,
  title: string, blocks: BlockDef[], s: number,
  arrows?: { from: number; to: number }[],
) {
  const titleFs = Math.max(13 * s, 11);
  const blockFs = Math.max(10 * s, 9);
  const blockH = 32 * s;
  const gap = 10 * s;
  const blockW = colW - 16 * s;
  const blockX = x + 8 * s;

  // 제목
  ctx.fillStyle = '#495057';
  ctx.font = `bold ${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, x + colW / 2, y + 16 * s);

  // 블록들
  let curY = y + 38 * s;
  const blockPositions: { cx: number; cy: number; bottom: number }[] = [];

  blocks.forEach((block) => {
    drawRoundRect(ctx, blockX, curY, blockW, blockH, 6 * s, block.fill, block.stroke, 1.2);
    ctx.fillStyle = block.textColor;
    ctx.font = `${blockFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(block.label, blockX + blockW / 2, curY + blockH / 2);
    blockPositions.push({ cx: blockX + blockW / 2, cy: curY + blockH / 2, bottom: curY + blockH });
    curY += blockH + gap;
  });

  // 화살표
  if (arrows) {
    arrows.forEach(({ from, to }) => {
      const fromPos = blockPositions[from];
      const toPos = blockPositions[to];
      if (fromPos && toPos) {
        drawArrow(ctx, fromPos.cx, fromPos.bottom + 2 * s, toPos.cx, toPos.cy - blockH / 2 - 2 * s, '#adb5bd', s);
      }
    });
  }

  return curY - gap + 10 * s;
}

interface Props {
  caption?: string;
}

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 640;
  const colW = (w - 40 * s) / 3;
  const gap = 10 * s;
  const startX = 10 * s;
  const startY = 10 * s;

  const zeroBlocks: BlockDef[] = [
    { label: '지시: "이 코드를 리뷰해줘"', fill: '#e7f5ff', stroke: '#228be6', textColor: '#1971c2' },
  ];

  const fewBlocks: BlockDef[] = [
    { label: '지시: "이 코드를 리뷰해줘"', fill: '#e7f5ff', stroke: '#228be6', textColor: '#1971c2' },
    { label: '예시 1: 입력 → 출력', fill: '#fff9db', stroke: '#fab005', textColor: '#e67700' },
    { label: '예시 2: 입력 → 출력', fill: '#fff9db', stroke: '#fab005', textColor: '#e67700' },
    { label: '실제 질문', fill: '#e7f5ff', stroke: '#228be6', textColor: '#1971c2' },
  ];

  const cotBlocks: BlockDef[] = [
    { label: '지시: "이 코드를 리뷰해줘"', fill: '#e7f5ff', stroke: '#228be6', textColor: '#1971c2' },
    { label: '"단계별로 생각해보세요"', fill: '#e7f5ff', stroke: '#228be6', textColor: '#1971c2' },
    { label: '단계 1: 구조 파악', fill: '#ebfbee', stroke: '#40c057', textColor: '#2b8a3e' },
    { label: '단계 2: 문제 분석', fill: '#ebfbee', stroke: '#40c057', textColor: '#2b8a3e' },
    { label: '결론 도출', fill: '#ebfbee', stroke: '#40c057', textColor: '#2b8a3e' },
  ];

  drawColumn(ctx, startX, startY, colW, 'Zero-Shot', zeroBlocks, s);
  drawColumn(ctx, startX + colW + gap, startY, colW, 'Few-Shot', fewBlocks, s);
  const maxY = drawColumn(ctx, startX + (colW + gap) * 2, startY, colW, 'Chain-of-Thought', cotBlocks, s,
    [{ from: 2, to: 3 }, { from: 3, to: 4 }]);

  // 구분선
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.setLineDash([4 * s, 4 * s]);
  const lineX1 = startX + colW + gap / 2;
  const lineX2 = startX + (colW + gap) * 2 - gap / 2;
  ctx.beginPath();
  ctx.moveTo(lineX1, startY + 6 * s);
  ctx.lineTo(lineX1, maxY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(lineX2, startY + 6 * s);
  ctx.lineTo(lineX2, maxY);
  ctx.stroke();
  ctx.setLineDash([]);

  return maxY;
}

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 360;
  const colW = w - 20 * s;
  const startX = 10 * s;
  let curY = 10 * s;
  const sectionGap = 20 * s;

  const zeroBlocks: BlockDef[] = [
    { label: '지시: "이 코드를 리뷰해줘"', fill: '#e7f5ff', stroke: '#228be6', textColor: '#1971c2' },
  ];

  const fewBlocks: BlockDef[] = [
    { label: '지시: "이 코드를 리뷰해줘"', fill: '#e7f5ff', stroke: '#228be6', textColor: '#1971c2' },
    { label: '예시 1: 입력 → 출력', fill: '#fff9db', stroke: '#fab005', textColor: '#e67700' },
    { label: '예시 2: 입력 → 출력', fill: '#fff9db', stroke: '#fab005', textColor: '#e67700' },
    { label: '실제 질문', fill: '#e7f5ff', stroke: '#228be6', textColor: '#1971c2' },
  ];

  const cotBlocks: BlockDef[] = [
    { label: '지시: "이 코드를 리뷰해줘"', fill: '#e7f5ff', stroke: '#228be6', textColor: '#1971c2' },
    { label: '"단계별로 생각해보세요"', fill: '#e7f5ff', stroke: '#228be6', textColor: '#1971c2' },
    { label: '단계 1: 구조 파악', fill: '#ebfbee', stroke: '#40c057', textColor: '#2b8a3e' },
    { label: '단계 2: 문제 분석', fill: '#ebfbee', stroke: '#40c057', textColor: '#2b8a3e' },
    { label: '결론 도출', fill: '#ebfbee', stroke: '#40c057', textColor: '#2b8a3e' },
  ];

  curY = drawColumn(ctx, startX, curY, colW, 'Zero-Shot', zeroBlocks, s);
  curY += sectionGap;

  // 구분선
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.setLineDash([4 * s, 4 * s]);
  ctx.beginPath();
  ctx.moveTo(startX + 20 * s, curY - sectionGap / 2);
  ctx.lineTo(startX + colW - 20 * s, curY - sectionGap / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  curY = drawColumn(ctx, startX, curY, colW, 'Few-Shot', fewBlocks, s);
  curY += sectionGap;

  // 구분선
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.setLineDash([4 * s, 4 * s]);
  ctx.beginPath();
  ctx.moveTo(startX + 20 * s, curY - sectionGap / 2);
  ctx.lineTo(startX + colW - 20 * s, curY - sectionGap / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  curY = drawColumn(ctx, startX, curY, colW, 'Chain-of-Thought', cotBlocks, s,
    [{ from: 2, to: 3 }, { from: 3, to: 4 }]);

  return curY;
}

export const PromptTechniquesDiagram = ({ caption }: Props) => {
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

      // 높이 계산을 위한 임시 그리기
      canvas.width = 1;
      canvas.height = 1;
      const h = isMobile ? drawVertical(ctx, w) : drawHorizontal(ctx, w);

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
