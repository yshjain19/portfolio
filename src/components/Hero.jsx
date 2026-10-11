import { useState, useRef, useEffect } from 'react';
import { GitFork, MapPin, Sparkles } from 'lucide-react';
import { PERSONAL } from '../data/config';

export default function Hero() {
  const avatarWrapRef = useRef(null);
  const avatarRef = useRef(null);
  const imgRef = useRef(null);
  const sheenRef = useRef(null);
  const glowRef = useRef(null);

  // Dynamic physics state tracked via ref for 60-120fps requestAnimationFrame (zero re-render lag)
  const physicsRef = useRef({
    x: 0,
    y: 0,
    rotX: 0,
    rotY: 0,
    scale: 1,
    imgX: 0,
    imgY: 0,
    sheenX: 50,
    sheenY: 50,
    glowX: 0,
    glowY: 0,
    targetX: 0,
    targetY: 0,
    targetRotX: 0,
    targetRotY: 0,
    targetScale: 1,
    targetImgX: 0,
    targetImgY: 0,
    targetSheenX: 50,
    targetSheenY: 50,
    targetGlowX: 0,
    targetGlowY: 0,
    isHovered: false,
    hasActiveMouse: false,
    lastMoveTime: 0,
  });

  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    let animId;
    let startTime = performance.now();

    const handlePointerMove = (e) => {
      // Ignore touch moves if needed or handle gracefully
      if (e.pointerType === 'touch') return;
      if (!avatarRef.current) return;

      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      const state = physicsRef.current;
      state.hasActiveMouse = true;
      state.lastMoveTime = Date.now();

      // Screen normalized factors
      const isNear = dist < 220;
      state.isHovered = isNear;

      if (isNear) {
        // High-precision magnetic tilt when hovering close/over avatar
        state.targetRotY = Math.max(-22, Math.min(22, (dx / 110) * 22));
        state.targetRotX = Math.max(-22, Math.min(22, -(dy / 110) * 22));
        state.targetX = Math.max(-18, Math.min(18, (dx / 110) * 16));
        state.targetY = Math.max(-18, Math.min(18, (dy / 110) * 16));
        state.targetScale = 1.06;
        state.targetImgX = -(state.targetX * 0.45);
        state.targetImgY = -(state.targetY * 0.45);
        state.targetSheenX = Math.max(10, Math.min(90, 50 + (dx / 110) * 40));
        state.targetSheenY = Math.max(10, Math.min(90, 50 + (dy / 110) * 40));
        state.targetGlowX = state.targetX * 1.6;
        state.targetGlowY = state.targetY * 1.6;
      } else {
        // Subtle global screen cursor following (moves and angles towards cursor anywhere on screen)
        const nx = dx / (window.innerWidth / 2);
        const ny = dy / (window.innerHeight / 2);

        state.targetRotY = Math.max(-14, Math.min(14, nx * 14));
        state.targetRotX = Math.max(-14, Math.min(14, -ny * 14));
        state.targetX = Math.max(-16, Math.min(16, nx * 20));
        state.targetY = Math.max(-14, Math.min(14, ny * 16));
        state.targetScale = 1;
        state.targetImgX = -(state.targetX * 0.35);
        state.targetImgY = -(state.targetY * 0.35);
        state.targetSheenX = Math.max(20, Math.min(80, 50 + nx * 25));
        state.targetSheenY = Math.max(20, Math.min(80, 50 + ny * 25));
        state.targetGlowX = state.targetX * 1.2;
        state.targetGlowY = state.targetY * 1.2;
      }
    };

    const handlePointerLeave = () => {
      const state = physicsRef.current;
      state.hasActiveMouse = false;
      state.isHovered = false;
      state.targetX = 0;
      state.targetY = 0;
      state.targetRotX = 0;
      state.targetRotY = 0;
      state.targetScale = 1;
      state.targetImgX = 0;
      state.targetImgY = 0;
      state.targetSheenX = 50;
      state.targetSheenY = 50;
      state.targetGlowX = 0;
      state.targetGlowY = 0;
    };

    // Physics render loop
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = (now) => {
      const state = physicsRef.current;
      const elapsed = (now - startTime) / 1000;
      const idle = !state.hasActiveMouse || Date.now() - state.lastMoveTime > 2500;

      // Ambient floating wave when mouse is idle or absent
      let ambientY = 0;
      let ambientRot = 0;
      if (idle) {
        ambientY = Math.sin(elapsed * 2.2) * 5.5;
        ambientRot = Math.sin(elapsed * 1.4) * 2;
        state.targetX = 0;
        state.targetY = ambientY;
        state.targetRotX = ambientRot;
        state.targetRotY = Math.cos(elapsed * 1.2) * 2;
        state.targetSheenX = 45 + Math.sin(elapsed * 1.5) * 15;
        state.targetSheenY = 40 + Math.cos(elapsed * 1.5) * 15;
        state.targetScale = 1;
      }

      // Smooth interpolation (spring-like ease)
      const smoothFactor = state.isHovered ? 0.14 : 0.09;
      state.x = lerp(state.x, state.targetX, smoothFactor);
      state.y = lerp(state.y, state.targetY, smoothFactor);
      state.rotX = lerp(state.rotX, state.targetRotX, smoothFactor);
      state.rotY = lerp(state.rotY, state.targetRotY, smoothFactor);
      state.scale = lerp(state.scale, state.targetScale, smoothFactor);
      state.imgX = lerp(state.imgX, state.targetImgX, smoothFactor);
      state.imgY = lerp(state.imgY, state.targetImgY, smoothFactor);
      state.sheenX = lerp(state.sheenX, state.targetSheenX, smoothFactor);
      state.sheenY = lerp(state.sheenY, state.targetSheenY, smoothFactor);
      state.glowX = lerp(state.glowX, state.targetGlowX, smoothFactor);
      state.glowY = lerp(state.glowY, state.targetGlowY, smoothFactor);

      // Apply transforms
      if (avatarRef.current) {
        avatarRef.current.style.transform = `perspective(800px) translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 16px) rotateX(${state.rotX.toFixed(2)}deg) rotateY(${state.rotY.toFixed(2)}deg) scale3d(${state.scale.toFixed(3)}, ${state.scale.toFixed(3)}, 1)`;
      }

      if (imgRef.current) {
        imgRef.current.style.transform = `scale(1.08) translate3d(${state.imgX.toFixed(2)}px, ${state.imgY.toFixed(2)}px, 0)`;
      }

      if (sheenRef.current) {
        sheenRef.current.style.background = `radial-gradient(circle at ${state.sheenX.toFixed(1)}% ${state.sheenY.toFixed(1)}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 68%)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${state.glowX.toFixed(2)}px, ${state.glowY.toFixed(2)}px, 0) scale(${state.scale.toFixed(2)})`;
      }

      animId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleAvatarClick = () => {
    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 500);
  };

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="container">
        <div className="hero__top">
          {/* Interactive Avatar with cursor movement, 3D tilt, and parallax depth */}
          <div className="hero__avatar-system" ref={avatarWrapRef}>
            {/* Ambient aura glow */}
            <div className="hero__avatar-glow" ref={glowRef} aria-hidden="true" />

            {/* Pulsing halo ring */}
            <div className="hero__avatar-halo" aria-hidden="true" />

            {/* 3D Moving Avatar Disc */}
            <div
              className={`hero__avatar ${isInteracting ? 'hero__avatar--pulse' : ''}`}
              ref={avatarRef}
              onClick={handleAvatarClick}
              tabIndex={0}
              role="img"
              aria-label={`${PERSONAL.name} portrait with interactive cursor tracking`}
            >
              <img
                ref={imgRef}
                src={PERSONAL.avatar}
                alt={`${PERSONAL.name} — profile picture`}
                width={120}
                height={120}
                loading="eager"
              />
              <div className="hero__avatar-vignette" aria-hidden="true" />
              <div className="hero__avatar-sheen" ref={sheenRef} aria-hidden="true" />
            </div>

            {/* Floating live indicator badge */}
            <div className="hero__avatar-status" title="Active & Open to opportunities">
              <span className="hero__avatar-status-pulse" />
              <span className="hero__avatar-status-dot" />
            </div>
          </div>

          {/* Name & meta */}
          <div className="hero__info">
            <div className="hero__tagline-badge">
              <Sparkles size={13} className="hero__tagline-icon" aria-hidden="true" />
              <span>Full-Stack & Backend Engineer</span>
            </div>

            <h1 className="hero__name">{PERSONAL.name}</h1>
            <p className="hero__role">{PERSONAL.role}</p>

            <div className="hero__meta">
              <span className="hero__handle">{PERSONAL.username}</span>
              <span className="hero__dot">·</span>
              <span className="hero__location">
                <MapPin size={12} aria-hidden="true" />
                {PERSONAL.location}
              </span>
              {PERSONAL.status && (
                <>
                  <span className="hero__dot">·</span>
                  <span className="hero__status">
                    <span className="hero__status-dot" aria-hidden="true" />
                    {PERSONAL.status}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bio paragraphs */}
        <div className="hero__body">
          {PERSONAL.heroBio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hero__actions">
          <button
            className="btn btn--primary"
            onClick={() => scrollTo('#projects')}
            aria-label="Scroll to projects section"
            id="hero-view-projects"
          >
            View Projects
          </button>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            id="hero-github-link"
            aria-label="Open GitHub profile in new tab"
          >
            <GitFork size={14} aria-hidden="true" />
            GitHub
          </a>
          <button
            className="btn"
            onClick={() => scrollTo('#contact')}
            aria-label="Scroll to contact section"
            id="hero-contact"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}
