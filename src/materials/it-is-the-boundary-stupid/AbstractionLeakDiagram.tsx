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

// ── Horizontal layout (desktop) ──

function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 540;

  const labelFs = Math.max(9 * s, 7);
  const smallFs = Math.max(7.5 * s, 6.5);
  const tinyFs = Math.max(6.5 * s, 5.5);

  const cx = w / 2;

  // Layers from bottom (low-level) to top (high-level)
  const layers = [
    { label: '하드웨어', detail: '레지스터 · 인터럽트 · DMA · 캐시라인', color: '#845ef7', bg: '#f3f0ff', border: '#b197fc' },
    { label: '운영체제', detail: '시스템콜 · 파일디스크립터 · 스레드', color: '#fa5252', bg: '#fff5f5', border: '#ffc9c9' },
    { label: '런타임', detail: 'GC · 메모리 레이아웃 · JIT', color: '#fab005', bg: '#fff9db', border: '#ffe066' },
    { label: '프레임워크', detail: '커넥션풀 · 트랜잭션 · 캐시', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
    { label: '애플리케이션', detail: 'Files.readString("data.txt")', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
  ];

  const layerW = 200 * s;
  const layerH = 26 * s;
  const layerGap = 4 * s;
  const totalH = layers.length * layerH + (layers.length - 1) * layerGap;
  const startY = 16 * s;
  const layerX = cx - layerW / 2;

  // Draw layers bottom-up
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const yi = startY + (layers.length - 1 - i) * (layerH + layerGap);

    drawRoundRect(ctx, layerX, yi, layerW, layerH, 6, layer.bg, layer.border);
    ctx.fillStyle = layer.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(layer.label, cx, yi + layerH / 2);

    // Boundary dashed line between layers
    if (i < layers.length - 1) {
      const bndY = yi + layerH + layerGap / 2;
      ctx.strokeStyle = '#fa5252';
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(layerX - 8 * s, bndY);
      ctx.lineTo(layerX + layerW + 8 * s, bndY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }
  }

  // ── Left: complexity bars (decreasing upward) ──
  const barAreaX = layerX - 90 * s;
  const barMaxW = 70 * s;
  const barH = layerH * 0.5;

  ctx.fillStyle = '#495057';
  ctx.font = `600 ${tinyFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('이해할 정보', barAreaX + barMaxW / 2, startY - 4 * s);

  for (let i = 0; i < layers.length; i++) {
    const yi = startY + (layers.length - 1 - i) * (layerH + layerGap);
    const ratio = (layers.length - i) / layers.length;
    const bw = barMaxW * ratio;

    const barGrad = ctx.createLinearGradient(barAreaX, 0, barAreaX + bw, 0);
    barGrad.addColorStop(0, '#228be640');
    barGrad.addColorStop(1, '#228be620');
    ctx.fillStyle = barGrad;
    ctx.beginPath();
    ctx.roundRect(barAreaX + barMaxW - bw, yi + (layerH - barH) / 2, bw, barH, 3);
    ctx.fill();
    ctx.strokeStyle = '#228be650';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // ── Right: lost info bars (increasing upward) ──
  const rBarAreaX = layerX + layerW + 20 * s;

  ctx.fillStyle = '#495057';
  ctx.font = `600 ${tinyFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('잃어버린 정보', rBarAreaX + barMaxW / 2, startY - 4 * s);

  for (let i = 0; i < layers.length; i++) {
    const yi = startY + (layers.length - 1 - i) * (layerH + layerGap);
    const ratio = i / layers.length;
    const bw = barMaxW * ratio;

    if (bw > 0) {
      const barGrad = ctx.createLinearGradient(rBarAreaX, 0, rBarAreaX + bw, 0);
      barGrad.addColorStop(0, '#fa525220');
      barGrad.addColorStop(1, '#fa525240');
      ctx.fillStyle = barGrad;
      ctx.beginPath();
      ctx.roundRect(rBarAreaX, yi + (layerH - barH) / 2, bw, barH, 3);
      ctx.fill();
      ctx.strokeStyle = '#fa525250';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }

  // ── Detail text on right side of layers ──
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const yi = startY + (layers.length - 1 - i) * (layerH + layerGap);
    const detailAlpha = 0.2 + (1 - i / layers.length) * 0.4;

    ctx.fillStyle = '#868e96';
    ctx.globalAlpha = detailAlpha;
    ctx.font = `${tinyFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Show detail inside the layer (smaller)
    if (i === layers.length - 1) {
      // Top layer: show the one-liner
      ctx.globalAlpha = 0.5;
      ctx.font = `italic ${tinyFs}px ${FONT}`;
    }

    ctx.globalAlpha = 1;
  }

  // Bottom label
  const bottomY = startY + totalH + 8 * s;
  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('추상화가 높아질수록 단순해지지만, 감춰진 정보도 함께 늘어난다', cx, bottomY);

  return bottomY + 16 * s;
}

// ── Vertical layout (mobile) ──

function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  const cx = w / 2;
  const pad = w * 0.04;

  const labelFs = 8;
  const smallFs = 7;
  const tinyFs = 6.5;

  const layers = [
    { label: '하드웨어', color: '#845ef7', bg: '#f3f0ff', border: '#b197fc' },
    { label: '운영체제', color: '#fa5252', bg: '#fff5f5', border: '#ffc9c9' },
    { label: '런타임', color: '#fab005', bg: '#fff9db', border: '#ffe066' },
    { label: '프레임워크', color: '#40c057', bg: '#ebfbee', border: '#69db7c' },
    { label: '애플리케이션', color: '#228be6', bg: '#e7f5ff', border: '#74c0fc' },
  ];

  const layerW = w * 0.5;
  const layerH = 22;
  const layerGap = 3;
  const layerX = cx - layerW / 2;
  const barMaxW = w * 0.15;

  let startY = 20;

  // Headers
  ctx.fillStyle = '#495057';
  ctx.font = `600 ${tinyFs}px ${FONT}`;
  ctx.textBaseline = 'bottom';

  ctx.textAlign = 'right';
  ctx.fillText('이해할 정보', layerX - 8, startY - 4);

  ctx.textAlign = 'left';
  ctx.fillText('잃어버린 정보', layerX + layerW + 8, startY - 4);

  // Draw layers bottom-up
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const yi = startY + (layers.length - 1 - i) * (layerH + layerGap);

    drawRoundRect(ctx, layerX, yi, layerW, layerH, 5, layer.bg, layer.border, 1);
    ctx.fillStyle = layer.color;
    ctx.font = `600 ${labelFs}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(layer.label, cx, yi + layerH / 2);

    // Left bar (decreasing)
    const lRatio = (layers.length - i) / layers.length;
    const lw = barMaxW * lRatio;
    const barH = layerH * 0.45;
    if (lw > 0) {
      ctx.fillStyle = '#228be630';
      ctx.beginPath();
      ctx.roundRect(layerX - 6 - lw, yi + (layerH - barH) / 2, lw, barH, 2);
      ctx.fill();
    }

    // Right bar (increasing)
    const rRatio = i / layers.length;
    const rw = barMaxW * rRatio;
    if (rw > 0) {
      ctx.fillStyle = '#fa525230';
      ctx.beginPath();
      ctx.roundRect(layerX + layerW + 6, yi + (layerH - barH) / 2, rw, barH, 2);
      ctx.fill();
    }
  }

  const totalH = layers.length * layerH + (layers.length - 1) * layerGap;
  const bottomY = startY + totalH + 6;

  ctx.fillStyle = '#868e96';
  ctx.font = `${smallFs}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('추상화 ↑ → 단순 ↑ · 잃어버리는 정보 ↑', cx, bottomY);

  return bottomY + 14;
}

// ── Component ──

interface Props {
  caption?: string;
}

export const AbstractionLeakDiagram = ({ caption }: Props) => {
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
        h = 170;
      } else {
        h = 190 * (w / 540);
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
