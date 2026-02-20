import React, { useRef, useEffect, useState } from 'react';

const DURATION = 300;

const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

function applyValue(el: HTMLElement, value: number) {
  el.style.transform = `translateY(${(1 - value) * 30}px) scale(${0.8 + value * 0.2})`;
  el.style.opacity = `${Math.max(0, Math.min(1, value))}`;
}

// "고려하지 않은 경우": 토글할 때마다 0 또는 1에서 재시작 (중간 위치 무시)
const NaivePanel = ({ show }: { show: boolean }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    // 항상 끝점에서 시작
    const from = show ? 0 : 1;
    const to = show ? 1 : 0;
    const start = performance.now();

    cancelAnimationFrame(animRef.current);

    const animate = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      applyValue(box, from + (to - from) * easeInOut(t));

      if (t < 1) animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [show]);

  return (
    <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        ref={boxRef}
        style={{
          width: 56, height: 56, borderRadius: 12,
          background: 'linear-gradient(135deg, #228be6, #845ef7)',
          opacity: 0, transform: 'translateY(30px) scale(0.8)',
        }}
      />
    </div>
  );
};

// "고려한 경우": 현재 위치에서 이어서 전환 (같은 이징, 같은 duration)
const SmartPanel = ({ show }: { show: boolean }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const currentValueRef = useRef(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    // 현재 위치에서 목표로
    const from = currentValueRef.current;
    const to = show ? 1 : 0;
    const start = performance.now();

    cancelAnimationFrame(animRef.current);

    const animate = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const value = from + (to - from) * easeInOut(t);
      currentValueRef.current = value;
      applyValue(box, value);

      if (t < 1) animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [show]);

  return (
    <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        ref={boxRef}
        style={{
          width: 56, height: 56, borderRadius: 12,
          background: 'linear-gradient(135deg, #228be6, #845ef7)',
          opacity: 0, transform: 'translateY(30px) scale(0.8)',
        }}
      />
    </div>
  );
};

export const BidirectionalCompareDemo = () => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button
          onClick={() => setShow(s => !s)}
          style={{
            padding: '8px 20px',
            border: '1px solid #dee2e6',
            borderRadius: 6,
            background: '#fff',
            color: '#495057',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          {show ? '숨기기' : '보이기'}
        </button>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, background: '#f8f9fa', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 11, color: '#868e96', textAlign: 'center', marginBottom: 8 }}>
            고려하지 않은 경우
          </div>
          <NaivePanel show={show} />
        </div>
        <div style={{ flex: 1, background: '#f8f9fa', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 11, color: '#868e96', textAlign: 'center', marginBottom: 8 }}>
            고려한 경우
          </div>
          <SmartPanel show={show} />
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center', marginTop: 8 }}>
        나타나는 도중에 빠르게 토글해보세요
      </div>
    </div>
  );
};
