import React, { useRef, useEffect } from 'react';

const ITEMS = [
  { color: '#228be6', size: 16, radius: 50, speed: 1, freqX: 1, freqY: 1 },
  { color: '#fa5252', size: 12, radius: 40, speed: 1.3, freqX: 2, freqY: 1 },
  { color: '#40c057', size: 14, radius: 55, speed: 0.8, freqX: 3, freqY: 2 },
  { color: '#fab005', size: 10, radius: 35, speed: 1.6, freqX: 1, freqY: 2 },
];

export const OrbitDemo = () => {
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = trailCanvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;

    const start = performance.now();

    const animate = (now: number) => {
      const t = (now - start) / 1000;

      ctx.fillStyle = 'rgba(248, 249, 250, 0.15)';
      ctx.fillRect(0, 0, w, h);

      ITEMS.forEach((item, i) => {
        const x = cx + item.radius * Math.cos(t * item.speed * item.freqX);
        const y = cy + item.radius * Math.sin(t * item.speed * item.freqY);

        // Trail dot on canvas
        ctx.beginPath();
        ctx.fillStyle = item.color + '40';
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Move DOM dot
        if (dotRefs.current[i]) {
          dotRefs.current[i]!.style.transform =
            `translate(${x - item.size / 2}px, ${y - item.size / 2}px)`;
        }
      });

      // Center dot
      ctx.beginPath();
      ctx.fillStyle = '#dee2e6';
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      animRef.current = requestAnimationFrame(animate);
    };

    // Clear canvas initially
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, w, h);

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      style={{
        border: '1px solid #dee2e6',
        borderRadius: 8,
        padding: 20,
        margin: '24px 0',
        background: '#fff',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: 220,
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={trailCanvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            borderRadius: 8,
          }}
        />
        {ITEMS.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: item.size,
              height: item.size,
              borderRadius: '50%',
              background: item.color,
              boxShadow: `0 0 6px ${item.color}80`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 10 }}>
        {ITEMS.map((item, i) => (
          <span key={i} style={{ fontSize: 11, color: '#868e96' }}>
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: item.color,
                marginRight: 4,
                verticalAlign: 'middle',
              }}
            />
            {item.freqX}:{item.freqY}
          </span>
        ))}
      </div>
    </div>
  );
};
