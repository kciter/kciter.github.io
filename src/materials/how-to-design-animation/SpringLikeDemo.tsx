import React, { useRef, useCallback, useState } from 'react';

const STIFFNESS = 300;
const DAMPING = 12;
const DT = 1 / 60;

export const SpringLikeDemo = () => {
  const [liked, setLiked] = useState(false);
  const heartRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({ current: 1, velocity: 0, target: 1 });

  const animateSpring = useCallback((target: number) => {
    cancelAnimationFrame(animRef.current);
    stateRef.current.target = target;

    const animate = () => {
      const s = stateRef.current;
      const force = -STIFFNESS * (s.current - s.target) - DAMPING * s.velocity;
      s.velocity += force * DT;
      s.current += s.velocity * DT;

      if (heartRef.current) {
        heartRef.current.style.transform = `scale(${s.current})`;
      }

      const settled =
        Math.abs(s.current - s.target) < 0.001 &&
        Math.abs(s.velocity) < 0.001;

      if (!settled) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        s.current = s.target;
        s.velocity = 0;
        if (heartRef.current) {
          heartRef.current.style.transform = `scale(${s.target})`;
        }
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, []);

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    // 좋아요: 1 → 1.5로 튕긴 뒤 1로 안착
    // 취소: 1 → 0.6으로 쪼그라든 뒤 1로 안착
    stateRef.current.current = next ? 0.5 : 1.3;
    stateRef.current.velocity = 0;
    animateSpring(1);
  };

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
          height: 100,
          background: '#f8f9fa',
          borderRadius: 8,
        }}
      >
        <button
          onClick={toggle}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 12,
            outline: 'none',
          }}
        >
          <div ref={heartRef} style={{ willChange: 'transform' }}>
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                   C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={liked ? '#ff6b6b' : 'none'}
                stroke={liked ? '#ff6b6b' : '#adb5bd'}
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </button>
      </div>
      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center', marginTop: 10 }}>
        {'하트를 눌러보세요 — 스프링이 만드는 탄성 있는 피드백'}
      </div>
    </div>
  );
};
