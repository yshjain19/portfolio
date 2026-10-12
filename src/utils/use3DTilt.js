import { useEffect, useRef } from 'react';

/**
 * High-performance 3D Card Tilt with specular glare tracking and spring-back physics.
 * Directly updates CSS custom properties via requestAnimationFrame for zero React re-renders.
 */
export function use3DTilt({
  maxTilt = 10,
  perspective = 900,
  scale = 1.02,
  speed = 0.12,
  glare = true,
  disabled = false,
} = {}) {
  const cardRef = useRef(null);
  const physicsRef = useRef({
    rx: 0,
    ry: 0,
    s: 1,
    gx: 50,
    gy: 50,
    go: 0,
    targetRx: 0,
    targetRy: 0,
    targetS: 1,
    targetGx: 50,
    targetGy: 50,
    targetGo: 0,
    isHovered: false,
  });

  useEffect(() => {
    const el = cardRef.current;
    if (!el || disabled) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animId;
    const lerp = (a, b, t) => a + (b - a) * t;

    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        handlePointerLeave();
        return;
      }

      const p = physicsRef.current;
      p.isHovered = true;

      // Normalized coordinates from -1 to 1
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      p.targetRy = normX * maxTilt;
      p.targetRx = -normY * maxTilt;
      p.targetS = scale;

      if (glare) {
        p.targetGx = (x / rect.width) * 100;
        p.targetGy = (y / rect.height) * 100;
        p.targetGo = 0.65;
      }
    };

    const handlePointerLeave = () => {
      const p = physicsRef.current;
      p.isHovered = false;
      p.targetRx = 0;
      p.targetRy = 0;
      p.targetS = 1;
      p.targetGo = 0;
    };

    const tick = () => {
      const p = physicsRef.current;
      p.rx = lerp(p.rx, p.targetRx, speed);
      p.ry = lerp(p.ry, p.targetRy, speed);
      p.s = lerp(p.s, p.targetS, speed);
      p.gx = lerp(p.gx, p.targetGx, speed);
      p.gy = lerp(p.gy, p.targetGy, speed);
      p.go = lerp(p.go, p.targetGo, speed);

      el.style.setProperty('--tilt-rx', `${p.rx.toFixed(2)}deg`);
      el.style.setProperty('--tilt-ry', `${p.ry.toFixed(2)}deg`);
      el.style.setProperty('--tilt-scale', p.s.toFixed(3));
      el.style.setProperty('--glare-x', `${p.gx.toFixed(1)}%`);
      el.style.setProperty('--glare-y', `${p.gy.toFixed(1)}%`);
      el.style.setProperty('--glare-opacity', p.go.toFixed(2));
      el.style.setProperty('--perspective', `${perspective}px`);

      animId = requestAnimationFrame(tick);
    };

    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave);
    el.addEventListener('pointercancel', handlePointerLeave);
    animId = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      el.removeEventListener('pointercancel', handlePointerLeave);
      cancelAnimationFrame(animId);
      el.style.removeProperty('--tilt-rx');
      el.style.removeProperty('--tilt-ry');
      el.style.removeProperty('--tilt-scale');
      el.style.removeProperty('--glare-x');
      el.style.removeProperty('--glare-y');
      el.style.removeProperty('--glare-opacity');
      el.style.removeProperty('--perspective');
    };
  }, [maxTilt, perspective, scale, speed, glare, disabled]);

  return cardRef;
}
