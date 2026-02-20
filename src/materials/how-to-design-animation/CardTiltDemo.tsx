import React, { useRef, useEffect } from 'react';

const MAX_TILT = 15;
const LERP_FACTOR = 0.1;

export const CardTiltDemo = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const targetRef = useRef({ tiltX: 0, tiltY: 0 });
  const currentRef = useRef({ tiltX: 0, tiltY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const angle = Math.atan2(dy, dx);
      const maxDist = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy) / maxDist, 1);

      targetRef.current = {
        tiltX: -Math.sin(angle) * dist * MAX_TILT,
        tiltY: Math.cos(angle) * dist * MAX_TILT
      };
    };

    const handleLeave = () => {
      targetRef.current = { tiltX: 0, tiltY: 0 };
    };

    const animate = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;

      cur.tiltX += (tgt.tiltX - cur.tiltX) * LERP_FACTOR;
      cur.tiltY += (tgt.tiltY - cur.tiltY) * LERP_FACTOR;

      if (card) {
        card.style.transform = `perspective(600px) rotateX(${cur.tiltX}deg) rotateY(${cur.tiltY}deg)`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseleave', handleLeave);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      style={{
        border: '1px solid #dee2e6',
        borderRadius: 8,
        padding: 20,
        margin: '24px 0',
        background: '#fff'
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 240,
          background: '#f8f9fa',
          borderRadius: 8,
          cursor: 'default'
        }}
      >
        <div
          ref={cardRef}
          style={{
            width: 220,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            padding: 20,
            willChange: 'transform'
          }}
        >
          {/* Mock profile card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #228be6, #845ef7)',
                flexShrink: 0
              }}
            />
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#212529' }}>홍길동</div>
              <div style={{ fontSize: 11, color: '#868e96', marginTop: 2 }}>Frontend Developer</div>
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              color: '#495057',
              lineHeight: 1.5,
              marginBottom: 14
            }}
          >
            애니메이션과 인터랙션에 관심이 많은 개발자입니다.
          </div>
          <div
            style={{
              display: 'flex',
              gap: 16,
              fontSize: 11,
              color: '#868e96'
            }}
          >
            <span>
              <strong style={{ color: '#212529' }}>128</strong> posts
            </span>
            <span>
              <strong style={{ color: '#212529' }}>1.2k</strong> followers
            </span>
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center', marginTop: 10 }}>
        {'카드 위에서 마우스를 움직여보세요'}
      </div>
    </div>
  );
};
