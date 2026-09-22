"use client";

// Adapted from React Bits PixelSwap-JS-CSS. Keep its grid, ordering and easing;
// use one pair of browser snapshots instead of cloning a complete app per tile.
import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { applyHomeTheme, getHomeTheme } from '@/lib/home-theme';
import './PixelSwap.css';

const MAX_PIXELS = 220;

const PATTERNS = {
  random: () => null,
  center: (x, y) => Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2,
  edges: (x, y) => Math.min(x, 1 - x, y, 1 - y) * 2,
  'left-to-right': x => x,
  'right-to-left': x => 1 - x,
  'top-to-bottom': (_x, y) => y,
  'bottom-to-top': (_x, y) => 1 - y,
  diagonal: (x, y) => (x + y) / 2,
  spiral: (x, y) => {
    const angle = (Math.atan2(y - 0.5, x - 0.5) + Math.PI) / (Math.PI * 2);
    const radius = Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2;
    return (angle + radius) % 1;
  }
};

const EASINGS = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1]
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const noise = seed => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

const makeEasing = value => {
  const match = /cubic-bezier\(([^)]+)\)/.exec(value);
  const points = match ? match[1].split(',').map(Number) : EASINGS[value];
  if (!points || points.length !== 4 || points.some(Number.isNaN)) return makeEasing('ease');

  const [x1, y1, x2, y2] = points;
  if (x1 === y1 && x2 === y2) return progress => progress;

  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  return progress => {
    let t = progress;
    for (let i = 0; i < 5; i += 1) {
      const slope = (3 * ax * t + 2 * bx) * t + cx;
      if (!slope) break;
      t -= (((ax * t + bx) * t + cx) * t - progress) / slope;
    }
    t = clamp(t, 0, 1);
    return ((ay * t + by) * t + cy) * t;
  };
};

const buildGrid = ({ width, height, pixelSize, gap, pattern, randomness }) => {
  let size = pixelSize;
  let columns = Math.max(1, Math.ceil((width + gap) / (size + gap)));
  let rows = Math.max(1, Math.ceil((height + gap) / (size + gap)));

  while (columns * rows > MAX_PIXELS) {
    size = Math.ceil(size * Math.sqrt((columns * rows) / MAX_PIXELS));
    columns = Math.max(1, Math.ceil((width + gap) / (size + gap)));
    rows = Math.max(1, Math.ceil((height + gap) / (size + gap)));
  }

  // Overhang the box so edge pixels stay square instead of being cut short.
  const stride = size + gap;
  const originX = (width - (columns * stride - gap)) / 2;
  const originY = (height - (rows * stride - gap)) / 2;
  const order = PATTERNS[pattern] ?? PATTERNS.random;
  const mix = clamp(randomness, 0, 1);
  const pixels = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column;
      const x = columns <= 1 ? 0.5 : column / (columns - 1);
      const y = rows <= 1 ? 0.5 : row / (rows - 1);
      const base = order(x, y);
      const random = noise(index + 1);

      pixels.push({
        id: index,
        left: originX + column * stride,
        top: originY + row * stride,
        offset: base === null ? random : base * (1 - mix) + random * mix
      });
    }
  }

  return { pixels, size, gap, width, height };
};

export default function PixelSwap({ pixelSize = 64, pixelScale = 0.35, duration = 1400, pixelDuration = 450, pattern = 'random', randomness = 0, fade = true } = {}) {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let desired = null;
    let job = null;
    let disposed = false;
    const easing = makeEasing('cubic-bezier(0.22, 1, 0.36, 1)');

    const cleanupStyles = () => {
      delete root.dataset.pixelSwap;
      root.style.removeProperty('--pixel-swap-mask');
      root.style.removeProperty('--pixel-swap-duration');
    };
    const cancel = () => {
      if (!job) return;
      job.cancelled = true;
      job.tween?.kill();
      job.transition?.skipTransition();
      job.resolve?.();
    };

    const run = async () => {
      const to = desired;
      if (disposed || !to) return;
      if (reduced.matches || !document.startViewTransition || document.hidden) {
        flushSync(() => applyHomeTheme(to));
        desired = null;
        return;
      }
      const current = { cancelled: false, transition: null, tween: null, resolve: null };
      job = current;
      const width = innerWidth;
      const height = innerHeight;
      const grid = buildGrid({ width, height, pixelSize: Math.max(8, pixelSize), gap: 0, pattern, randomness });
      const total = Math.max(200, duration);
      const single = clamp(pixelDuration, 60, total);
      const spread = total - single;
      const drawMask = elapsed => {
        const rects = grid.pixels.map(pixel => {
          const progress = clamp((elapsed - pixel.offset * spread) / single, 0, 1);
          const eased = easing(progress);
          const scale = clamp(pixelScale, 0.05, 1) + (1 - clamp(pixelScale, 0.05, 1)) * eased;
          const size = grid.size * scale + (progress === 1 ? 0.5 : 0);
          const inset = (grid.size - size) / 2;
          const opacity = progress === 0 ? 0 : fade ? Math.min(1, eased * 1.6) : 1;
          return `<rect x="${(pixel.left + inset).toFixed(2)}" y="${(pixel.top + inset).toFixed(2)}" width="${size.toFixed(2)}" height="${size.toFixed(2)}" fill="white" opacity="${opacity.toFixed(3)}"/>`;
        }).join('');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${rects}</svg>`;
        root.style.setProperty('--pixel-swap-mask', `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
      };
      root.dataset.pixelSwap = 'true';
      root.style.setProperty('--pixel-swap-duration', `${total + 300}ms`);
      drawMask(0);
      try {
        current.transition = document.startViewTransition(() => {
          if (disposed) return;
          flushSync(() => applyHomeTheme(to));
        });
        await current.transition.ready;
        if (!current.cancelled && !disposed) {
          await new Promise(resolve => {
            current.resolve = resolve;
            const clock = { elapsed: 0 };
            current.tween = gsap.to(clock, {
              elapsed: total, duration: total / 1000, ease: 'none',
              onUpdate: () => drawMask(clock.elapsed), onComplete: resolve,
            });
          });
        }
      } catch {
        // A synchronous API failure must never prevent changing the theme.
        if (!current.transition && !disposed) flushSync(() => applyHomeTheme(to));
      } finally {
        current.tween?.kill();
        current.transition?.skipTransition();
        await current.transition?.finished.catch(() => {});
        if (!disposed) cleanupStyles();
        job = null;
        if (!disposed && desired && desired !== getHomeTheme()) void run();
        else desired = null;
      }
    };

    const request = event => {
      event.preventDefault();
      desired = (desired ?? getHomeTheme()) === 'dark' ? 'light' : 'dark';
      if (job) cancel();
      else void run();
    };
    const motionChange = () => { if (reduced.matches) cancel(); };
    const visibilityChange = () => { if (document.hidden) cancel(); };
    window.addEventListener('theme-swap-request', request);
    window.addEventListener('resize', cancel);
    window.addEventListener('scroll', cancel, { passive: true });
    reduced.addEventListener('change', motionChange);
    document.addEventListener('visibilitychange', visibilityChange);
    return () => {
      disposed = true;
      cancel();
      cleanupStyles();
      window.removeEventListener('theme-swap-request', request);
      window.removeEventListener('resize', cancel);
      window.removeEventListener('scroll', cancel);
      reduced.removeEventListener('change', motionChange);
      document.removeEventListener('visibilitychange', visibilityChange);
    };
  }, [pathname, pixelSize, pixelScale, duration, pixelDuration, pattern, randomness, fade]);

  return null;
}
