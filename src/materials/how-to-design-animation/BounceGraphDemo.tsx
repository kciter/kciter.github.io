import React, { useRef, useEffect } from 'react';

const GRAPH_W = 280;
const GRAPH_H = 160;

// --- 구간별로 나눠서 설계한 제자리 바운스 애니메이션 ---
// 각 조각은 독립적인 이징과 시작/끝 값을 가진다.
interface Segment {
  duration: number;
  from: number;    // 높이 (0 = 바닥, 값이 클수록 위)
  to: number;
  ease: (t: number) => number;
}

const easeIn = (t: number) => t * t;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// 조각들을 정의하고 이어 붙인다
const segments: Segment[] = [
  { duration: 0.22, from: 0,    to: 0.55, ease: easeOut },   // 바운스 ↑
  { duration: 0.22, from: 0.55, to: 0,    ease: easeIn },    // 착지 ↓
  { duration: 0.18, from: 0,    to: 0.25, ease: easeOut },   // 작은 바운스 ↑
  { duration: 0.18, from: 0.25, to: 0,    ease: easeIn },    // 재착지 ↓
  { duration: 0.15, from: 0,    to: 0.08, ease: easeOut },   // 미세 바운스 ↑
  { duration: 0.13, from: 0.08, to: 0,    ease: easeInOut }, // 안착
];

const SEG_COLORS = ['#fa5252', '#228be6', '#fab005', '#40c057', '#845ef7', '#f06595'];

const totalDuration = segments.reduce((s, seg) => s + seg.duration, 0);
const PAUSE = 1.2;
const CYCLE = totalDuration + PAUSE;
const BOUNCE_PX = 50;

// 시간 t에 대해 현재 높이와 구간 인덱스를 반환
function evaluate(t: number): { h: number; seg: number } {
  let elapsed = 0;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (t <= elapsed + seg.duration) {
      const local = (t - elapsed) / seg.duration;
      const eased = seg.ease(Math.min(Math.max(local, 0), 1));
      return { h: seg.from + (seg.to - seg.from) * eased, seg: i };
    }
    elapsed += seg.duration;
  }
  return { h: 0, seg: segments.length - 1 };
}

export const BounceGraphDemo = () => {
  const pinRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = GRAPH_W * dpr;
    canvas.height = GRAPH_H * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const start = performance.now();

    const animate = (now: number) => {
      const t = Math.min(((now - start) / 1000) % CYCLE, totalDuration);
      const { h, seg } = evaluate(t);

      // Pin position — 바닥 기준으로 위로 바운스
      if (pinRef.current) {
        pinRef.current.style.transform = `translateX(-50%) translateY(${-h * BOUNCE_PX}px)`;
      }

      // Shadow — 높이에 따라 작아지고 연해진다
      if (shadowRef.current) {
        const ratio = Math.min(h / 0.55, 1);
        const scale = 1 + ratio * 0.5;
        const opacity = 1 - ratio * 0.6;
        shadowRef.current.style.transform = `translateX(-50%) scaleX(${scale})`;
        shadowRef.current.style.opacity = `${opacity}`;
      }

      // --- Graph ---
      ctx.clearRect(0, 0, GRAPH_W, GRAPH_H);

      const pL = 16, pR = 12, pT = 16, pB = 28;
      const gw = GRAPH_W - pL - pR;
      const gh = GRAPH_H - pT - pB;

      // Axes
      ctx.strokeStyle = '#dee2e6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pL, pT);
      ctx.lineTo(pL, pT + gh);
      ctx.lineTo(pL + gw, pT + gh);
      ctx.stroke();

      // Labels
      ctx.fillStyle = '#adb5bd';
      ctx.font = '10px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('time', pL + gw / 2, pT + gh + 14);

      // Draw each segment as a separate colored curve
      let timeOffset = 0;
      const steps = 60;

      for (let i = 0; i < segments.length; i++) {
        const s = segments[i];
        ctx.beginPath();
        ctx.strokeStyle = SEG_COLORS[i % SEG_COLORS.length];
        ctx.lineWidth = 2;

        for (let j = 0; j <= steps; j++) {
          const lt = j / steps;
          const eased = s.ease(lt);
          const val = s.from + (s.to - s.from) * eased;
          const x = pL + ((timeOffset + lt * s.duration) / totalDuration) * gw;
          const y = pT + gh - val * gh;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        timeOffset += s.duration;
      }

      // Current position dot
      if (t < totalDuration) {
        const dx = pL + (t / totalDuration) * gw;
        const dy = pT + gh - h * gh;
        const color = SEG_COLORS[seg % SEG_COLORS.length];

        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.moveTo(dx, pT + gh);
        ctx.lineTo(dx, dy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(dx, dy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div style={{ margin: '24px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 48,
          padding: '24px 0',
          flexWrap: 'wrap',
        }}
      >
        {/* Pin */}
        <div style={{ width: 48, height: 80, position: 'relative' }}>
          <div
            ref={pinRef}
            style={{
              position: 'absolute',
              bottom: 3,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            <svg width="28" height="40" viewBox="0 0 28 40" style={{ display: 'block' }}>
              <path
                d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.27 21.73 0 14 0z"
                fill="#fa5252"
              />
              <circle cx="14" cy="14" r="6" fill="#fff" />
            </svg>
          </div>
          {/* Shadow */}
          <div
            ref={shadowRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 20,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.12)',
            }}
          />
        </div>

        {/* Graph */}
        <canvas
          ref={canvasRef}
          style={{ width: '100%', maxWidth: GRAPH_W, aspectRatio: `${GRAPH_W} / ${GRAPH_H}`, display: 'block' }}
        />
      </div>
      <div
        style={{
          fontSize: 11,
          color: '#adb5bd',
          textAlign: 'center',
          marginTop: 4,
        }}
      >
        핀 바운스 — 각 구간을 독립적으로 설계한 뒤 이어 붙인다
      </div>
    </div>
  );
};
