import React, { useRef, useEffect } from 'react';

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';
const MONO = 'Menlo, Monaco, "Courier New", monospace';

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

function drawDBCylinder(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, w: number, h: number,
) {
  const ry = Math.min(w * 0.15, 8);

  // Bottom half-ellipse fill
  ctx.beginPath();
  ctx.ellipse(cx, cy + h / 2 - ry, w / 2, ry, 0, 0, Math.PI);
  ctx.closePath();
  ctx.fillStyle = '#f1f3f5';
  ctx.fill();

  // Body fill
  ctx.fillStyle = '#f1f3f5';
  ctx.fillRect(cx - w / 2, cy - h / 2 + ry, w, h - 2 * ry);

  // Bottom arc stroke
  ctx.beginPath();
  ctx.ellipse(cx, cy + h / 2 - ry, w / 2, ry, 0, 0, Math.PI);
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Side lines
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - w / 2, cy - h / 2 + ry);
  ctx.lineTo(cx - w / 2, cy + h / 2 - ry);
  ctx.moveTo(cx + w / 2, cy - h / 2 + ry);
  ctx.lineTo(cx + w / 2, cy + h / 2 - ry);
  ctx.stroke();

  // Top ellipse
  ctx.beginPath();
  ctx.ellipse(cx, cy - h / 2 + ry, w / 2, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#e9ecef';
  ctx.fill();
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1;
  ctx.stroke();
}

type Row = {
  side: 'left' | 'right';
  label: string;
  action: string;
  color: string;
  bg: string;
  border: string;
  sub?: string;
  stale?: boolean;
};

const ROWS: Row[] = [
  { side: 'left', label: 'getUser()', action: 'read', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
  { side: 'right', label: 'updateUser()', action: 'write', color: '#fa5252', bg: '#fff5f5', border: '#ffc9c9', sub: 'user DB 수정' },
  { side: 'left', label: 'getOrders()', action: 'read', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
  { side: 'right', label: 'addOrder()', action: 'write', color: '#fa5252', bg: '#fff5f5', border: '#ffc9c9', sub: 'orders DB 추가' },
  { side: 'left', label: 'createSummary()', action: 'read', color: '#845ef7', bg: '#f3f0ff', border: '#b197fc', stale: true },
];

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 540;

  const pad = 16 * s;
  const boxW = 150 * s;
  const boxH = 28 * s;
  const dbZoneW = 50 * s;
  const dbIconW = 30 * s;
  const dbIconH = 22 * s;
  const rowPad = 5 * s;
  const bndGap = 16 * s;
  const startY = 28 * s;
  const cx = w / 2;

  const titleFs = Math.max(12 * s, 10);
  const labelFs = Math.max(9 * s, 8);
  const subFs = Math.max(8 * s, 7);
  const actionFs = Math.max(7 * s, 6);

  // Pre-calculate row positions
  const rowYs: number[] = [];
  const bndYs: number[] = [];
  let y = startY;
  for (let i = 0; i < ROWS.length; i++) {
    rowYs.push(y);
    y += boxH + rowPad * 2;
    if (i < ROWS.length - 1) {
      bndYs.push(y + bndGap / 2);
      y += bndGap;
    }
  }
  const totalH = y;

  // DB zone spans entire content area
  const zoneTop = rowYs[0];
  const zoneBottom = rowYs[ROWS.length - 1] + boxH + rowPad * 2;

  // Column headers
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#228be6';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.fillText('요청 A', pad + boxW / 2, 12 * s);
  ctx.fillStyle = '#fa5252';
  ctx.font = `600 ${titleFs}px ${FONT}`;
  ctx.fillText('요청 B', w - pad - boxW / 2, 12 * s);

  // Background bands for B rows
  for (let i = 0; i < ROWS.length; i++) {
    if (ROWS[i].side === 'right') {
      ctx.fillStyle = 'rgba(250, 82, 82, 0.05)';
      ctx.fillRect(0, rowYs[i], w, boxH + rowPad * 2);
    }
  }

  // Boundary lines (full width — DB zone drawn on top)
  for (let i = 0; i < bndYs.length; i++) {
    const by = bndYs[i];
    ctx.strokeStyle = '#fa5252';
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(pad, by);
    ctx.lineTo(w - pad, by);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#fa5252';
    ctx.globalAlpha = 0.5;
    ctx.font = `${subFs}px ${FONT}`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('경계', w - pad, by - 2);
    ctx.globalAlpha = 1;
  }

  // DB zone background box (tall rounded rect behind cylinder)
  drawRoundRect(
    ctx, cx - dbZoneW / 2, zoneTop, dbZoneW, zoneBottom - zoneTop,
    8, '#f8f9fa', '#e9ecef', 1,
  );

  // DB cylinder icon (vertically centered in zone)
  const dbIconCy = (zoneTop + zoneBottom) / 2;
  drawDBCylinder(ctx, cx, dbIconCy, dbIconW, dbIconH);

  // "DB" label below cylinder
  ctx.fillStyle = '#868e96';
  ctx.font = `600 ${Math.max(8 * s, 7)}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('DB', cx, dbIconCy + dbIconH / 2 + 2 * s);

  // Boxes and arrows
  for (let i = 0; i < ROWS.length; i++) {
    const row = ROWS[i];
    const boxY = rowYs[i] + rowPad;
    const boxCy = boxY + boxH / 2;

    if (row.side === 'left') {
      // A box
      drawRoundRect(ctx, pad, boxY, boxW, boxH, 6, row.bg, row.border);
      ctx.fillStyle = row.color;
      ctx.font = `600 ${labelFs}px ${MONO}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(row.label, pad + boxW / 2, boxCy);

      // Arrow → DB zone
      const ax1 = pad + boxW + 4 * s;
      const ax2 = cx - dbZoneW / 2 - 2 * s;
      ctx.strokeStyle = row.color;
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ax1, boxCy);
      ctx.lineTo(ax2 - 4, boxCy);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = row.color;
      ctx.moveTo(ax2, boxCy);
      ctx.lineTo(ax2 - 6, boxCy - 3);
      ctx.lineTo(ax2 - 6, boxCy + 3);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      // "read" label
      ctx.fillStyle = '#868e96';
      ctx.font = `${actionFs}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('read', (ax1 + ax2) / 2, boxCy - 3);

      // stale data badge
      if (row.stale) {
        const badgeText = 'stale data!';
        ctx.font = `600 ${subFs}px ${FONT}`;
        const tw = ctx.measureText(badgeText).width;
        const bw = tw + 10 * s;
        const bh = 14 * s;
        const bbx = cx + dbZoneW / 2 + 6 * s;
        const bby = boxCy - bh / 2;
        drawRoundRect(ctx, bbx, bby, bw, bh, 3, '#fff5f5', '#ffc9c9');
        ctx.fillStyle = '#fa5252';
        ctx.font = `600 ${subFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, bbx + bw / 2, bby + bh / 2);
      }
    } else {
      // B box (dashed border)
      const rbx = w - pad - boxW;
      ctx.beginPath();
      ctx.roundRect(rbx, boxY, boxW, boxH, 6);
      ctx.fillStyle = row.bg;
      ctx.fill();
      ctx.strokeStyle = row.border;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      const rbCx = w - pad - boxW / 2;
      ctx.fillStyle = row.color;
      ctx.font = `600 ${labelFs}px ${MONO}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(row.label, rbCx, boxCy - (row.sub ? 5 * s : 0));
      if (row.sub) {
        ctx.font = `${subFs}px ${FONT}`;
        ctx.globalAlpha = 0.7;
        ctx.fillText(row.sub, rbCx, boxCy + 6 * s);
        ctx.globalAlpha = 1;
      }

      // Arrow DB zone ← box (write)
      const ax1 = cx + dbZoneW / 2 + 2 * s;
      const ax2 = rbx - 4 * s;
      ctx.strokeStyle = row.color;
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ax2, boxCy);
      ctx.lineTo(ax1 + 4, boxCy);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = row.color;
      ctx.moveTo(ax1, boxCy);
      ctx.lineTo(ax1 + 6, boxCy - 3);
      ctx.lineTo(ax1 + 6, boxCy + 3);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      // "write" label
      ctx.fillStyle = '#868e96';
      ctx.font = `${actionFs}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('write', (ax1 + ax2) / 2, boxCy - 3);
    }
  }

  return totalH + 10 * s;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const pad = w * 0.06;
  const boxW = w - pad * 2;
  const indent = 16;
  const bndGap = 16;
  const aBoxH = 28;
  const bBoxH = 34;

  let y = 4;

  for (let i = 0; i < ROWS.length; i++) {
    const row = ROWS[i];
    const isB = row.side === 'right';
    const h = isB ? bBoxH : aBoxH;
    const bx = isB ? pad + indent : pad;
    const bw = isB ? boxW - indent * 2 : boxW;

    // Background band for B rows
    if (isB) {
      ctx.fillStyle = 'rgba(250, 82, 82, 0.05)';
      ctx.fillRect(0, y - 2, w, h + 4);
    }

    // Box
    if (isB) {
      ctx.beginPath();
      ctx.roundRect(bx, y, bw, h, 6);
      ctx.fillStyle = row.bg;
      ctx.fill();
      ctx.strokeStyle = row.border;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      drawRoundRect(ctx, bx, y, bw, h, 6, row.bg, row.border);
    }

    const boxCx = bx + bw / 2;
    const boxCy = y + h / 2;

    ctx.fillStyle = row.color;
    ctx.font = `600 9px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (isB && row.sub) {
      ctx.fillText(row.label, boxCx, boxCy - 5);
      ctx.font = `7px ${FONT}`;
      ctx.globalAlpha = 0.7;
      ctx.fillText(row.sub, boxCx, boxCy + 6);
      ctx.globalAlpha = 1;
    } else {
      ctx.fillText(row.label, boxCx, boxCy);
    }

    // Side tags
    const tag = isB ? '요청 B' : '요청 A';
    const actionTag = row.action === 'read' ? 'DB read' : 'DB write';
    ctx.fillStyle = row.color;
    ctx.globalAlpha = 0.5;
    ctx.font = `7px ${FONT}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(tag, bx + 5, isB ? boxCy - 5 : boxCy - 5);
    ctx.textAlign = 'right';
    ctx.fillText(actionTag, bx + bw - 5, isB ? boxCy - 5 : boxCy - 5);
    ctx.globalAlpha = 1;

    if (row.stale) {
      const badgeText = 'stale data!';
      ctx.font = `600 8px ${FONT}`;
      const tw = ctx.measureText(badgeText).width;
      const bbw = tw + 10;
      const bbh = 14;
      const bbx = cx - bbw / 2;
      const bby = y + h + 3;
      drawRoundRect(ctx, bbx, bby, bbw, bbh, 3, '#fff5f5', '#ffc9c9');
      ctx.fillStyle = '#fa5252';
      ctx.font = `600 8px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, cx, bby + bbh / 2);
      y += h + bbh + 6;
    } else {
      y += h;
    }

    // Boundary line
    if (i < ROWS.length - 1) {
      const bndY = y + bndGap / 2;
      ctx.strokeStyle = '#fa5252';
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pad, bndY);
      ctx.lineTo(w - pad, bndY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#fa5252';
      ctx.globalAlpha = 0.5;
      ctx.font = `7px ${FONT}`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('경계', w - pad, bndY - 2);
      ctx.globalAlpha = 1;

      y += bndGap;
    }
  }

  return y + 10;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const AsyncOrderDiagram = ({ caption }: Props) => {
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
        h = 290;
      } else {
        h = 295 * (w / 540);
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
