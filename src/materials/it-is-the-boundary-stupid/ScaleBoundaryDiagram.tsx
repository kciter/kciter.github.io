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

// Threshold points where qualitative change happens
const THRESHOLDS = [
  { x: 0.18, y: 0.12, label: '메모리 → 디스크', color: '#228be6' },
  { x: 0.42, y: 0.32, label: '단일 → 분산', color: '#40c057' },
  { x: 0.65, y: 0.58, label: '동기 → 비동기', color: '#fab005' },
  { x: 0.85, y: 0.88, label: '단일 DC → 멀티 리전', color: '#fa5252' },
];

// Step curve points (normalized 0–1)
function getStepCurve(): Array<{ x: number; y: number }> {
  const pts: Array<{ x: number; y: number }> = [];
  pts.push({ x: 0, y: 0.04 });

  for (let i = 0; i < THRESHOLDS.length; i++) {
    const t = THRESHOLDS[i];
    const prevY = i === 0 ? 0.04 : THRESHOLDS[i - 1].y + 0.02;
    // Gentle slope leading to threshold
    pts.push({ x: t.x - 0.02, y: prevY + (t.y - prevY) * 0.3 });
    // Sharp jump
    pts.push({ x: t.x, y: prevY + (t.y - prevY) * 0.35 });
    pts.push({ x: t.x + 0.02, y: t.y });
    // Plateau after jump
    if (i < THRESHOLDS.length - 1) {
      pts.push({ x: THRESHOLDS[i + 1].x - 0.04, y: t.y + 0.02 });
    }
  }

  pts.push({ x: 0.95, y: 0.92 });
  pts.push({ x: 1, y: 0.96 });
  return pts;
}

// Linear reference line points
function getLinearLine(): Array<{ x: number; y: number }> {
  return [{ x: 0, y: 0.04 }, { x: 1, y: 0.5 }];
}

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 540;

  const pad = 50 * s;
  const rightPad = 20 * s;
  const topPad = 20 * s;
  const bottomPad = 40 * s;
  const graphW = w - pad - rightPad;
  const graphH = 200 * s;
  const originX = pad;
  const originY = topPad + graphH;

  const titleFs = Math.max(9 * s, 7);
  const labelFs = Math.max(8 * s, 7);
  const axisFs = Math.max(9 * s, 7);

  // Helper: normalized → canvas coords
  const toX = (nx: number) => originX + nx * graphW;
  const toY = (ny: number) => originY - ny * graphH;

  // Y axis
  ctx.strokeStyle = '#495057';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(originX, originY + 4);
  ctx.lineTo(originX, topPad - 6);
  ctx.stroke();
  // Y arrowhead
  ctx.beginPath();
  ctx.fillStyle = '#495057';
  ctx.moveTo(originX, topPad - 10);
  ctx.lineTo(originX - 3.5, topPad - 3);
  ctx.lineTo(originX + 3.5, topPad - 3);
  ctx.closePath();
  ctx.fill();

  // X axis
  ctx.beginPath();
  ctx.moveTo(originX - 4, originY);
  ctx.lineTo(originX + graphW + 6, originY);
  ctx.stroke();
  // X arrowhead
  ctx.beginPath();
  ctx.fillStyle = '#495057';
  ctx.moveTo(originX + graphW + 10, originY);
  ctx.lineTo(originX + graphW + 3, originY - 3.5);
  ctx.lineTo(originX + graphW + 3, originY + 3.5);
  ctx.closePath();
  ctx.fill();

  // Axis labels
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${axisFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('데이터 / 트래픽 규모', originX + graphW / 2, originY + 12 * s);

  ctx.save();
  ctx.translate(originX - 14 * s, topPad + graphH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('복잡도 / 비용', 0, 0);
  ctx.restore();

  // Linear reference line (dashed, faint)
  const linear = getLinearLine();
  ctx.strokeStyle = '#adb5bd';
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(toX(linear[0].x), toY(linear[0].y));
  ctx.lineTo(toX(linear[1].x), toY(linear[1].y));
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // Threshold vertical dashed lines
  for (const t of THRESHOLDS) {
    ctx.strokeStyle = t.color;
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(toX(t.x), originY);
    ctx.lineTo(toX(t.x), toY(t.y) + 4);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  // Step curve (main line)
  const curve = getStepCurve();
  ctx.strokeStyle = '#fa5252';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(toX(curve[0].x), toY(curve[0].y));
  for (let i = 1; i < curve.length; i++) {
    ctx.lineTo(toX(curve[i].x), toY(curve[i].y));
  }
  ctx.stroke();

  // Legend (top-left corner of graph)
  const lgX = originX + 10 * s;
  const lgY = topPad + 6 * s;
  const lgLineW = 20 * s;
  const lgGap = 14 * s;

  // 실제 증가 (solid red)
  ctx.strokeStyle = '#fa5252';
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(lgX, lgY);
  ctx.lineTo(lgX + lgLineW, lgY);
  ctx.stroke();
  ctx.fillStyle = '#fa5252';
  ctx.font = `600 ${labelFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('실제 증가', lgX + lgLineW + 4 * s, lgY);

  // 선형 증가 (dashed gray)
  const lgY2 = lgY + lgGap;
  ctx.strokeStyle = '#adb5bd';
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(lgX, lgY2);
  ctx.lineTo(lgX + lgLineW, lgY2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#adb5bd';
  ctx.font = `${labelFs}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('선형 증가 (기대)', lgX + lgLineW + 4 * s, lgY2);

  // Threshold labels with badges
  for (const t of THRESHOLDS) {
    const tx = toX(t.x);
    const ty = toY(t.y);

    // Dot at threshold
    ctx.beginPath();
    ctx.arc(tx, ty, 3.5 * s, 0, Math.PI * 2);
    ctx.fillStyle = t.color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label badge
    ctx.font = `600 ${labelFs}px ${FONT}`;
    const tw = ctx.measureText(t.label).width;
    const bw = tw + 8 * s;
    const bh = 14 * s;
    const bx = tx - bw / 2;
    const by = ty - bh - 6 * s;

    // Badge background
    ctx.globalAlpha = 0.9;
    drawRoundRect(ctx, bx, by, bw, bh, 3, '#fff', t.color + '40');
    ctx.globalAlpha = 1;

    ctx.fillStyle = t.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.label, tx, by + bh / 2);
  }

  return topPad + graphH + bottomPad;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const pad = 40;
  const rightPad = 14;
  const topPad = 16;
  const bottomPad = 34;
  const graphW = w - pad - rightPad;
  const graphH = 160;
  const originX = pad;
  const originY = topPad + graphH;

  const toX = (nx: number) => originX + nx * graphW;
  const toY = (ny: number) => originY - ny * graphH;

  // Y axis
  ctx.strokeStyle = '#495057';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(originX, originY + 4);
  ctx.lineTo(originX, topPad - 4);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#495057';
  ctx.moveTo(originX, topPad - 8);
  ctx.lineTo(originX - 3, topPad - 2);
  ctx.lineTo(originX + 3, topPad - 2);
  ctx.closePath();
  ctx.fill();

  // X axis
  ctx.beginPath();
  ctx.moveTo(originX - 4, originY);
  ctx.lineTo(originX + graphW + 4, originY);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#495057';
  ctx.moveTo(originX + graphW + 8, originY);
  ctx.lineTo(originX + graphW + 2, originY - 3);
  ctx.lineTo(originX + graphW + 2, originY + 3);
  ctx.closePath();
  ctx.fill();

  // Axis labels
  ctx.fillStyle = '#495057';
  ctx.font = `600 8px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('규모', originX + graphW / 2, originY + 8);

  ctx.save();
  ctx.translate(originX - 12, topPad + graphH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('복잡도 / 비용', 0, 0);
  ctx.restore();

  // Linear reference line
  const linear = getLinearLine();
  ctx.strokeStyle = '#adb5bd';
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(toX(linear[0].x), toY(linear[0].y));
  ctx.lineTo(toX(linear[1].x), toY(linear[1].y));
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // Threshold vertical lines
  for (const t of THRESHOLDS) {
    ctx.strokeStyle = t.color;
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(toX(t.x), originY);
    ctx.lineTo(toX(t.x), toY(t.y) + 4);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  // Step curve
  const curve = getStepCurve();
  ctx.strokeStyle = '#fa5252';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(toX(curve[0].x), toY(curve[0].y));
  for (let i = 1; i < curve.length; i++) {
    ctx.lineTo(toX(curve[i].x), toY(curve[i].y));
  }
  ctx.stroke();

  // Threshold dots + labels
  for (let i = 0; i < THRESHOLDS.length; i++) {
    const t = THRESHOLDS[i];
    const tx = toX(t.x);
    const ty = toY(t.y);

    ctx.beginPath();
    ctx.arc(tx, ty, 3, 0, Math.PI * 2);
    ctx.fillStyle = t.color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label (alternating above/below to avoid overlap)
    ctx.fillStyle = t.color;
    ctx.font = `600 7px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = i % 2 === 0 ? 'bottom' : 'top';
    const ly = i % 2 === 0 ? ty - 8 : ty + 8;
    ctx.fillText(t.label, tx, ly);
  }

  return topPad + graphH + bottomPad;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const ScaleBoundaryDiagram = ({ caption }: Props) => {
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
        h = 210;
      } else {
        h = 260 * (w / 540);
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
