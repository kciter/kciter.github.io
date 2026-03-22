import React, { useRef, useEffect } from 'react';

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string,
  stroke: string,
  lineWidth = 1.5
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

// Smoothstep for easing transitions
function smoothstep(t: number): number {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
}

// Lerp
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  bgColor: string;
  label: string;
}

// Phase definitions:
// 0: Monolith (1 box)
// 1: Three services (3 boxes)
// 2: Two services (2 boxes)
// 3: Monolith again (1 box)

const PHASE_DURATIONS = [2, 1.5, 1.2, 0.8]; // seconds per phase (모놀리스, 분리, 부분통합, 재통합)
const TRANSITION_DURATION = 1; // seconds for transition
const TOTAL_CYCLE = PHASE_DURATIONS.reduce((a, b) => a + b, 0) + 4 * TRANSITION_DURATION;

const COLORS = {
  blue: { fill: '#e7f5ff', stroke: '#228be6' },
  yellow: { fill: '#fff9db', stroke: '#fab005' },
  green: { fill: '#ebfbee', stroke: '#40c057' },
  mono: { fill: '#f8f9fa', stroke: '#adb5bd' }
};

interface Props {
  caption?: string;
}

export const BoundaryEvolutionDiagram = ({ caption }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let raf: number;

    const animate = (time: number) => {
      const w = container.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      const s = w / 560;

      const boxH = 50 * s;
      const h = 120 * s;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const elapsed = (time / 1000) % TOTAL_CYCLE;

      const labelFs = Math.max(11 * s, 9);
      const titleFs = Math.max(10 * s, 8);

      const cx = w / 2;
      const cy = h / 2;
      const pad = 24 * s;
      const innerW = w - pad * 2;
      const gap = 10 * s;

      // Calculate phase and transition
      let phase = 0;
      let transProgress = 0;
      let acc = 0;

      for (let i = 0; i < 4; i++) {
        const segLen = PHASE_DURATIONS[i] + TRANSITION_DURATION;
        if (elapsed < acc + segLen) {
          const segElapsed = elapsed - acc;
          if (segElapsed < PHASE_DURATIONS[i]) {
            phase = i;
            transProgress = 0;
          } else {
            phase = i;
            transProgress = smoothstep((segElapsed - PHASE_DURATIONS[i]) / TRANSITION_DURATION);
          }
          break;
        }
        acc += segLen;
      }

      const fromPhase = phase % 4;
      const toPhase = (phase + 1) % 4;

      // Get boxes for a given phase
      function getBoxes(p: number): Box[] {
        switch (p) {
          case 0: // Monolith
            return [
              {
                x: pad,
                y: cy - boxH / 2,
                w: innerW,
                h: boxH,
                color: COLORS.mono.stroke,
                bgColor: COLORS.mono.fill,
                label: '모놀리스'
              }
            ];
          case 1: { // Three services
            const bw = (innerW - gap * 2) / 3;
            return [
              {
                x: pad,
                y: cy - boxH / 2,
                w: bw,
                h: boxH,
                color: COLORS.blue.stroke,
                bgColor: COLORS.blue.fill,
                label: '서비스 A'
              },
              {
                x: pad + bw + gap,
                y: cy - boxH / 2,
                w: bw,
                h: boxH,
                color: COLORS.yellow.stroke,
                bgColor: COLORS.yellow.fill,
                label: '서비스 B'
              },
              {
                x: pad + (bw + gap) * 2,
                y: cy - boxH / 2,
                w: bw,
                h: boxH,
                color: COLORS.green.stroke,
                bgColor: COLORS.green.fill,
                label: '서비스 C'
              }
            ];
          }
          case 2: { // Two services
            const bw = (innerW - gap) / 2;
            return [
              {
                x: pad,
                y: cy - boxH / 2,
                w: bw,
                h: boxH,
                color: COLORS.blue.stroke,
                bgColor: COLORS.blue.fill,
                label: '서비스 A'
              },
              {
                x: pad + bw + gap,
                y: cy - boxH / 2,
                w: bw,
                h: boxH,
                color: COLORS.yellow.stroke,
                bgColor: COLORS.yellow.fill,
                label: '서비스 B+C'
              }
            ];
          }
          case 3: // Monolith again
            return [
              {
                x: pad,
                y: cy - boxH / 2,
                w: innerW,
                h: boxH,
                color: COLORS.mono.stroke,
                bgColor: COLORS.mono.fill,
                label: '모놀리스'
              }
            ];
          default:
            return [];
        }
      }

      const fromBoxes = getBoxes(fromPhase);
      const toBoxes = getBoxes(toPhase);

      // Interpolate: draw the max of from/to boxes, interpolating positions
      const maxLen = Math.max(fromBoxes.length, toBoxes.length);

      for (let i = 0; i < maxLen; i++) {
        // For transition, we map boxes:
        // When going from fewer to more, new boxes "split" from existing ones
        // When going from more to fewer, boxes "merge"

        let fromBox: Box;
        let toBox: Box;

        if (fromBoxes.length <= toBoxes.length) {
          // Splitting: map from-box to multiple to-boxes
          toBox = toBoxes[i];
          fromBox = fromBoxes[Math.min(i, fromBoxes.length - 1)];
        } else {
          // Merging: map multiple from-boxes to one to-box
          fromBox = fromBoxes[i];
          toBox = toBoxes[Math.min(i, toBoxes.length - 1)];
        }

        const t = transProgress;
        const bx = lerp(fromBox.x, toBox.x, t);
        const by = lerp(fromBox.y, toBox.y, t);
        const bw = lerp(fromBox.w, toBox.w, t);
        const bh = lerp(fromBox.h, toBox.h, t);

        // Color interpolation: use "to" color when past halfway
        const useColor = t > 0.5 ? toBox : fromBox;

        drawRoundRect(ctx, bx, by, bw, bh, 10 * s, useColor.bgColor, useColor.color, 1.5 * s);

        // Label
        const label = t > 0.5 ? toBox.label : fromBox.label;
        ctx.fillStyle = useColor.color;
        ctx.font = `600 ${labelFs}px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, bx + bw / 2, by + bh / 2);
      }

      // Draw boundary lines between boxes (dashed) when there are multiple
      const currentBoxCount = transProgress > 0.5 ? toBoxes.length : fromBoxes.length;
      if (currentBoxCount > 1 && transProgress !== 0) {
        // During transition, draw fading boundary lines
        const boxes = transProgress > 0.5 ? toBoxes : fromBoxes;
        const alpha =
          transProgress > 0.5
            ? smoothstep((transProgress - 0.5) * 2)
            : smoothstep(1 - transProgress * 2);

        ctx.save();
        ctx.globalAlpha = alpha * 0.4;
        ctx.strokeStyle = '#fa5252';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        for (let i = 0; i < boxes.length - 1; i++) {
          const rightEdge = boxes[i].x + boxes[i].w;
          const leftEdge = boxes[i + 1].x;
          const lineX = (rightEdge + leftEdge) / 2;
          ctx.beginPath();
          ctx.moveTo(lineX, cy - boxH / 2 - 6 * s);
          ctx.lineTo(lineX, cy + boxH / 2 + 6 * s);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
        ctx.restore();
      } else if (transProgress === 0 && fromBoxes.length > 1) {
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = '#fa5252';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        for (let i = 0; i < fromBoxes.length - 1; i++) {
          const rightEdge = fromBoxes[i].x + fromBoxes[i].w;
          const leftEdge = fromBoxes[i + 1].x;
          const lineX = (rightEdge + leftEdge) / 2;
          ctx.beginPath();
          ctx.moveTo(lineX, cy - boxH / 2 - 6 * s);
          ctx.lineTo(lineX, cy + boxH / 2 + 6 * s);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // Phase label at top
      let phaseLabel = '';
      const displayPhase = transProgress > 0.5 ? toPhase : fromPhase;
      switch (displayPhase) {
        case 0:
          phaseLabel = '모놀리스';
          break;
        case 1:
          phaseLabel = '서비스 분리';
          break;
        case 2:
          phaseLabel = '부분 통합';
          break;
        case 3:
          phaseLabel = '재통합';
          break;
      }

      ctx.fillStyle = '#868e96';
      ctx.font = `${titleFs}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(phaseLabel, cx, 6 * s);

      raf = requestAnimationFrame(animate);
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
