import React, { useRef, useEffect } from 'react';

function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return (t: number): number => {
    let guessT = t;
    for (let i = 0; i < 8; i++) {
      const currentX =
        ((1 - 3 * p2x + 3 * p1x) * guessT + (3 * p2x - 6 * p1x)) * guessT * guessT +
        3 * p1x * guessT;
      const slope =
        (3 * (1 - 3 * p2x + 3 * p1x) * guessT + 2 * (3 * p2x - 6 * p1x)) * guessT +
        3 * p1x;
      if (Math.abs(slope) < 1e-6) break;
      guessT -= (currentX - t) / slope;
    }
    return (
      ((1 - 3 * p2y + 3 * p1y) * guessT + (3 * p2y - 6 * p1y)) * guessT * guessT +
      3 * p1y * guessT
    );
  };
}

type EasingConfig = {
  label: string;
  color: string;
  p1: [number, number];
  p2: [number, number];
};

const EASINGS: EasingConfig[] = [
  { label: 'Linear', color: '#868e96', p1: [0, 0], p2: [1, 1] },
  { label: 'Ease In', color: '#f76707', p1: [0.42, 0], p2: [1, 1] },
  { label: 'Ease Out', color: '#228be6', p1: [0, 0], p2: [0.58, 1] },
  { label: 'Ease In-Out', color: '#40c057', p1: [0.42, 0], p2: [0.58, 1] },
];

const TOAST_SLIDE = 60;

export const EasingPracticeDemo = () => {
  const toastRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);

  const ANIM_DURATION = 600;
  const PAUSE_DURATION = 800;

  useEffect(() => {
    const easingFns = EASINGS.map((e) =>
      cubicBezier(e.p1[0], e.p1[1], e.p2[0], e.p2[1])
    );

    let startTime = performance.now();
    let phase: 'enter' | 'pause-enter' | 'exit' | 'pause-exit' = 'enter';

    const animate = (now: number) => {
      const elapsed = now - startTime;

      if (phase === 'enter') {
        const t = Math.min(elapsed / ANIM_DURATION, 1);
        toastRefs.current.forEach((toast, i) => {
          if (!toast) return;
          const progress = easingFns[i](t);
          toast.style.transform = `translateY(${TOAST_SLIDE * (1 - progress)}px)`;
          toast.style.opacity = `${progress}`;
        });
        if (t >= 1) {
          phase = 'pause-enter';
          startTime = now;
        }
      } else if (phase === 'pause-enter') {
        if (elapsed >= PAUSE_DURATION) {
          phase = 'exit';
          startTime = now;
        }
      } else if (phase === 'exit') {
        const t = Math.min(elapsed / ANIM_DURATION, 1);
        toastRefs.current.forEach((toast, i) => {
          if (!toast) return;
          const progress = easingFns[i](t);
          toast.style.transform = `translateY(${TOAST_SLIDE * progress}px)`;
          toast.style.opacity = `${1 - progress}`;
        });
        if (t >= 1) {
          phase = 'pause-exit';
          startTime = now;
        }
      } else if (phase === 'pause-exit') {
        if (elapsed >= PAUSE_DURATION) {
          phase = 'enter';
          startTime = now;
        }
      }

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
      {/* 4 mock screens with toasts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: 12,
          marginBottom: 16,
        }}
      >
        {EASINGS.map((easing, i) => (
          <div key={easing.label}>
            {/* Easing label */}
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: easing.color,
                textAlign: 'center',
                marginBottom: 6,
              }}
            >
              {easing.label}
            </div>
            {/* Mock screen */}
            <div
              style={{
                position: 'relative',
                height: 140,
                background: '#f8f9fa',
                borderRadius: 8,
                border: '1px solid #e9ecef',
                overflow: 'hidden',
              }}
            >
              {/* Toast notification */}
              <div
                ref={(el) => {
                  toastRefs.current[i] = el;
                }}
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  right: 10,
                  background: '#343a40',
                  color: '#fff',
                  borderRadius: 6,
                  padding: '8px 10px',
                  fontSize: 11,
                  fontWeight: 500,
                  textAlign: 'center',
                  transform: `translateY(${TOAST_SLIDE}px)`,
                  opacity: 0,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                저장되었습니다
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center' }}>
        {'같은 토스트가 이징에 따라 어떻게 다른지 비교해보세요'}
      </div>
    </div>
  );
};
