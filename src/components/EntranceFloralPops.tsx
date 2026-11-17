import React, {useEffect, useRef} from 'react';

interface FloralBlossom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetScale: number;
  scale: number;
  age: number;
  life: number;
  rotation: number;
  vr: number;
  petalColor: string;
  centerColor: string;
  kind: 'blossom' | 'petal' | 'spark';
}

const FLOWER_PALETTE = [
  {petal: '#FFFDF8', center: '#D4AF6A'}, // Ivory White Rose
  {petal: '#F8EFE2', center: '#C5A46D'}, // Warm Cream Jasmine
  {petal: '#F5DFD7', center: '#C5A46D'}, // Soft Blush Rose
  {petal: '#EBD4A4', center: '#A88952'}, // Champagne Gold Bloom
];

export const EntranceFloralPops: React.FC<{isOpening: boolean}> = ({
  isOpening,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const openingTriggeredRef = useRef(false);
  const burstFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isOpening && !openingTriggeredRef.current) {
      openingTriggeredRef.current = true;
      burstFnRef.current?.();
    } else if (!isOpening) {
      openingTriggeredRef.current = false;
    }
  }, [isOpening]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || 540;
    let height = canvas.parentElement?.clientHeight || 900;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth || 540;
      height = canvas.parentElement.clientHeight || 900;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const items: FloralBlossom[] = [];

    // Continuous gentle petals falling from top rose arch
    const seedDrifters = () => {
      for (let i = 0; i < 14; i++) {
        const swatch = FLOWER_PALETTE[i % FLOWER_PALETTE.length];
        items.push({
          x: width * (0.08 + Math.random() * 0.84),
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: 0.35 + Math.random() * 0.45,
          targetScale: 0.65 + Math.random() * 0.5,
          scale: 0.8,
          age: Math.random() * 4,
          life: 999,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.02,
          petalColor: swatch.petal,
          centerColor: swatch.center,
          kind: 'petal',
        });
      }
    };
    seedDrifters();

    const spawnFloralPop = (
      cx: number,
      cy: number,
      count: number,
      speedScale = 1
    ) => {
      for (let i = 0; i < count; i++) {
        const swatch = FLOWER_PALETTE[i % FLOWER_PALETTE.length];
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const speed = (0.9 + Math.random() * 2.4) * speedScale;
        const kind: FloralBlossom['kind'] =
          i % 4 === 0 ? 'blossom' : i % 3 === 0 ? 'spark' : 'petal';

        items.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          targetScale:
            kind === 'blossom'
              ? 0.85 + Math.random() * 0.45
              : 0.7 + Math.random() * 0.5,
          scale: 0.08,
          age: 0,
          life: 2.6 + Math.random() * 1.6,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.06,
          petalColor: swatch.petal,
          centerColor: swatch.center,
          kind,
        });
      }
    };

    // Grand celebratory burst when the doors open
    burstFnRef.current = () => {
      spawnFloralPop(width * 0.5, height * 0.5, 36, 1.55);
      spawnFloralPop(width * 0.28, height * 0.36, 16, 1.2);
      spawnFloralPop(width * 0.72, height * 0.36, 16, 1.2);
    };

    // Initial subtle pop along top arch corners
    const initTimer = window.setTimeout(() => {
      spawnFloralPop(width * 0.2, height * 0.26, 12, 0.9);
      spawnFloralPop(width * 0.8, height * 0.26, 12, 0.9);
    }, 300);

    // Periodic ambient flower pops along the arch & lanterns
    const anchorSpots: [number, number][] = [
      [0.16, 0.24],
      [0.84, 0.24],
      [0.14, 0.52],
      [0.86, 0.52],
      [0.24, 0.17],
      [0.76, 0.17],
    ];
    let spotIdx = 0;

    const popTimer = window.setInterval(() => {
      if (document.hidden || items.length > 140) return;
      const [rx, ry] = anchorSpots[spotIdx % anchorSpots.length];
      spotIdx += 1;
      spawnFloralPop(width * rx, height * ry, 11, 0.88);
    }, 2200);

    window.addEventListener('resize', resize);

    let rafId = 0;
    let lastTime = performance.now();

    const drawFivePetalFlower = (
      x: number,
      y: number,
      scale: number,
      rot: number,
      petalColor: string,
      centerColor: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(scale, scale);

      // 5 rounded flower petals
      ctx.fillStyle = petalColor;
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.ellipse(0, -6.2, 3.6, 5.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Golden floral stamen center
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = centerColor;
      ctx.fill();

      ctx.restore();
    };

    const tick = (now: number) => {
      const dtSec = Math.min((now - lastTime) / 1000, 0.05);
      const dtFrame = dtSec * 60;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let i = items.length - 1; i >= 0; i--) {
        const f = items[i];
        f.age += dtSec;

        if (f.life < 900) {
          // Popped flower/petal physics
          f.x += f.vx * dtFrame;
          f.y += f.vy * dtFrame;
          f.vy += 0.032 * dtFrame;
          f.vx *= 0.985;
          f.rotation += f.vr * dtFrame;

          // Spring pop-in scale during first 0.25s
          const popProgress = Math.min(f.age / 0.28, 1);
          const overshoot =
            popProgress < 1
              ? Math.sin(popProgress * Math.PI * 0.78) * 1.18
              : 1;
          f.scale = f.targetScale * overshoot;

          const remaining = Math.max(0, 1 - f.age / f.life);
          if (remaining <= 0.02) {
            items.splice(i, 1);
            continue;
          }
          ctx.globalAlpha = Math.min(1, remaining * 1.4) * 0.92;
        } else {
          // Continuous falling drifters
          f.x += (f.vx + Math.sin(now * 0.0012 + i) * 0.28) * dtFrame;
          f.y += f.vy * dtFrame;
          f.rotation += f.vr * dtFrame;
          if (f.y > height + 16) {
            f.y = -14;
            f.x = width * (0.08 + Math.random() * 0.84);
          }
          ctx.globalAlpha = 0.65;
        }

        if (f.kind === 'blossom') {
          drawFivePetalFlower(
            f.x,
            f.y,
            f.scale,
            f.rotation,
            f.petalColor,
            f.centerColor
          );
        } else if (f.kind === 'spark') {
          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate(f.rotation);
          ctx.fillStyle = f.centerColor;
          const r = 4.2 * f.scale;
          ctx.beginPath();
          for (let s = 0; s < 4; s++) {
            const a = (s * Math.PI) / 2;
            ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            ctx.lineTo(
              Math.cos(a + Math.PI / 4) * (r * 0.35),
              Math.sin(a + Math.PI / 4) * (r * 0.35)
            );
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else {
          // Soft curved rose petal
          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate(f.rotation);
          ctx.fillStyle = f.petalColor;
          ctx.beginPath();
          ctx.ellipse(
            0,
            0,
            5.4 * f.scale,
            3.1 * f.scale,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(initTimer);
      window.clearInterval(popTimer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[15]"
    />
  );
};
