import React, { useRef, useEffect } from 'react';

const easeOut = (t: number) => 1 - (1 - t) * (1 - t);

export const BidirectionalDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportH = container.clientHeight;
      const cardTop = card.offsetTop;
      const cardH = card.offsetHeight;

      const start = Math.max(0, cardTop - viewportH);
      const end = cardTop - viewportH / 2 + cardH / 2;

      const range = end - start;
      if (range <= 0) return;

      const raw = (scrollTop - start) / range;
      const progress = Math.min(1, Math.max(0, raw));
      const eased = easeOut(progress);

      // 카드: 아래에서 올라오며, 작아진 상태에서 커지고, 살짝 회전
      card.style.transform = `translateY(${(1 - eased) * 60}px) scale(${0.7 + eased * 0.3}) rotate(${(1 - eased) * 6}deg)`;
      card.style.opacity = `${eased}`;
      card.style.boxShadow = `0 ${4 + eased * 16}px ${8 + eased * 24}px rgba(0,0,0,${0.04 + eased * 0.1})`;

      // 배경 어두워짐
      if (bgRef.current) {
        bgRef.current.style.opacity = `${eased * 0.15}`;
      }

      if (barRef.current) {
        barRef.current.style.width = `${progress * 100}%`;
      }
      if (labelRef.current) {
        labelRef.current.textContent = `${Math.round(progress * 100)}%`;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
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
        ref={scrollRef}
        style={{
          height: 300,
          overflowY: 'auto',
          borderRadius: 8,
          background: '#f8f9fa',
          position: 'relative',
        }}
      >
        {/* 배경 오버레이 */}
        <div
          ref={bgRef}
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#000',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 1,
            marginBottom: -300,
          }}
        />

        <div style={{ height: 800, position: 'relative', zIndex: 2 }}>
          <div
            style={{
              fontSize: 12,
              color: '#adb5bd',
              textAlign: 'center',
              paddingTop: 24,
            }}
          >
            ↓ 스크롤
          </div>

          <div style={{ height: 320 }} />

          <div
            ref={cardRef}
            style={{
              maxWidth: 240,
              margin: '0 auto',
              padding: 20,
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 4px 8px rgba(0,0,0,0.04)',
              opacity: 0,
              transform: 'translateY(60px) scale(0.7) rotate(6deg)',
              willChange: 'transform, opacity, box-shadow',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #228be6, #845ef7)',
                marginBottom: 12,
              }}
            />
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#212529',
                marginBottom: 6,
              }}
            >
              새로운 알림
            </div>
            <div style={{ fontSize: 12, color: '#868e96', lineHeight: 1.5 }}>
              스크롤 위치가 곧 애니메이션의 진행도가 된다.
              올리면 자연스럽게 되돌아간다.
            </div>
          </div>

          <div style={{ height: 280 }} />

          <div
            style={{
              fontSize: 12,
              color: '#adb5bd',
              textAlign: 'center',
            }}
          >
            ↑ 다시 올려보세요
          </div>
        </div>
      </div>

      {/* 진행도 바 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 12,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 4,
            background: '#f1f3f5',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            ref={barRef}
            style={{
              height: '100%',
              background: '#228be6',
              borderRadius: 2,
              width: '0%',
              willChange: 'width',
            }}
          />
        </div>
        <span
          ref={labelRef}
          style={{
            fontSize: 11,
            color: '#868e96',
            width: 32,
            textAlign: 'right',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          0%
        </span>
      </div>

      <div
        style={{
          fontSize: 11,
          color: '#adb5bd',
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        스크롤 위치가 곧 진행도 — 올리면 자연스럽게 되돌아간다
      </div>
    </div>
  );
};
