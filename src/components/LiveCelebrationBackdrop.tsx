import React, {useEffect, useRef} from 'react';

interface AmbientMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  kind: 'mote' | 'petal';
  color: string;
  rotation: number;
  vr: number;
}

interface PopParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  gravity: number;
  color: string;
  shape: 'star' | 'ribbon' | 'spark';
  rotation: number;
  vr: number;
}

const ROYAL_COLORS = [
  '#C5A46D', // Champagne Gold
  '#E6C98F', // Soft Gold
  '#A88952', // Antique Gold
  '#E5C7BA', // Blush Rose
  '#92957B', // Sage Leaf
  '#FFFDF8', // Floral White
];

export const LiveCelebrationBackdrop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Ambient floating golden motes and blush/ivory rose petals
    const ambientCount = width < 640 ? 28 : 46;
    const ambients: AmbientMote[] = Array.from(
      {length: ambientCount},
      (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: i % 3 === 0 ? -(0.18 + Math.random() * 0.25) : 0.22 + Math.random() * 0.35,
        size: i % 3 === 0 ? 1.8 + Math.random() * 2.2 : 4 + Math.random() * 4.5,
        alpha: 0.25 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        kind: i % 3 === 0 ? 'mote' : 'petal',
        color: ROYAL_COLORS[i % ROYAL_COLORS.length],
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.018,
      })
    );

    const pops: PopParticle[] = [];

    const spawnPartyPop = (originX?: number, originY?: number) => {
      // Favor left/right margins on wider screens, or gentle upper/mid corners on mobile
      const side = Math.random() < 0.5 ? 'left' : 'right';
      const cx =
        originX ??
        (width > 768
          ? side === 'left'
            ? width * (0.06 + Math.random() * 0.14)
            : width * (0.8 + Math.random() * 0.14)
          : width * (0.14 + Math.random() * 0.72));
      const cy = originY ?? height * (0.22 + Math.random() * 0.55);

      const count = width < 640 ? 18 : 26;
      const shapes: PopParticle['shape'][] = ['star', 'ribbon', 'spark'];

      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.45;
        const speed = 1.8 + Math.random() * 4.2;
        pops.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          size: 3 + Math.random() * 4.5,
          alpha: 0.92,
          decay: 0.0085 + Math.random() * 0.006,
          gravity: 0.055 + Math.random() * 0.025,
          color: ROYAL_COLORS[i % ROYAL_COLORS.length],
          shape: shapes[i % shapes.length],
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.12,
        });
      }
    };

    // Initial celebratory welcome pop shortly after mount
    const initPopTimer = window.setTimeout(() => {
      spawnPartyPop(width * 0.16, height * 0.34);
      spawnPartyPop(width * 0.84, height * 0.34);
    }, 350);

    // Periodic live party pops in the background
    const periodicTimer = window.setInterval(() => {
      if (!document.hidden && pops.length < 160) {
        spawnPartyPop();
      }
    }, 3600);

    const onCustomPop = (ev: Event) => {
      const detail = (ev as CustomEvent<{x?: number; y?: number}>).detail;
      spawnPartyPop(detail?.x, detail?.y);
      if (!detail?.x) {
        spawnPartyPop();
      }
    };
    window.addEventListener('royal-party-pop', onCustomPop);
    window.addEventListener('resize', resize);

    let rafId = 0;
    let lastTime = performance.now();

    const drawStar = (x: number, y: number, r: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        ctx.lineTo(
          Math.cos(a + Math.PI / 4) * (r * 0.36),
          Math.sin(a + Math.PI / 4) * (r * 0.36)
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.5);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      const t = now * 0.001;

      // 1. Ambient drifting motes & petals
      for (let i = 0; i < ambients.length; i++) {
        const m = ambients[i];
        m.x += (m.vx + Math.sin(t * 0.9 + m.phase) * 0.22) * dt;
        m.y += m.vy * dt;
        m.rotation += m.vr * dt;

        if (m.y < -16) m.y = height + 14;
        if (m.y > height + 16) m.y = -14;
        if (m.x < -16) m.x = width + 14;
        if (m.x > width + 16) m.x = -14;

        const pulse =
          m.kind === 'mote'
            ? m.alpha * (0.6 + 0.4 * Math.sin(t * 2.2 + m.phase))
            : m.alpha;

        ctx.globalAlpha = pulse;
        ctx.fillStyle = m.color;

        if (m.kind === 'mote') {
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.save();
          ctx.translate(m.x, m.y);
          ctx.rotate(m.rotation);
          ctx.beginPath();
          ctx.ellipse(0, 0, m.size, m.size * 0.52, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 2. Live party-pop bursts
      for (let i = pops.length - 1; i >= 0; i--) {
        const p = pops[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += p.gravity * dt;
        p.vx *= 0.985;
        p.rotation += p.vr * dt;
        p.alpha -= p.decay * dt;

        if (p.alpha <= 0.01) {
          pops.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.shape === 'star') {
          drawStar(p.x, p.y, p.size * 1.15, p.rotation);
        } else if (p.shape === 'ribbon') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillRect(-p.size, -p.size * 0.28, p.size * 2, p.size * 0.56);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(initPopTimer);
      window.clearInterval(periodicTimer);
      window.removeEventListener('royal-party-pop', onCustomPop);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};
