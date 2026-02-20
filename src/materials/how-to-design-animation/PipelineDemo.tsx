import React, { useRef, useEffect } from 'react';

const ENTER = 700;
const HOLD = 1500;
const EXIT = 300;
const GAP = 600;
const CYCLE = ENTER + HOLD + EXIT + GAP;

const easeOut = (t: number) => 1 - (1 - t) * (1 - t);

export const PipelineDemo = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) % CYCLE;

      const inEnter = elapsed < ENTER;
      const inHold = elapsed >= ENTER && elapsed < ENTER + HOLD;
      const inExit = elapsed >= ENTER + HOLD && elapsed < ENTER + HOLD + EXIT;

      let bgOpacity = 0;
      let cardY = 120;
      let cardOpacity = 0;
      let contentOpacity = 0;

      if (inEnter || inHold) {
        const t1 = Math.min(1, elapsed / 200);
        bgOpacity = t1 * 0.4;

        const t2 = Math.min(1, Math.max(0, (elapsed - 200) / 300));
        cardY = (1 - easeOut(t2)) * 120;
        cardOpacity = easeOut(t2);

        const t3 = Math.min(1, Math.max(0, (elapsed - 500) / 200));
        contentOpacity = t3;

        if (inHold) {
          bgOpacity = 0.4;
          cardY = 0;
          cardOpacity = 1;
          contentOpacity = 1;
        }
      } else if (inExit) {
        const t = (elapsed - ENTER - HOLD) / EXIT;
        const e = t * t;
        bgOpacity = 0.4 * (1 - e);
        cardY = e * 60;
        cardOpacity = 1 - e;
        contentOpacity = 1 - e;
      }

      if (bgRef.current) bgRef.current.style.opacity = `${bgOpacity}`;
      if (cardRef.current) {
        cardRef.current.style.transform = `translateY(${cardY}px)`;
        cardRef.current.style.opacity = `${cardOpacity}`;
      }
      if (contentRef.current) contentRef.current.style.opacity = `${contentOpacity}`;

      // Timeline
      if (inEnter) {
        const progress = elapsed / ENTER;
        if (indicatorRef.current) {
          indicatorRef.current.style.left = `${progress * 100}%`;
          indicatorRef.current.style.opacity = '1';
        }
        const active = elapsed < 200 ? 1 : elapsed < 500 ? 2 : 3;
        if (stage1Ref.current) stage1Ref.current.style.opacity = active >= 1 ? '1' : '0.25';
        if (stage2Ref.current) stage2Ref.current.style.opacity = active >= 2 ? '1' : '0.25';
        if (stage3Ref.current) stage3Ref.current.style.opacity = active >= 3 ? '1' : '0.25';
      } else {
        if (indicatorRef.current) indicatorRef.current.style.opacity = '0';
        const allOn = inHold ? '1' : '0.25';
        if (stage1Ref.current) stage1Ref.current.style.opacity = allOn;
        if (stage2Ref.current) stage2Ref.current.style.opacity = allOn;
        if (stage3Ref.current) stage3Ref.current.style.opacity = allOn;
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
      {/* Animation area */}
      <div
        style={{
          position: 'relative',
          height: 160,
          background: '#f8f9fa',
          borderRadius: 8,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          ref={bgRef}
          style={{ position: 'absolute', inset: 0, background: '#000', opacity: 0 }}
        />
        <div
          ref={cardRef}
          style={{
            position: 'relative',
            width: 220,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: 16,
            opacity: 0,
            transform: 'translateY(120px)',
            willChange: 'transform, opacity',
          }}
        >
          <div ref={contentRef} style={{ opacity: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#212529', marginBottom: 4 }}>
              새 메시지
            </div>
            <div style={{ fontSize: 12, color: '#868e96' }}>
              안녕하세요! 확인해주세요.
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', gap: 3, position: 'relative', marginBottom: 6 }}>
          <div
            ref={stage1Ref}
            style={{
              flex: 200,
              height: 6,
              background: '#228be6',
              borderRadius: 3,
              opacity: 0.25,
            }}
          />
          <div
            ref={stage2Ref}
            style={{
              flex: 300,
              height: 6,
              background: '#40c057',
              borderRadius: 3,
              opacity: 0.25,
            }}
          />
          <div
            ref={stage3Ref}
            style={{
              flex: 200,
              height: 6,
              background: '#fab005',
              borderRadius: 3,
              opacity: 0.25,
            }}
          />
          <div
            ref={indicatorRef}
            style={{
              position: 'absolute',
              top: -3,
              left: 0,
              width: 3,
              height: 12,
              background: '#212529',
              borderRadius: 1.5,
              opacity: 0,
              willChange: 'left',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          <div style={{ flex: 200, fontSize: 10, color: '#228be6', textAlign: 'center' }}>
            배경
          </div>
          <div style={{ flex: 300, fontSize: 10, color: '#40c057', textAlign: 'center' }}>
            카드
          </div>
          <div style={{ flex: 200, fontSize: 10, color: '#fab005', textAlign: 'center' }}>
            내용
          </div>
        </div>
      </div>

      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center', marginTop: 8 }}>
        세 조각이 시간축 위에 순서대로 배치된다
      </div>
    </div>
  );
};
