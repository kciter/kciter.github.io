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

function drawArrowhead(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-size, -size * 0.5);
  ctx.lineTo(-size, size * 0.5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawCylinder(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, w: number, h: number,
  fill: string, stroke: string, lineWidth = 1.5,
) {
  const ellipseH = h * 0.22;
  const bodyTop = cy - h / 2 + ellipseH / 2;
  const bodyBottom = cy + h / 2 - ellipseH / 2;

  // Body
  ctx.beginPath();
  ctx.moveTo(cx - w / 2, bodyTop);
  ctx.lineTo(cx - w / 2, bodyBottom);
  ctx.ellipse(cx, bodyBottom, w / 2, ellipseH / 2, 0, Math.PI, 0, true);
  ctx.lineTo(cx + w / 2, bodyTop);
  ctx.ellipse(cx, bodyTop, w / 2, ellipseH / 2, 0, 0, Math.PI, true);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  // Top ellipse
  ctx.beginPath();
  ctx.ellipse(cx, bodyTop, w / 2, ellipseH / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

interface Props {
  caption?: string;
}

export const HiddenBoundaryDiagram = ({ caption }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let raf: number;

    const animate = (time: number) => {
      const w = container.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      const s = w / 560;
      const isMobile = w < 480;

      const h = isMobile ? 280 * s : 200 * s;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // Pulsing alpha for hidden boundary
      const pulse = 0.3 + Math.abs(Math.sin(time * 0.002)) * 0.5;

      const titleFs = Math.max(12 * s, 10);
      const labelFs = Math.max(11 * s, 9);
      const smallFs = Math.max(9.5 * s, 8);

      if (isMobile) {
        // Vertical layout
        const cx = w / 2;
        const boxW = w * 0.5;
        const boxH = 44 * s;
        const dbW = 60 * s;
        const dbH = 40 * s;
        const boxGap = 30 * s;
        const dbGapM = 60 * s;

        // Total content height
        const contentH = boxH + boxGap + boxH + dbGapM + dbH;
        const saY = (h - contentH) / 2;
        drawRoundRect(ctx, cx - boxW / 2, saY, boxW, boxH, 8, '#e7f5ff', '#228be6');
        ctx.fillStyle = '#228be6';
        ctx.font = `600 ${labelFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('서비스 A', cx, saY + boxH / 2);

        // Service B
        const sbY = saY + boxH + boxGap;
        drawRoundRect(ctx, cx - boxW / 2, sbY, boxW, boxH, 8, '#fff9db', '#fab005');
        ctx.fillStyle = '#fab005';
        ctx.font = `600 ${labelFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('서비스 B', cx, sbY + boxH / 2);

        // "코드상 연결 없음" label
        ctx.fillStyle = '#adb5bd';
        ctx.font = `${smallFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.fillText('코드상 연결 없음', cx, saY + boxH + 16 * s);

        // DB
        const dbY = sbY + boxH + dbGapM;
        drawCylinder(ctx, cx, dbY, dbW, dbH, '#f8f9fa', '#adb5bd');
        ctx.fillStyle = '#495057';
        ctx.font = `${smallFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('users 테이블', cx, dbY + 2);

        // Hidden dependency lines (dashed, pulsing)
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#fa5252';
        ctx.lineWidth = 1.5 * s;
        ctx.globalAlpha = pulse;

        // A -> DB
        ctx.beginPath();
        ctx.moveTo(cx - boxW * 0.3, saY + boxH);
        ctx.lineTo(cx - dbW * 0.3, dbY - dbH / 2);
        ctx.stroke();
        ctx.fillStyle = '#fa5252';
        drawArrowhead(ctx, cx - dbW * 0.3, dbY - dbH / 2, Math.PI / 2 + 0.2, 6 * s);

        // B -> DB
        ctx.beginPath();
        ctx.moveTo(cx + boxW * 0.3, sbY + boxH);
        ctx.lineTo(cx + dbW * 0.3, dbY - dbH / 2);
        ctx.stroke();
        ctx.fillStyle = '#fa5252';
        drawArrowhead(ctx, cx + dbW * 0.3, dbY - dbH / 2, Math.PI / 2 - 0.2, 6 * s);

        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
        ctx.restore();

        // Hidden boundary label
        ctx.fillStyle = '#fa5252';
        ctx.globalAlpha = pulse;
        ctx.font = `600 ${smallFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.fillText('숨겨진 의존성', cx, dbY - dbH / 2 - 10 * s);
        ctx.globalAlpha = 1;

      } else {
        // Horizontal layout
        const boxW = 120 * s;
        const boxH = 50 * s;
        const dbW = 70 * s;
        const dbH = 46 * s;
        const gap = 180 * s;
        const dbGap = 40 * s; // gap between boxes and db

        // Total content height: boxH + dbGap + "숨겨진 의존성" label + dbH
        const contentH = boxH + dbGap + dbH;
        const topY = (h - contentH) / 2;

        const cy = topY;
        const saX = w / 2 - gap / 2 - boxW / 2;
        const sbX = w / 2 + gap / 2 - boxW / 2;
        const dbCx = w / 2;
        const dbCy = cy + boxH + dbGap + dbH / 2;

        // Service A
        drawRoundRect(ctx, saX, cy, boxW, boxH, 10, '#e7f5ff', '#228be6');
        ctx.fillStyle = '#228be6';
        ctx.font = `600 ${labelFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('서비스 A', saX + boxW / 2, cy + boxH / 2);

        // Service B
        drawRoundRect(ctx, sbX, cy, boxW, boxH, 10, '#fff9db', '#fab005');
        ctx.fillStyle = '#fab005';
        ctx.font = `600 ${labelFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('서비스 B', sbX + boxW / 2, cy + boxH / 2);

        // "코드상 연결 없음" between services
        ctx.fillStyle = '#adb5bd';
        ctx.font = `${smallFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Dotted line between services (no connection)
        ctx.save();
        ctx.setLineDash([3, 5]);
        ctx.strokeStyle = '#dee2e6';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(saX + boxW + 8 * s, cy + boxH / 2);
        ctx.lineTo(sbX - 8 * s, cy + boxH / 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        ctx.fillText('직접 연결 없음', w / 2, cy + boxH / 2 - 12 * s);

        // DB cylinder
        drawCylinder(ctx, dbCx, dbCy, dbW, dbH, '#f8f9fa', '#adb5bd');
        ctx.fillStyle = '#495057';
        ctx.font = `${smallFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('users 테이블', dbCx, dbCy + 2);

        // Hidden dependency lines (dashed, pulsing red)
        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = '#fa5252';
        ctx.lineWidth = 1.5 * s;
        ctx.globalAlpha = pulse;

        // A -> DB
        const aBottom = cy + boxH;
        const aCx = saX + boxW / 2;
        ctx.beginPath();
        ctx.moveTo(aCx, aBottom);
        ctx.lineTo(dbCx - dbW * 0.3, dbCy - dbH / 2);
        ctx.stroke();
        ctx.fillStyle = '#fa5252';
        const angleA = Math.atan2(dbCy - dbH / 2 - aBottom, dbCx - dbW * 0.3 - aCx);
        drawArrowhead(ctx, dbCx - dbW * 0.3, dbCy - dbH / 2, angleA, 6 * s);

        // B -> DB
        const bCx = sbX + boxW / 2;
        ctx.strokeStyle = '#fa5252';
        ctx.beginPath();
        ctx.moveTo(bCx, aBottom);
        ctx.lineTo(dbCx + dbW * 0.3, dbCy - dbH / 2);
        ctx.stroke();
        ctx.fillStyle = '#fa5252';
        const angleB = Math.atan2(dbCy - dbH / 2 - aBottom, dbCx + dbW * 0.3 - bCx);
        drawArrowhead(ctx, dbCx + dbW * 0.3, dbCy - dbH / 2, angleB, 6 * s);

        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
        ctx.restore();

        // Hidden boundary label
        ctx.fillStyle = '#fa5252';
        ctx.globalAlpha = pulse;
        ctx.font = `600 ${titleFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.fillText('숨겨진 의존성', dbCx, cy + boxH + 14 * s);
        ctx.globalAlpha = 1;
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
