import { useState, useRef, useEffect } from 'react';
import { PERSONAL } from '../data/config';
import TechPill from './TechPill';
import Hero3DCanvas from './Hero3DCanvas';

// Birthday reference for Yash (born November 19, 2006)
const BIRTH_DATE = new Date('2006-11-19T00:00:00Z').getTime();

export default function Hero() {
  const slotRef = useRef(null);
  const avatarRef = useRef(null);

  // Live real-time fractional age ticking precisely
  const [age, setAge] = useState(() => {
    const ageYears = (Date.now() - BIRTH_DATE) / (1000 * 60 * 60 * 24 * 365.2425);
    return ageYears.toFixed(9);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const ageYears = (Date.now() - BIRTH_DATE) / (1000 * 60 * 60 * 24 * 365.2425);
      setAge(ageYears.toFixed(9));
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Physics state for cursor-following & sticking to anchor position
  const physicsRef = useRef({
    currX: 0,
    currY: 0,
    targetX: 0,
    targetY: 0,
    currScale: 1,
    targetScale: 1,
    currTiltX: 0,
    currTiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    isStuck: true,
  });

  const [isStuckState, setIsStuckState] = useState(true);

  useEffect(() => {
    let animId;
    const lerp = (a, b, t) => a + (b - a) * t;

    const handlePointerMove = (e) => {
      // Touch or narrow mobile screens stay parked at home slot
      if (e.pointerType === 'touch' || window.innerWidth < 768) {
        const p = physicsRef.current;
        p.isStuck = true;
        p.targetX = 0;
        p.targetY = 0;
        p.targetScale = 1;
        p.targetTiltX = 0;
        p.targetTiltY = 0;
        setIsStuckState(true);
        return;
      }

      // Check if mouse is hovering over clickable controls or navigation
      const targetEl = document.elementFromPoint(e.clientX, e.clientY);
      const isOverInteractive = !!targetEl?.closest(
        'a, button, [role="button"], input, textarea, .floating-dock, .dock-item, .dock-group, .theme-btn, .project-card, .footer__link, .sitemap-link-btn'
      );

      // If user has scrolled past hero section, park cleanly in slot
      const isScrolledPast = window.scrollY > 380;
      const shouldStick = isOverInteractive || isScrolledPast;

      const p = physicsRef.current;
      p.isStuck = shouldStick;
      setIsStuckState(shouldStick);

      if (shouldStick) {
        p.targetX = 0;
        p.targetY = 0;
        p.targetScale = 1;
        p.targetTiltX = 0;
        p.targetTiltY = 0;
      } else if (slotRef.current) {
        // Calculate relative offset from home slot center to mouse cursor
        const rect = slotRef.current.getBoundingClientRect();
        const slotCenterX = rect.left + rect.width / 2;
        const slotCenterY = rect.top + rect.height / 2;

        p.targetX = e.clientX - slotCenterX;
        p.targetY = e.clientY - slotCenterY;
        p.targetScale = 0.94;
        p.targetTiltY = Math.max(-14, Math.min(14, (e.movementX || 0) * 1.5));
        p.targetTiltX = Math.max(-14, Math.min(14, -(e.movementY || 0) * 1.5));
      }
    };

    const handlePointerLeave = () => {
      const p = physicsRef.current;
      p.isStuck = true;
      p.targetX = 0;
      p.targetY = 0;
      p.targetScale = 1;
      p.targetTiltX = 0;
      p.targetTiltY = 0;
      setIsStuckState(true);
    };

    const handleScroll = () => {
      if (window.scrollY > 380) {
        const p = physicsRef.current;
        p.isStuck = true;
        p.targetX = 0;
        p.targetY = 0;
        p.targetScale = 1;
        p.targetTiltX = 0;
        p.targetTiltY = 0;
        setIsStuckState(true);
      }
    };

    const tick = () => {
      const p = physicsRef.current;
      const smoothFactor = p.isStuck ? 0.16 : 0.11;
      p.currX = lerp(p.currX, p.targetX, smoothFactor);
      p.currY = lerp(p.currY, p.targetY, smoothFactor);
      p.currScale = lerp(p.currScale, p.targetScale, 0.14);
      p.currTiltX = lerp(p.currTiltX, p.targetTiltX, 0.12);
      p.currTiltY = lerp(p.currTiltY, p.targetTiltY, 0.12);

      // Decay tilt inertia toward 0 when cursor pauses
      p.targetTiltX *= 0.88;
      p.targetTiltY *= 0.88;

      if (avatarRef.current) {
        avatarRef.current.style.transform = `translate3d(${p.currX.toFixed(2)}px, ${p.currY.toFixed(2)}px, 0) scale(${p.currScale.toFixed(3)}) rotateX(${p.currTiltX.toFixed(2)}deg) rotateY(${p.currTiltY.toFixed(2)}deg)`;
      }

      animId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      className="hero-signature"
      id="top"
      aria-label="Introduction to Yash Jain"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Target for #about links so they smoothly land here */}
      <div id="about" style={{ position: 'absolute', top: 0 }} />

      {/* Subtle 3D background constellation */}
      <Hero3DCanvas />

      <div className="container">
        {/* Top Header Section */}
        <div className="hero-signature__top-block">
          <h1 className="hero-signature__name">
            Hi, I'm <span className="hero-signature__name-bold" itemProp="name">YASH JAIN</span> <span className="hero-signature__college-tag" title="Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV)">SVVV</span>
            <span className="sr-only"> — Official Portfolio &amp; Full-Stack Developer Yash Jain</span>
          </h1>
          <p className="hero-signature__tagline" itemProp="jobTitle">
            Full stack developer from India.
          </p>
          <div className="hero-signature__status-row">
            <span className="hero-signature__handle" itemProp="alternateName">{PERSONAL.username}</span>
            <span className="hero-signature__dot">·</span>
            <span className="hero-signature__status-text">
              open for freelance work
            </span>
          </div>
        </div>

        {/* Bio Content Row with Avatar Slot on Right */}
        <div className="hero-signature__bio-row">
          <div className="hero-signature__content" itemProp="description">
            <p className="hero-signature__para">
              I'm a <span className="hero-age-ticker">{age}</span> year old full stack developer from India. I enjoy programming, building products, and exploring technology.
            </p>

            <p className="hero-signature__para">
              I build things with <TechPill name="JavaScript" type="js" /> <TechPill name="Node.js" type="node" /> <TechPill name="Express.js" type="express" /> <TechPill name="MongoDB" type="mongo" /> <TechPill name="React" type="react" /> <TechPill name="HTML" type="html" /> <TechPill name="CSS" type="css" /> <TechPill name="Bootstrap" type="bootstrap" /> and <TechPill name="REST APIs" type="api" />, along with other tools and technologies. I also occasionally write <a href="#projects" className="hero-text-link">blogs</a>.
            </p>

            <p className="hero-signature__para">
              I'm currently building full stack projects like <a href="https://svvv-notes.onrender.com/" target="_blank" rel="noopener noreferrer" className="hero-text-link">SVVV Notes</a> and <a href="https://prestigestay.onrender.com/" target="_blank" rel="noopener noreferrer" className="hero-text-link">PrestigeStay</a>, exploring AI and developer tooling, and improving my problem-solving skills through DSA. I like building things that are fast, accessible, and well crafted.
            </p>
          </div>

          {/* Right Column: Home Slot with Avatar Disc */}
          <div className="hero-signature__avatar-slot" ref={slotRef}>
            <div
              ref={avatarRef}
              className={`hero-signature__avatar-disc ${isStuckState ? 'is-stuck' : 'is-following'}`}
              aria-label={`${PERSONAL.name} portrait`}
            >
              <img
                src={PERSONAL.avatar}
                alt="Yash Jain — Full-Stack Developer & Backend Engineer"
                width={124}
                height={124}
                className="hero-signature__avatar-img"
                loading="eager"
                itemProp="image"
              />
              <div className="hero-signature__avatar-glow" aria-hidden="true" />
              <div className="hero-signature__avatar-border" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
