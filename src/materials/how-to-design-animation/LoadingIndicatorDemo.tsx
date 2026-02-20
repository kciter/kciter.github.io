import React, { useRef, useEffect } from 'react';

const DOT_COUNT = 3;
const AMPLITUDE = 4;
const FREQUENCY = 3;
const PHASE_OFFSET = 0.6;

export const LoadingIndicatorDemo = () => {
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();

    const animate = (now: number) => {
      const t = (now - start) / 1000;

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const y = -Math.max(0, Math.sin(t * FREQUENCY + i * PHASE_OFFSET)) * AMPLITUDE;
        dot.style.transform = `translateY(${y}px)`;
      });

      animRef.current = requestAnimationFrame(animate);
    };

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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
          background: '#f8f9fa',
          borderRadius: 8,
        }}
      >
        {/* Chat bubble with tail */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: '#e9ecef',
              borderRadius: '18px 18px 18px 4px',
              padding: '10px 16px',
            }}
          >
            {Array.from({ length: DOT_COUNT }).map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#868e96',
                  willChange: 'transform',
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center', marginTop: 10 }}>
        {'sin + 위상 오프셋으로 만든 타이핑 인디케이터'}
      </div>
    </div>
  );
};
