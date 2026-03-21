import React, { useRef, useEffect, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// seeded random for consistent rendering across redraws
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function drawFocusLines(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const rand = seededRandom(42);

  // 중앙 빈 영역 (텍스트가 들어갈 타원)
  const clearW = w * 0.48;
  const clearH = h * 0.5;

  const maxRadius = Math.sqrt(cx * cx + cy * cy);
  const numLines = 300;

  ctx.save();
  ctx.fillStyle = '#000';

  for (let i = 0; i < numLines; i++) {
    // 균등 분포 + 약간의 흔들림
    const baseAngle = (i / numLines) * Math.PI * 2;
    const jitter = (rand() - 0.5) * 0.03;
    const angle = baseAngle + jitter;

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    // 타원 경계에서 시작
    const startDist = Math.sqrt(
      1 / ((cosA * cosA) / (clearW / 2) ** 2 + (sinA * sinA) / (clearH / 2) ** 2)
    );

    // 뾰족한 삼각형: 안쪽은 뾰족하고 바깥으로 갈수록 넓어짐
    const tipDist = startDist + rand() * 4;
    const endDist = maxRadius;
    const spread = (0.003 + rand() * 0.006); // 바깥쪽 폭

    const tipX = cx + cosA * tipDist;
    const tipY = cy + sinA * tipDist;

    const perpX = -sinA;
    const perpY = cosA;
    const halfW = endDist * spread;

    const endX = cx + cosA * endDist;
    const endY = cy + sinA * endDist;

    ctx.globalAlpha = 0.12 + rand() * 0.18;
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(endX + perpX * halfW, endY + perpY * halfW);
    ctx.lineTo(endX - perpX * halfW, endY - perpY * halfW);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

export const FocusLineEffect = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const draw = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      drawFocusLines(ctx, w, h);
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '2em 0',
        margin: '2em 0',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          fontSize: '1.5em',
          fontWeight: 'bold',
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};
