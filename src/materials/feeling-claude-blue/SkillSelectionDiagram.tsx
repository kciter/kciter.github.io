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

function drawArrowRight(ctx: CanvasRenderingContext2D, x1: number, y: number, x2: number, color: string, s: number) {
  const headLen = 7 * s;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2 - headLen, y);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y);
  ctx.lineTo(x2 - headLen, y - headLen * 0.5);
  ctx.lineTo(x2 - headLen, y + headLen * 0.5);
  ctx.closePath();
  ctx.fill();
}

function drawArrowLeft(ctx: CanvasRenderingContext2D, x1: number, y: number, x2: number, color: string, s: number) {
  const headLen = 7 * s;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2 + headLen, y);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y);
  ctx.lineTo(x2 + headLen, y - headLen * 0.5);
  ctx.lineTo(x2 + headLen, y + headLen * 0.5);
  ctx.closePath();
  ctx.fill();
}

interface Props {
  caption?: string;
}

interface SkillItem {
  label: string;
  selected: boolean;
}

function drawScene(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 540;
  const titleFs = Math.max(12 * s, 10);
  const labelFs = Math.max(11 * s, 10);
  const smallFs = Math.max(9 * s, 8);

  const h = 260 * s;

  // 중앙 컨텍스트 윈도우
  const ctxW = 160 * s;
  const ctxH = 200 * s;
  const ctxX = w / 2 - ctxW / 2;
  const ctxY = 30 * s;
  const pad = 6 * s;
  const gap = 5 * s;

  drawRoundRect(ctx, ctxX, ctxY, ctxW, ctxH, 8 * s, '#f8f9fa', '#adb5bd', 1.5);

  // 컨텍스트 윈도우 라벨
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('컨텍스트 윈도우', ctxX + ctxW / 2, ctxY + ctxH + 14 * s);

  // 내부 블록들
  const blockW = ctxW - pad * 2;
  const blockX = ctxX + pad;
  let curY = ctxY + pad;

  // 스킬 슬롯 (선택된 스킬이 들어간 자리)
  const slotH = 40 * s;
  drawRoundRect(ctx, blockX, curY, blockW, slotH, 5 * s, '#e7f5ff', '#228be6', 1.5);
  ctx.fillStyle = '#1971c2';
  ctx.font = `bold ${labelFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('코드 리뷰', blockX + blockW / 2, curY + slotH / 2 - 6 * s);
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.fillText('(선택된 스킬)', blockX + blockW / 2, curY + slotH / 2 + 8 * s);
  curY += slotH + gap;

  // 도구 정의
  const toolH = 28 * s;
  drawRoundRect(ctx, blockX, curY, blockW, toolH, 5 * s, '#ebfbee', '#40c057', 1);
  ctx.fillStyle = '#2b8a3e';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('도구 정의', blockX + blockW / 2, curY + toolH / 2);
  curY += toolH + gap;

  // 대화 기록
  const convH = 50 * s;
  drawRoundRect(ctx, blockX, curY, blockW, convH, 5 * s, '#fff9db', '#fab005', 1);
  ctx.fillStyle = '#e67700';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.fillText('대화 기록', blockX + blockW / 2, curY + convH / 2);
  curY += convH + gap;

  // 사용자 질문
  const userH = 28 * s;
  drawRoundRect(ctx, blockX, curY, blockW, userH, 5 * s, '#e7f5ff', '#228be6', 1);
  ctx.fillStyle = '#1971c2';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.fillText('사용자 질문', blockX + blockW / 2, curY + userH / 2);
  curY += userH + gap;

  // 남은 공간
  const remainH = ctxY + ctxH - pad - curY;
  if (remainH > 4 * s) {
    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 1;
    ctx.setLineDash([3 * s, 3 * s]);
    ctx.beginPath();
    ctx.roundRect(blockX, curY, blockW, remainH, 5 * s);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 왼쪽 스킬 후보들
  const leftSkills: SkillItem[] = [
    { label: '코드 리뷰', selected: true },
    { label: '테스트 작성', selected: false },
  ];

  const rightSkills: SkillItem[] = [
    { label: '버그 수정', selected: false },
    { label: '문서 작성', selected: false },
  ];

  const skillW = 90 * s;
  const skillH = 32 * s;
  const skillGap = 14 * s;
  const skillStartY = ctxY + 30 * s;

  // 왼쪽
  const leftX = ctxX - skillW - 40 * s;
  leftSkills.forEach((skill, i) => {
    const sy = skillStartY + i * (skillH + skillGap);
    if (skill.selected) {
      drawRoundRect(ctx, leftX, sy, skillW, skillH, 6 * s, '#e7f5ff', '#228be6', 1.5);
      ctx.fillStyle = '#1971c2';
      ctx.font = `bold ${labelFs}px ${FONT}`;
      // 화살표
      drawArrowRight(ctx, leftX + skillW, sy + skillH / 2, ctxX, '#228be6', s);
    } else {
      ctx.globalAlpha = 0.4;
      drawRoundRect(ctx, leftX, sy, skillW, skillH, 6 * s, '#f8f9fa', '#dee2e6', 1);
      ctx.fillStyle = '#868e96';
      ctx.font = `${labelFs}px ${FONT}`;
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(skill.label, leftX + skillW / 2, sy + skillH / 2);
    ctx.globalAlpha = 1;
  });

  // 오른쪽
  const rightX = ctxX + ctxW + 40 * s;
  rightSkills.forEach((skill, i) => {
    const sy = skillStartY + i * (skillH + skillGap);
    ctx.globalAlpha = 0.4;
    drawRoundRect(ctx, rightX, sy, skillW, skillH, 6 * s, '#f8f9fa', '#dee2e6', 1);
    ctx.fillStyle = '#868e96';
    ctx.font = `${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(skill.label, rightX + skillW / 2, sy + skillH / 2);
    ctx.globalAlpha = 1;
  });

  return h;
}

export const SkillSelectionDiagram = ({ caption }: Props) => {
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
