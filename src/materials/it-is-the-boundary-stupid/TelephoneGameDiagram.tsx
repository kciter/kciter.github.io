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

const ROLES = [
  { label: '이해관계자', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
  { label: '기획자', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
  { label: '디자이너', color: '#fab005', bg: '#fff9db', border: '#ffe066' },
  { label: '개발자', color: '#fa5252', bg: '#fff5f5', border: '#ffc9c9' },
];

// Draw progressively distorted shapes to represent message corruption
function drawSignalShape(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, size: number, stage: number,
) {
  ctx.lineWidth = 2;

  if (stage === 0) {
    // Perfect circle — original intent
    ctx.beginPath();
    ctx.arc(cx, cy, size, 0, Math.PI * 2);
    ctx.fillStyle = '#228be620';
    ctx.fill();
    ctx.strokeStyle = '#228be6';
    ctx.stroke();
    // Clean inner dot
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = '#228be6';
    ctx.fill();
  } else if (stage === 1) {
    // Slightly squashed ellipse
    ctx.beginPath();
    ctx.ellipse(cx, cy, size * 1.1, size * 0.85, 0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#40c05720';
    ctx.fill();
    ctx.strokeStyle = '#40c057';
    ctx.stroke();
    // Off-center dot
    ctx.beginPath();
    ctx.arc(cx + size * 0.1, cy - size * 0.05, size * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = '#40c057';
    ctx.fill();
  } else if (stage === 2) {
    // Rounded rectangle — more distorted
    const hw = size * 1.05;
    const hh = size * 0.75;
    ctx.beginPath();
    ctx.roundRect(cx - hw, cy - hh, hw * 2, hh * 2, size * 0.3);
    ctx.fillStyle = '#fab00520';
    ctx.fill();
    ctx.strokeStyle = '#fab005';
    ctx.stroke();
    // Diamond-ish inner dot
    ctx.beginPath();
    const ds = size * 0.25;
    ctx.moveTo(cx + size * 0.15, cy - ds);
    ctx.lineTo(cx + size * 0.15 + ds, cy);
    ctx.lineTo(cx + size * 0.15, cy + ds);
    ctx.lineTo(cx + size * 0.15 - ds, cy);
    ctx.closePath();
    ctx.fillStyle = '#fab005';
    ctx.fill();
  } else {
    // Square — completely different from original circle
    const hs = size * 0.9;
    ctx.beginPath();
    ctx.rect(cx - hs, cy - hs, hs * 2, hs * 2);
    ctx.fillStyle = '#fa525220';
    ctx.fill();
    ctx.strokeStyle = '#fa5252';
    ctx.stroke();
    // Triangle inner
    ctx.beginPath();
    const ts = size * 0.3;
    ctx.moveTo(cx - size * 0.1, cy - ts);
    ctx.lineTo(cx - size * 0.1 + ts, cy + ts * 0.7);
    ctx.lineTo(cx - size * 0.1 - ts, cy + ts * 0.7);
    ctx.closePath();
    ctx.fillStyle = '#fa5252';
    ctx.fill();
  }
}

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 540;

  const titleFs = Math.max(9 * s, 7);
  const labelFs = Math.max(9 * s, 7);
  const smallFs = Math.max(7 * s, 6);
  const tinyFs = Math.max(6.5 * s, 5.5);

  const boxW = 80 * s;
  const boxH = 30 * s;
  const gap = 34 * s;
  const totalW = boxW * 4 + gap * 3;
  const startX = (w - totalW) / 2;
  const topY = 10 * s;
  const shapeSize = 14 * s;
  const shapeY = topY + boxH + 18 * s + shapeSize;

  // Role boxes + shapes
  for (let i = 0; i < ROLES.length; i++) {
    const role = ROLES[i];
    const x = startX + i * (boxW + gap);
    const cx = x + boxW / 2;

    // Role box
    drawRoundRect(ctx, x, topY, boxW, boxH, 6, role.bg, role.border);
    ctx.fillStyle = role.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(role.label, cx, topY + boxH / 2);

    // Signal shape below
    drawSignalShape(ctx, cx, shapeY, shapeSize, i);

    // Arrow between boxes
    if (i < ROLES.length - 1) {
      const arrowStartX = x + boxW + 3 * s;
      const arrowEndX = x + boxW + gap - 3 * s;
      const acy = topY + boxH / 2;

      ctx.strokeStyle = '#868e96';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(arrowStartX, acy);
      ctx.lineTo(arrowEndX - 5, acy);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = '#868e96';
      ctx.moveTo(arrowEndX, acy);
      ctx.lineTo(arrowEndX - 6, acy - 3);
      ctx.lineTo(arrowEndX - 6, acy + 3);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      // Boundary dashed line
      const bndX = x + boxW + gap / 2;
      ctx.strokeStyle = '#fa5252';
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(bndX, topY - 4 * s);
      ctx.lineTo(bndX, shapeY + shapeSize + 8 * s);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // "경계" label
      ctx.fillStyle = '#fa5252';
      ctx.globalAlpha = 0.4;
      ctx.font = `${tinyFs}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('경계', bndX, shapeY + shapeSize + 10 * s);
      ctx.globalAlpha = 1;
    }
  }

  // Labels under first and last shapes
  const firstCx = startX + boxW / 2;
  const lastCx = startX + 3 * (boxW + gap) + boxW / 2;
  const labelY = shapeY + shapeSize + 10 * s;

  ctx.font = `600 ${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#228be6';
  ctx.fillText('원래 의도', firstCx, labelY);
  ctx.fillStyle = '#fa5252';
  ctx.fillText('최종 결과', lastCx, labelY);

  return labelY + 16 * s;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const pad = w * 0.06;
  const boxW = w * 0.45;
  const boxH = 30;
  const gap = 34;
  const shapeSize = 12;

  let y = 6;

  for (let i = 0; i < ROLES.length; i++) {
    const role = ROLES[i];
    const boxX = cx - boxW / 2;

    // Role box
    drawRoundRect(ctx, boxX, y, boxW, boxH, 6, role.bg, role.border);
    ctx.fillStyle = role.color;
    ctx.font = `600 8px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(role.label, cx - shapeSize - 6, y + boxH / 2);

    // Shape to the right of label
    drawSignalShape(ctx, cx + boxW / 2 - shapeSize - 8, y + boxH / 2, shapeSize, i);

    y += boxH;

    // Arrow + boundary between roles
    if (i < ROLES.length - 1) {
      // Boundary line
      const bndY = y + gap / 2;
      ctx.strokeStyle = '#fa5252';
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(pad, bndY);
      ctx.lineTo(w - pad, bndY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // "경계" label
      ctx.fillStyle = '#fa5252';
      ctx.globalAlpha = 0.4;
      ctx.font = `7px ${FONT}`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('경계', w - pad, bndY - 2);
      ctx.globalAlpha = 1;

      // Arrow
      ctx.strokeStyle = '#868e96';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx, y + 4);
      ctx.lineTo(cx, y + gap - 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = '#868e96';
      ctx.moveTo(cx, y + gap - 2);
      ctx.lineTo(cx - 3, y + gap - 7);
      ctx.lineTo(cx + 3, y + gap - 7);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      y += gap;
    }
  }

  // Labels
  y += 8;
  ctx.font = `600 7px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#868e96';
  ctx.fillText('경계를 넘을 때마다 의도가 변형된다', cx, y);

  return y + 16;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const TelephoneGameDiagram = ({ caption }: Props) => {
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
        h = 230;
      } else {
        h = 130 * (w / 540);
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
