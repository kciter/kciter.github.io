import React, { useRef, useEffect } from 'react';

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

interface Props {
  caption?: string;
}

// 모호한 프롬프트: 확률이 고르게 분산
const VAGUE_TREE = {
  prompt: '"한국에 대해 알려줘"',
  root: '한국',
  branches: [
    { token: '은', prob: 0.22, children: [
      { token: '동아시아', prob: 0.3 },
      { token: '역사적', prob: 0.35 },
      { token: '다양한', prob: 0.35 },
    ]},
    { token: '의', prob: 0.28, children: [
      { token: '문화', prob: 0.3 },
      { token: '역사', prob: 0.25 },
      { token: '경제', prob: 0.25 },
    ]},
    { token: '음식', prob: 0.18, children: [
      { token: '은', prob: 0.4 },
      { token: '으로', prob: 0.3 },
      { token: '중', prob: 0.3 },
    ]},
    { token: '에는', prob: 0.17, children: [
      { token: '다양', prob: 0.35 },
      { token: '많은', prob: 0.35 },
      { token: '여러', prob: 0.3 },
    ]},
  ],
};

// 구체적 프롬프트: 특정 경로에 확률 집중
const SPECIFIC_TREE = {
  prompt: '"한국의 수도는"',
  root: '서울',
  branches: [
    { token: '입니다', prob: 0.55, children: [
      { token: '.', prob: 0.60 },
      { token: '!', prob: 0.05 },
      { token: ' ', prob: 0.35 },
    ]},
    { token: '이며', prob: 0.25, children: [
      { token: '인구', prob: 0.45 },
      { token: '정치', prob: 0.30 },
      { token: '경제', prob: 0.25 },
    ]},
    { token: '로', prob: 0.12, children: [
      { token: '알려', prob: 0.5 },
      { token: '서', prob: 0.3 },
      { token: '도', prob: 0.2 },
    ]},
    { token: '(', prob: 0.08, children: [
      { token: 'Seoul', prob: 0.7 },
      { token: '서울', prob: 0.2 },
      { token: 'S', prob: 0.1 },
    ]},
  ],
};

interface TreeData {
  prompt: string;
  root: string;
  branches: {
    token: string;
    prob: number;
    children: { token: string; prob: number }[];
  }[];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function drawSingleTree(
  ctx: CanvasRenderingContext2D,
  tree: TreeData,
  ox: number, oy: number, // origin offset
  areaW: number,
  s: number,
  color: string,
) {
  const tokenFs = Math.max(11 * s, 9);
  const probFs = Math.max(9 * s, 8);

  const cx = ox + areaW / 2;
  const rootY = oy;
  const branch1Y = rootY + 60 * s;
  const branch2Y = branch1Y + 55 * s;

  // 루트 노드
  const rootR = 18 * s;
  ctx.beginPath();
  ctx.arc(cx, rootY, rootR, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `600 ${tokenFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(tree.root, cx, rootY);

  // 1단계 브랜치
  const branchCount = tree.branches.length;
  const spreadX = Math.min(areaW * 0.42, 160 * s);

  for (let i = 0; i < branchCount; i++) {
    const branch = tree.branches[i];
    const xRatio = (i / (branchCount - 1)) * 2 - 1;
    const bx = cx + xRatio * spreadX;
    const by = branch1Y;

    // 연결선
    const lineWidth = Math.max(branch.prob * 5 * s, 0.8);
    const alpha = Math.max(branch.prob * 1.3, 0.15);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(cx, rootY + rootR);
    ctx.quadraticCurveTo(cx + (bx - cx) * 0.3, rootY + rootR + 16 * s, bx, by - 12 * s);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // 노드
    const nodeR = lerp(8, 18, branch.prob) * s;
    ctx.globalAlpha = Math.max(alpha, 0.3);
    ctx.beginPath();
    ctx.arc(bx, by, nodeR, 0, Math.PI * 2);
    ctx.fillStyle = branch.prob > 0.4 ? color : '#f1f3f5';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 토큰 텍스트
    ctx.fillStyle = branch.prob > 0.4 ? '#fff' : '#495057';
    ctx.font = `${Math.max(tokenFs * Math.max(branch.prob * 1.4, 0.7), 8)}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(branch.token, bx, by);

    // 확률 라벨
    ctx.fillStyle = '#868e96';
    ctx.font = `${probFs}px ${FONT}`;
    ctx.fillText(`${Math.round(branch.prob * 100)}%`, bx, by + nodeR + 9 * s);
    ctx.globalAlpha = 1;

    // 2단계 브랜치
    const childSpread = spreadX * 0.22;
    for (let j = 0; j < branch.children.length; j++) {
      const child = branch.children[j];
      const childProb = child.prob * branch.prob;
      const cxRatio = (j / (branch.children.length - 1)) * 2 - 1;
      const childX = bx + cxRatio * childSpread;
      const childY = branch2Y;

      const childAlpha = Math.max(childProb * 1.5, 0.1);
      const childLineW = Math.max(childProb * 4 * s, 0.5);

      ctx.globalAlpha = childAlpha;
      ctx.strokeStyle = '#adb5bd';
      ctx.lineWidth = childLineW;
      ctx.beginPath();
      ctx.moveTo(bx, by + nodeR);
      ctx.lineTo(childX, childY - 7 * s);
      ctx.stroke();

      const childR = lerp(4, 10, childProb) * s;
      ctx.beginPath();
      ctx.arc(childX, childY, childR, 0, Math.PI * 2);
      ctx.fillStyle = childProb > 0.25 ? '#dee2e6' : '#f8f9fa';
      ctx.fill();
      ctx.strokeStyle = '#adb5bd';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      if (childR > 5 * s) {
        ctx.fillStyle = '#495057';
        ctx.font = `${Math.max(probFs * Math.max(childProb * 2, 0.6), 7)}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(child.token, childX, childY);
      }
      ctx.globalAlpha = 1;
    }
  }
}

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number, s: number): number {
  const titleFs = Math.max(12 * s, 10);
  const h = 230 * s;
  const halfW = w / 2;
  const treeTop = 50 * s;

  // 구분선
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.setLineDash([4 * s, 4 * s]);
  ctx.beginPath();
  ctx.moveTo(halfW, 10 * s);
  ctx.lineTo(halfW, h - 10 * s);
  ctx.stroke();
  ctx.setLineDash([]);

  // 왼쪽 제목
  ctx.fillStyle = '#868e96';
  ctx.font = `${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('"한국에 대해 알려줘"', halfW / 2, 20 * s);

  // 오른쪽 제목
  ctx.fillStyle = '#228be6';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.fillText('"한국의 수도는"', halfW + halfW / 2, 20 * s);

  // 왼쪽 트리
  drawSingleTree(ctx, VAGUE_TREE, 0, treeTop, halfW, s * 0.85, '#868e96');

  // 오른쪽 트리
  drawSingleTree(ctx, SPECIFIC_TREE, halfW, treeTop, halfW, s * 0.85, '#228be6');

  return h;
}

function drawVertical(ctx: CanvasRenderingContext2D, w: number, s: number): number {
  const titleFs = Math.max(11 * s, 10);
  const treeH = 180 * s;
  const gap = 30 * s;
  const h = treeH * 2 + gap + 50 * s;

  // 상단 제목
  ctx.fillStyle = '#868e96';
  ctx.font = `${titleFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('"한국에 대해 알려줘"', w / 2, 16 * s);

  // 상단 트리
  drawSingleTree(ctx, VAGUE_TREE, 0, 40 * s, w, s * 0.9, '#868e96');

  // 구분선
  const divY = treeH + 15 * s;
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 1;
  ctx.setLineDash([4 * s, 4 * s]);
  ctx.beginPath();
  ctx.moveTo(30 * s, divY);
  ctx.lineTo(w - 30 * s, divY);
  ctx.stroke();
  ctx.setLineDash([]);

  // 하단 제목
  ctx.fillStyle = '#228be6';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.fillText('"한국의 수도는"', w / 2, divY + gap / 2);

  // 하단 트리
  drawSingleTree(ctx, SPECIFIC_TREE, 0, divY + gap, w, s * 0.9, '#228be6');

  return h;
}

export const PromptDistributionDiagram = ({ caption }: Props) => {
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
      const s = isMobile ? w / 360 : w / 640;

      const ctx = canvas.getContext('2d')!;

      // 높이 계산
      canvas.width = 1;
      canvas.height = 1;
      const h = isMobile ? drawVertical(ctx, w, s) : drawHorizontal(ctx, w, s);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      if (isMobile) {
        drawVertical(ctx, w, s);
      } else {
        drawHorizontal(ctx, w, s);
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
