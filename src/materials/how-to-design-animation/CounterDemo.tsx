import React, { useRef, useEffect, useState } from 'react';

const TARGETS = [1247, 8392, 3156, 5720, 9481];
const FACTOR = 0.06;

export const CounterDemo = () => {
  const [targetIdx, setTargetIdx] = useState(0);
  const displayRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<number>(0);
  const currentRef = useRef(0);

  const target = TARGETS[targetIdx];

  useEffect(() => {
    const animate = () => {
      currentRef.current += (target - currentRef.current) * FACTOR;

      if (displayRef.current) {
        displayRef.current.textContent = Math.round(currentRef.current).toLocaleString();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [target]);

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
          background: '#f8f9fa',
          borderRadius: 8,
          padding: 20,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#868e96', marginBottom: 4 }}>총 방문자 수</div>
          <span
            ref={displayRef}
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#212529',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            0
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {TARGETS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTargetIdx(i)}
              style={{
                padding: '6px 14px',
                border: targetIdx === i ? '2px solid #228be6' : '1px solid #dee2e6',
                borderRadius: 6,
                background: targetIdx === i ? '#e7f5ff' : '#fff',
                color: targetIdx === i ? '#1971c2' : '#495057',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: targetIdx === i ? 600 : 400,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {t.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center', marginTop: 10 }}>
        {'목표값을 바꿔보세요 — 숫자가 부드럽게 새 목표를 쫓아간다'}
      </div>
    </div>
  );
};
