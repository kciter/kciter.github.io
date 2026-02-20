import React, { useRef, useCallback, useState } from 'react';

const easeOut = (t: number) => 1 - (1 - t) * (1 - t);

const STIFFNESS = 280;
const DAMPING = 18;
const DT = 1 / 60;

export const PropertySplitDemo = () => {
  const [selected, setSelected] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  const scaleBarRef = useRef<HTMLDivElement>(null);
  const borderBarRef = useRef<HTMLDivElement>(null);
  const contentBarRef = useRef<HTMLDivElement>(null);

  const state = useRef({
    scale: { current: 1, velocity: 0, target: 1 },
    border: { startTime: 0, from: 0, to: 0, current: 0 },
    content: { startTime: 0, from: 0, to: 0, current: 0 },
    running: false,
  });

  const animate = useCallback(() => {
    const s = state.current;
    const now = performance.now();
    let settled = true;

    // 크기: 스프링
    {
      const force =
        -STIFFNESS * (s.scale.current - s.scale.target) -
        DAMPING * s.scale.velocity;
      s.scale.velocity += force * DT;
      s.scale.current += s.scale.velocity * DT;
      if (
        Math.abs(s.scale.current - s.scale.target) > 0.0005 ||
        Math.abs(s.scale.velocity) > 0.0005
      ) {
        settled = false;
      } else {
        s.scale.current = s.scale.target;
        s.scale.velocity = 0;
      }
    }

    // 테두리: 150ms ease-out
    {
      const t = Math.min(1, (now - s.border.startTime) / 150);
      s.border.current =
        s.border.from + (s.border.to - s.border.from) * easeOut(t);
      if (t < 1) settled = false;
    }

    // 상세 내용: 400ms ease-out
    {
      const t = Math.min(1, (now - s.content.startTime) / 400);
      s.content.current =
        s.content.from + (s.content.to - s.content.from) * easeOut(t);
      if (t < 1) settled = false;
    }

    // 카드에 적용
    if (cardRef.current) {
      cardRef.current.style.transform = `scale(${s.scale.current})`;
      const b = s.border.current;
      const r = Math.round(222 + (34 - 222) * b);
      const g = Math.round(226 + (139 - 226) * b);
      cardRef.current.style.borderColor = `rgb(${r},${g},230)`;
      cardRef.current.style.borderWidth = `${1 + b}px`;
    }

    // 체크 아이콘
    if (checkRef.current) {
      checkRef.current.style.opacity = `${s.border.current}`;
      checkRef.current.style.transform = `scale(${0.5 + s.border.current * 0.5})`;
    }

    // 상세 내용
    if (descRef.current) {
      descRef.current.style.opacity = `${s.content.current}`;
      descRef.current.style.transform = `translateY(${(1 - s.content.current) * 8}px)`;
    }

    // 트랙 바
    if (scaleBarRef.current) {
      const target = s.scale.target > 1 ? 0.02 : 0.02;
      const p = Math.abs(s.scale.current - 1) / target * 100;
      scaleBarRef.current.style.width = `${Math.min(Math.max(p, 0), 100)}%`;
    }
    if (borderBarRef.current) {
      borderBarRef.current.style.width = `${s.border.current * 100}%`;
    }
    if (contentBarRef.current) {
      contentBarRef.current.style.width = `${s.content.current * 100}%`;
    }

    if (!settled) {
      animRef.current = requestAnimationFrame(animate);
    } else {
      s.running = false;
    }
  }, []);

  const start = useCallback(() => {
    if (!state.current.running) {
      state.current.running = true;
      animRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const toggle = useCallback(() => {
    const s = state.current;
    const now = performance.now();
    const next = !selected;
    setSelected(next);

    if (next) {
      s.scale.current = 0.96;
      s.scale.velocity = 0;
      s.scale.target = 1.02;
      s.border = {
        startTime: now,
        from: s.border.current,
        to: 1,
        current: s.border.current,
      };
      s.content = {
        startTime: now,
        from: s.content.current,
        to: 1,
        current: s.content.current,
      };
    } else {
      s.scale.target = 1;
      s.border = {
        startTime: now,
        from: s.border.current,
        to: 0,
        current: s.border.current,
      };
      s.content = {
        startTime: now,
        from: s.content.current,
        to: 0,
        current: s.content.current,
      };
    }

    start();
  }, [selected, start]);

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
      {/* 카드 영역 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '24px 0',
          background: '#f8f9fa',
          borderRadius: 8,
        }}
      >
        <div
          ref={cardRef}
          onClick={toggle}
          style={{
            width: 240,
            padding: 16,
            borderRadius: 12,
            border: '1px solid #dee2e6',
            background: '#fff',
            cursor: 'pointer',
            willChange: 'transform',
            userSelect: 'none',
            position: 'relative',
          }}
        >
          {/* 체크 아이콘 */}
          <div
            ref={checkRef}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#228be6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              willChange: 'opacity, transform',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M2 6l3 3 5-5"
                stroke="#fff"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#212529',
              marginBottom: 4,
            }}
          >
            Pro 플랜
          </div>
          <div style={{ fontSize: 12, color: '#868e96' }}>월 29,000원</div>

          {/* 상세 내용 */}
          <div
            ref={descRef}
            style={{
              marginTop: 10,
              paddingTop: 10,
              borderTop: '1px solid #f1f3f5',
              opacity: 0,
              willChange: 'opacity, transform',
            }}
          >
            <div style={{ fontSize: 11, color: '#495057', lineHeight: 1.6 }}>
              무제한 프로젝트
              <br />
              팀 협업 기능
              <br />
              우선 지원
            </div>
          </div>
        </div>
      </div>

      {/* 트랙 시각화 */}
      <div style={{ marginTop: 16 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: '#868e96',
              width: 48,
              textAlign: 'right',
              flexShrink: 0,
            }}
          >
            테두리
          </span>
          <div
            style={{
              flex: 1,
              height: 6,
              background: '#f1f3f5',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              ref={borderBarRef}
              style={{
                height: '100%',
                background: '#228be6',
                borderRadius: 3,
                width: '0%',
                willChange: 'width',
              }}
            />
          </div>
          <span
            style={{ fontSize: 10, color: '#adb5bd', width: 100, flexShrink: 0 }}
          >
            150ms, ease-out
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: '#868e96',
              width: 48,
              textAlign: 'right',
              flexShrink: 0,
            }}
          >
            크기
          </span>
          <div
            style={{
              flex: 1,
              height: 6,
              background: '#f1f3f5',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              ref={scaleBarRef}
              style={{
                height: '100%',
                background: '#40c057',
                borderRadius: 3,
                width: '0%',
                willChange: 'width',
              }}
            />
          </div>
          <span
            style={{ fontSize: 10, color: '#adb5bd', width: 100, flexShrink: 0 }}
          >
            스프링
          </span>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span
            style={{
              fontSize: 11,
              color: '#868e96',
              width: 48,
              textAlign: 'right',
              flexShrink: 0,
            }}
          >
            상세
          </span>
          <div
            style={{
              flex: 1,
              height: 6,
              background: '#f1f3f5',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              ref={contentBarRef}
              style={{
                height: '100%',
                background: '#fab005',
                borderRadius: 3,
                width: '0%',
                willChange: 'width',
              }}
            />
          </div>
          <span
            style={{ fontSize: 10, color: '#adb5bd', width: 100, flexShrink: 0 }}
          >
            400ms, ease-out
          </span>
        </div>
      </div>

      <div
        style={{
          fontSize: 11,
          color: '#adb5bd',
          textAlign: 'center',
          marginTop: 10,
        }}
      >
        카드를 클릭하세요 — 세 속성이 각자의 곡선으로 독립 변화한다
      </div>
    </div>
  );
};
