import React, { useRef, useEffect, useState } from 'react';

export const ExponentialApproachDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  const [factor, setFactor] = useState(0.08);

  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const initializedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!initializedRef.current) {
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      mouseRef.current = { x: centerX, y: centerY };
      posRef.current = { x: centerX, y: centerY };
      initializedRef.current = true;
    }

    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const r = container.getBoundingClientRect();
      const point = 'touches' in e ? e.touches[0] : e;
      if (!point) return;
      mouseRef.current = {
        x: point.clientX - r.left,
        y: point.clientY - r.top,
      };
    };

    container.addEventListener('mousemove', handlePointer);
    container.addEventListener('touchmove', handlePointer, { passive: true });

    const animate = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * factor;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * factor;

      if (followerRef.current) {
        followerRef.current.style.transform =
          `translate(${posRef.current.x - 14}px, ${posRef.current.y - 14}px)`;
      }
      if (targetRef.current) {
        targetRef.current.style.transform =
          `translate(${mouseRef.current.x - 10}px, ${mouseRef.current.y - 10}px)`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handlePointer);
      container.removeEventListener('touchmove', handlePointer);
      cancelAnimationFrame(animRef.current);
    };
  }, [factor]);

  return (
    <div style={{
      border: '1px solid #dee2e6',
      borderRadius: 8,
      padding: 20,
      margin: '24px 0',
      background: '#fff',
    }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 13, color: '#495057', display: 'block', marginBottom: 4 }}>
          Factor: <strong>{factor.toFixed(2)}</strong>
          <span style={{ fontSize: 11, color: '#adb5bd', marginLeft: 8 }}>
            {factor < 0.05
              ? '(\uB290\uB9B0 \uCD94\uC801)'
              : factor < 0.15
              ? '(\uC911\uAC04)'
              : '(\uBE60\uB978 \uCD94\uC801)'}
          </span>
        </label>
        <input
          type="range" min="0.01" max="0.3" step="0.01" value={factor}
          onChange={(e) => setFactor(Number(e.target.value))}
          style={{ width: '100%', maxWidth: 300 }}
        />
      </div>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: 220,
          background: '#f8f9fa',
          borderRadius: 8,
          cursor: 'crosshair',
          overflow: 'hidden',
          touchAction: 'none',
        }}
      >
        {/* Target ring at cursor position */}
        <div
          ref={targetRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: '2px solid #ff6b6b',
            pointerEvents: 'none',
          }}
        />

        {/* Follower ball */}
        <div
          ref={followerRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#228be6',
            pointerEvents: 'none',
          }}
        />

        <div style={{
          position: 'absolute',
          bottom: 8,
          width: '100%',
          fontSize: 11,
          color: '#adb5bd',
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          {'\uB9C8\uC6B0\uC2A4\uB97C \uC6C0\uC9C1\uC5EC\uBCF4\uC138\uC694'}
        </div>
      </div>
    </div>
  );
};
