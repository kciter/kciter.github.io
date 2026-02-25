import React, { useRef, useEffect } from 'react';

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

// Seeded pseudo-random for deterministic particle positions
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

interface Props {
  caption?: string;
}

export const HeroSloganDiagram = ({ caption }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let raf: number;

    // Pre-generate particles once
    const rand = seededRandom(42);
    const particles: { x: number; y: number; r: number; speed: number; phase: number; side: number }[] = [];
    for (let i = 0; i < 40; i++) {
      const side = i < 20 ? -1 : 1;
      particles.push({
        x: (rand() * 0.35 + 0.05) * side,
        y: rand() * 0.8 + 0.1,
        r: rand() * 2 + 1,
        speed: rand() * 0.5 + 0.3,
        phase: rand() * Math.PI * 2,
        side,
      });
    }

    const animate = (time: number) => {
      const w = container.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      const h = w * 9 / 16;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const cx = w / 2;
      const cy = h / 2;
      const s = w / 540;

      // ── Dark background with subtle gradient ──
      const bgGrad = ctx.createLinearGradient(0, 0, w, 0);
      bgGrad.addColorStop(0, '#0a1628');
      bgGrad.addColorStop(0.45, '#0d1f3c');
      bgGrad.addColorStop(0.5, '#111');
      bgGrad.addColorStop(0.55, '#2a0a0a');
      bgGrad.addColorStop(1, '#1a0505');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Floating particles (behind boundary) ──
      const t = time * 0.001;
      for (const p of particles) {
        const px = cx + p.x * w + Math.sin(t * p.speed + p.phase) * 8 * s;
        const py = p.y * h + Math.cos(t * p.speed * 0.7 + p.phase) * 6 * s;
        const alpha = 0.15 + Math.sin(t * p.speed + p.phase) * 0.1;

        ctx.beginPath();
        ctx.arc(px, py, p.r * s, 0, Math.PI * 2);
        ctx.fillStyle = p.side < 0
          ? `rgba(100, 160, 255, ${alpha})`
          : `rgba(255, 100, 100, ${alpha})`;
        ctx.fill();
      }

      // ── Center boundary line — glowing crack ──
      const glowIntensity = 0.5 + Math.sin(t * 1.5) * 0.2;

      // Outer glow (wide, soft)
      const glowGrad = ctx.createLinearGradient(cx - 40 * s, 0, cx + 40 * s, 0);
      glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      glowGrad.addColorStop(0.35, `rgba(200, 180, 255, ${0.03 * glowIntensity})`);
      glowGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.08 * glowIntensity})`);
      glowGrad.addColorStop(0.65, `rgba(200, 180, 255, ${0.03 * glowIntensity})`);
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(cx - 40 * s, 0, 80 * s, h);

      // Jagged boundary line
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.7 * glowIntensity})`;
      ctx.lineWidth = 1.5 * s;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(200, 180, 255, 0.8)';
      ctx.shadowBlur = 12 * s;
      ctx.beginPath();
      const segments = 24;
      for (let i = 0; i <= segments; i++) {
        const py = (i / segments) * h;
        const jitter = Math.sin(py * 0.08 / s + t * 0.8) * 6 * s
          + Math.sin(py * 0.15 / s + t * 1.2) * 3 * s;
        if (i === 0) ctx.moveTo(cx + jitter, py);
        else ctx.lineTo(cx + jitter, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ── Small decorative boxes (abstract modules) ──
      const boxAlpha = 0.25;

      // Left side boxes (blue, organized)
      const lBoxes = [
        { x: 0.12, y: 0.25, w: 0.18, h: 0.12 },
        { x: 0.08, y: 0.45, w: 0.22, h: 0.1 },
        { x: 0.15, y: 0.65, w: 0.16, h: 0.12 },
      ];
      for (const b of lBoxes) {
        const bx = b.x * w;
        const by = b.y * h;
        const bw = b.w * w;
        const bh = b.h * h;
        ctx.strokeStyle = `rgba(100, 160, 255, ${boxAlpha})`;
        ctx.lineWidth = 1 * s;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 4 * s);
        ctx.stroke();
        ctx.fillStyle = `rgba(100, 160, 255, 0.03)`;
        ctx.fill();
      }

      // Right side boxes (red, slightly misaligned)
      const rBoxes = [
        { x: 0.62, y: 0.2, w: 0.2, h: 0.14 },
        { x: 0.68, y: 0.42, w: 0.18, h: 0.1 },
        { x: 0.6, y: 0.62, w: 0.22, h: 0.13 },
      ];
      for (const b of rBoxes) {
        const bx = b.x * w;
        const by = b.y * h;
        const bw = b.w * w;
        const bh = b.h * h;
        ctx.strokeStyle = `rgba(255, 100, 100, ${boxAlpha})`;
        ctx.lineWidth = 1 * s;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 4 * s);
        ctx.stroke();
        ctx.fillStyle = `rgba(255, 100, 100, 0.03)`;
        ctx.fill();
      }

      // ── Dashed arrows pointing to boundary ──
      ctx.setLineDash([4 * s, 4 * s]);
      ctx.lineWidth = 1 * s;
      ctx.globalAlpha = 0.2;

      // Left arrows
      for (const b of lBoxes) {
        const startX = b.x * w + b.w * w;
        const startY = b.y * h + b.h * h / 2;
        ctx.strokeStyle = '#6496ff';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(cx - 10 * s, startY);
        ctx.stroke();
      }

      // Right arrows
      for (const b of rBoxes) {
        const startX = b.x * w;
        const startY = b.y * h + b.h * h / 2;
        ctx.strokeStyle = '#ff6464';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(cx + 10 * s, startY);
        ctx.stroke();
      }

      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // ── Title text ──
      const titleFs = Math.max(28 * s, 16);
      ctx.font = `800 ${titleFs}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Text shadow/glow
      ctx.shadowColor = 'rgba(200, 180, 255, 0.6)';
      ctx.shadowBlur = 20 * s;
      ctx.fillStyle = '#fff';
      ctx.fillText('바보야, 문제는 경계야!', cx, cy - 8 * s);
      ctx.shadowBlur = 0;

      // Subtitle
      const subFs = Math.max(12 * s, 9);
      ctx.font = `italic 300 ${subFs}px Georgia, serif`;
      ctx.fillStyle = 'rgba(200, 190, 220, 0.7)';
      ctx.fillText("It's the boundary, stupid!", cx, cy + titleFs * 0.7);
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <figure>
      <div ref={containerRef}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />
      </div>
      {caption && <figcaption dangerouslySetInnerHTML={{ __html: caption }} />}
    </figure>
  );
};
