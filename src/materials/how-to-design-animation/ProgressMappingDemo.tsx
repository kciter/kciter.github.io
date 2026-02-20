import React, { useRef, useEffect } from 'react';

const linear = (t: number) => t;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
const stepped = (t: number) => Math.round(t * 4) / 4;

const TRACKS = [
  { label: '선형', fn: linear, color: '#228be6' },
  { label: 'ease-out', fn: easeOut, color: '#40c057' },
  { label: '4단계', fn: stepped, color: '#fab005' },
] as const;

export const ProgressMappingDemo = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ballRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const travelRef = useRef(0);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;

    const measure = () => {
      // 트랙 너비에서 볼 크기를 뺀 이동 가능 거리
      const trackEl = area.querySelector('[data-track]') as HTMLElement;
      if (trackEl) {
        travelRef.current = trackEl.clientWidth - 24;
      }
    };

    measure();
    window.addEventListener('resize', measure);

    const update = (clientX: number) => {
      const rect = area.getBoundingClientRect();
      const raw = (clientX - rect.left) / rect.width;
      const t = Math.min(1, Math.max(0, raw));

      if (cursorRef.current) {
        cursorRef.current.style.left = `${t * 100}%`;
        cursorRef.current.style.opacity = '1';
      }

      const travel = travelRef.current;
      TRACKS.forEach((track, i) => {
        const mapped = track.fn(t);
        const ball = ballRefs.current[i];
        if (ball) {
          ball.style.transform = `translateX(${mapped * travel}px)`;
        }
      });
    };

    const handleMouse = (e: MouseEvent) => update(e.clientX);
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) update(e.touches[0].clientX);
    };
    const handleLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    area.addEventListener('mousemove', handleMouse);
    area.addEventListener('touchmove', handleTouch, { passive: true });
    area.addEventListener('mouseleave', handleLeave);

    return () => {
      area.removeEventListener('mousemove', handleMouse);
      area.removeEventListener('touchmove', handleTouch);
      area.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('resize', measure);
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
        ref={areaRef}
        style={{
          position: 'relative',
          padding: '16px 0',
          cursor: 'crosshair',
          userSelect: 'none',
          touchAction: 'none',
        }}
      >
        {/* 입력 위치 표시 */}
        <div
          style={{
            position: 'relative',
            height: 20,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: '#dee2e6',
              borderRadius: 1,
              top: 9,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              fontSize: 9,
              color: '#adb5bd',
              top: -2,
            }}
          >
            0
          </div>
          <div
            style={{
              position: 'absolute',
              right: 0,
              fontSize: 9,
              color: '#adb5bd',
              top: -2,
            }}
          >
            1
          </div>
          <div
            ref={cursorRef}
            style={{
              position: 'absolute',
              top: 4,
              width: 2,
              height: 12,
              background: '#495057',
              borderRadius: 1,
              marginLeft: -1,
              opacity: 0,
              willChange: 'left',
              transition: 'opacity 0.15s',
            }}
          />
          <div
            style={{
              fontSize: 10,
              color: '#868e96',
              textAlign: 'center',
              position: 'absolute',
              width: '100%',
              top: -2,
            }}
          >
            입력
          </div>
        </div>

        {/* 트랙들 */}
        {TRACKS.map((track, i) => (
          <div
            key={track.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: i < TRACKS.length - 1 ? 10 : 0,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: '#868e96',
                width: 52,
                textAlign: 'right',
                flexShrink: 0,
              }}
            >
              {track.label}
            </span>
            <div
              data-track
              style={{
                flex: 1,
                height: 32,
                background: '#f1f3f5',
                borderRadius: 16,
                position: 'relative',
              }}
            >
              <div
                ref={el => {
                  ballRefs.current[i] = el;
                }}
                style={{
                  position: 'absolute',
                  top: 4,
                  left: 4,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: track.color,
                  willChange: 'transform',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: 11,
          color: '#adb5bd',
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        마우스를 좌우로 움직여보세요 — 같은 입력, 다른 매핑 함수, 다른 결과
      </div>
    </div>
  );
};
