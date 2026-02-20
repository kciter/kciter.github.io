import React, { useRef, useEffect } from 'react';

const FACTOR = 0.05;
const PAUSE_AT_END = 2000;

// { target %, 다음 스텝까지 대기 ms }
const STEPS: { value: number; delay: number }[] = [
  // 초반: 빠르게 올라감
  { value: 12, delay: 300 },
  { value: 28, delay: 300 },
  { value: 45, delay: 400 },
  { value: 58, delay: 400 },
  // 중반: 뚝뚝 끊김
  { value: 63, delay: 1200 },
  { value: 65, delay: 1400 },
  { value: 68, delay: 1000 },
  // 갑자기 완료
  { value: 100, delay: 0 },
];

export const ProgressBarDemo = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<number>(0);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const stepRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const advance = () => {
      if (stepRef.current >= STEPS.length) {
        // 완료 후 잠시 대기했다가 리셋
        timerRef.current = setTimeout(() => {
          stepRef.current = 0;
          targetRef.current = 0;
          currentRef.current = 0;
          timerRef.current = setTimeout(advance, 600);
        }, PAUSE_AT_END);
        return;
      }
      const step = STEPS[stepRef.current];
      targetRef.current = step.value;
      stepRef.current += 1;
      if (step.delay > 0) {
        timerRef.current = setTimeout(advance, step.delay);
      } else {
        // 마지막 스텝 — 다음 루프로
        timerRef.current = setTimeout(advance, 0);
      }
    };

    timerRef.current = setTimeout(advance, 600);

    const animate = () => {
      currentRef.current += (targetRef.current - currentRef.current) * FACTOR;

      if (barRef.current) {
        barRef.current.style.width = `${currentRef.current}%`;
      }
      if (labelRef.current) {
        labelRef.current.textContent = `${Math.round(currentRef.current)}%`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(timerRef.current);
    };
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
          background: '#f8f9fa',
          borderRadius: 8,
          padding: 20,
        }}
      >
        {/* Label */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: '#495057', fontWeight: 500 }}>파일 업로드</span>
          <span
            ref={labelRef}
            style={{
              fontSize: 13,
              color: '#228be6',
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            0%
          </span>
        </div>

        {/* Bar */}
        <div
          style={{
            height: 10,
            background: '#e9ecef',
            borderRadius: 5,
            overflow: 'hidden',
          }}
        >
          <div
            ref={barRef}
            style={{
              height: '100%',
              width: 0,
              background: 'linear-gradient(90deg, #228be6, #339af0)',
              borderRadius: 5,
              willChange: 'width',
            }}
          />
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center', marginTop: 10 }}>
        {'실제 진행률이 뚝뚝 끊겨도 바는 부드럽게 목표를 쫓아간다'}
      </div>
    </div>
  );
};
