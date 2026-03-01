---
name: create-material
description: 블로그 글에서 개념 설명용으로 사용하는 인터랙티브 다이어그램/데모 Canvas 컴포넌트를 생성합니다. 사용자가 설명 이미지, 다이어그램, 데모 컴포넌트를 만들어달라고 할 때 사용합니다.
argument-hint: "[컴포넌트 설명]"
---

# 블로그 설명 이미지 컴포넌트(Material) 생성

블로그 글에서 개념 설명용으로 사용하는 인터랙티브 다이어그램/데모 컴포넌트를 생성합니다.

## 사용자 입력

$ARGUMENTS

## 작업 흐름

1. 사용자가 설명한 개념/다이어그램을 분석합니다.
2. **컴포넌트 옵션을 사용자에게 질문합니다.** AskUserQuestion 도구를 사용하여 다음을 한 번에 확인하세요:
   - **애니메이션**: 정적 다이어그램 / 반복 애니메이션 / 한 번 재생 / 인터랙티브(마우스 등)
   - **테두리**: 컴포넌트 외곽에 테두리(`border: 1px solid #dee2e6`, borderRadius: 8, padding: 20, background: #fff)를 감쌀지 여부. 보통 인터랙티브 Demo에는 테두리가 있고, 정적 Diagram에는 없음.
   - **캡션(caption)**: `<figure>` + `<figcaption>`으로 하단 캡션을 표시할지 여부. 보통 정적 Diagram에는 caption이 있고, 인터랙티브 Demo에는 없음.
3. 해당하는 블로그 글의 materials 디렉토리에 컴포넌트를 생성합니다.
4. index.ts 배럴 파일에 export를 추가합니다.

## 컴포넌트 작성 규칙

### 파일 위치
- `src/materials/<글-슬러그>/ComponentName.tsx`
- 배럴 export: `src/materials/<글-슬러그>/index.ts`

### 기본 구조 — 정적 다이어그램 (Canvas 기반)

```tsx
import React, { useRef, useEffect } from 'react';

const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

// 필요한 경우 헬퍼 함수 정의
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: number, fill: string, stroke: string, lineWidth = 1.5,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

interface Props {
  caption?: string;
}

// Horizontal layout (desktop)
function drawHorizontal(ctx: CanvasRenderingContext2D, w: number): number {
  const s = w / 640; // 기준 너비 대비 스케일
  const h = 280 * s; // 높이도 스케일에 맞춤

  // 폰트 크기는 최소값 보장
  const titleFs = Math.max(13 * s, 11);
  const labelFs = Math.max(11 * s, 10);

  // 그리기 로직...

  return h; // 실제 그린 높이 반환
}

// Vertical layout (mobile)
function drawVertical(ctx: CanvasRenderingContext2D, w: number): number {
  // 세로 배치 레이아웃
  // ...
  return totalHeight;
}

export const ComponentName = ({ caption }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const draw = () => {
      const w = container.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      const isMobile = w < 480;

      const ctx = canvas.getContext('2d')!;

      // 높이 계산
      const h = isMobile ? drawVertical(ctx, w) : drawHorizontal(ctx, w);

      // 실제로는 높이를 먼저 계산하고 캔버스 설정 후 그려야 함
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      if (isMobile) {
        drawVertical(ctx, w);
      } else {
        drawHorizontal(ctx, w);
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // caption이 있는 경우 (Diagram 타입)
  return (
    <figure>
      <div ref={containerRef}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />
      </div>
      {caption && <figcaption dangerouslySetInnerHTML={{ __html: caption }} />}
    </figure>
  );

  // 테두리가 있는 경우 (Demo 타입)
  return (
    <div style={{ border: '1px solid #dee2e6', borderRadius: 8, padding: 20, margin: '24px 0', background: '#fff' }}>
      <div ref={containerRef}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />
      </div>
      {/* 필요시 하단 설명 텍스트 */}
      <div style={{ fontSize: 11, color: '#adb5bd', textAlign: 'center', marginTop: 10 }}>
        설명 텍스트
      </div>
    </div>
  );
};
```

### 애니메이션이 있는 경우

정적 다이어그램 구조에서 다음을 변경합니다:

```tsx
useEffect(() => {
  const container = containerRef.current;
  const canvas = canvasRef.current;
  if (!container || !canvas) return;

  let raf: number;

  const animate = (time: number) => {
    const w = container.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    const s = w / 540;
    const h = /* 높이 계산 */;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    // time(ms) 기반 애니메이션 계산
    // 예: const angle = Math.sin(time * 0.0015) * 0.14;

    // 그리기 로직...

    raf = requestAnimationFrame(animate);
  };

  raf = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(raf);
}, []);
```

### 반복 애니메이션 (시간 기반)

```tsx
const DURATION = 2;   // 애니메이션 지속 시간(초)
const PAUSE = 1;      // 정지 시간(초)
const CYCLE = DURATION + PAUSE;

// animate 루프 내:
const elapsed = (now - start) / 1000;
const cycleT = elapsed % CYCLE;
const p = Math.min(cycleT / DURATION, 1);
// 이징 함수 적용: const eased = 1 - Math.pow(1 - p, 3);
```

### 인터랙티브 컴포넌트 (마우스/터치)

- DOM 요소에 직접 스타일 적용하는 방식
- `useRef`로 target/current 상태 관리
- `requestAnimationFrame`으로 lerp 보간: `current += (target - current) * LERP_FACTOR`
- `mousemove`, `mouseleave` 이벤트 리스너
- 클린업에서 이벤트 리스너와 `cancelAnimationFrame` 모두 정리

```tsx
const targetRef = useRef({ x: 0, y: 0 });
const currentRef = useRef({ x: 0, y: 0 });
const animRef = useRef<number>(0);

// animate 루프:
cur.x += (tgt.x - cur.x) * LERP_FACTOR;
cur.y += (tgt.y - cur.y) * LERP_FACTOR;
element.style.transform = `...`;
```

## 필수 준수 사항

### 컬러 팔레트
- Primary: `#228be6` (파랑)
- Red: `#fa5252`, Yellow: `#fab005`, Green: `#40c057`, Purple: `#845ef7`
- 배경: `#f8f9fa`, 테두리: `#dee2e6`, `#adb5bd`
- 텍스트: `#495057` (기본), `#868e96` (보조), `#adb5bd` (약한 보조)
- 강조 배경: `#e7f5ff` (파랑), `#fff5f5` (빨강), `#fff9db` (노랑)

### 반응형
- 모바일 기준: `w < 480`
- 데스크톱 기준 너비: 540~640px
- 스케일 팩터: `s = w / baseWidth`
- 폰트 크기 최소값 보장: `Math.max(size * s, minSize)`
- 모바일에서는 수평→수직 레이아웃 전환

### 기술 규칙
- **외부 라이브러리 사용 금지** — Canvas 2D API와 기본 DOM만 사용
- DPR(devicePixelRatio) 대응 필수
- `ResizeObserver`로 반응형 리사이징
- 폰트: `-apple-system, BlinkMacSystemFont, sans-serif`
- 한국어 텍스트 사용 (블로그가 한국어)
- 컴포넌트명은 PascalCase, 접미사로 Diagram(정적) 또는 Demo(인터랙티브/애니메이션) 사용
- 파일 하나에 컴포넌트 하나
- `export const`로 named export
- Props는 사용자가 caption을 선택한 경우 `{ caption?: string }`, 아닌 경우 props 없이 생성. 필요시 확장

### 캔버스 그리기 팁
- `ctx.roundRect()`로 둥근 사각형
- 화살표는 직접 삼각형으로 그리기
- 텍스트: `ctx.textAlign`, `ctx.textBaseline` 설정 후 `ctx.fillText()`
- 점선: `ctx.setLineDash([4, 4])` → 사용 후 `ctx.setLineDash([])`로 복원
- 투명도: `ctx.globalAlpha` → 사용 후 1로 복원
- 베지어 곡선: `ctx.bezierCurveTo()`
- 노드(원): `ctx.arc()` + fill + 흰색 stroke

## 예시: MDX에서 사용

```mdx
import { ComponentName } from '@materials/post-slug';

<ComponentName caption="설명 텍스트" />
```
