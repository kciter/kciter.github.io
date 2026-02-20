import React, { useRef, useEffect } from 'react';

const ITEMS = [
  { emoji: '\uD83D\uDE80', x: '15%', y: '20%', amp: 8, freq: 0.8, phase: 0 },
  { emoji: '\u2B50', x: '75%', y: '15%', amp: 10, freq: 1.1, phase: 1.2 },
  { emoji: '\uD83C\uDFA8', x: '60%', y: '65%', amp: 6, freq: 0.9, phase: 2.5 },
  { emoji: '\uD83D\uDCA1', x: '25%', y: '70%', amp: 12, freq: 0.7, phase: 0.8 },
  { emoji: '\u2699\uFE0F', x: '45%', y: '30%', amp: 7, freq: 1.3, phase: 3.8 },
  { emoji: '\uD83C\uDF1F', x: '85%', y: '50%', amp: 9, freq: 0.6, phase: 1.6 },
];

export const FloatingHeroDemo = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();

    const animate = (now: number) => {
      const t = (now - start) / 1000;

      ITEMS.forEach((item, i) => {
        if (!itemRefs.current[i]) return;
        const y = item.amp * Math.sin(t * item.freq + item.phase);
        const x = (item.amp * 0.3) * Math.cos(t * item.freq * 0.7 + item.phase);
        itemRefs.current[i]!.style.transform = `translate(${x}px, ${y}px)`;
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
          position: 'relative',
          height: 160,
          background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              fontSize: 28,
              willChange: 'transform',
              userSelect: 'none',
            }}
          >
            {item.emoji}
          </div>
        ))}
        {/* Center text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#495057',
              background: 'rgba(255,255,255,0.8)',
              padding: '6px 16px',
              borderRadius: 8,
            }}
          >
            Creative Studio
          </span>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center', marginTop: 10 }}>
        {'각 요소마다 다른 진폭·주파수·위상을 가진다'}
      </div>
    </div>
  );
};
