import { useState, useRef, useCallback } from 'react';
import { GitFork, ExternalLink, MapPin } from 'lucide-react';
import { PERSONAL } from '../data/config';

export default function Hero() {
  const avatarRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease',
  });

  const handleHeroMouseMove = useCallback((e) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const diffX = e.clientX - centerX;
    const diffY = e.clientY - centerY;
    const dist = Math.hypot(diffX, diffY);

    if (dist > 650) {
      setStyle({
        transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
        transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
      });
      return;
    }

    // Normalized factors
    const nx = Math.max(-1.2, Math.min(1.2, diffX / 260));
    const ny = Math.max(-1.2, Math.min(1.2, diffY / 260));

    const rotateY = nx * 18;
    const rotateX = -ny * 18;
    const moveX = nx * 10;
    const moveY = ny * 10;

    setStyle({
      transform: `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 12px)`,
      transition: 'transform 0.08s ease-out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
      transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="hero"
      id="top"
      aria-label="Introduction"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <div className="hero__top">
          {/* Avatar with cursor follow */}
          <div
            className="hero__avatar"
            ref={avatarRef}
            style={style}
            tabIndex={0}
            role="img"
            aria-label={`${PERSONAL.name} portrait with interactive cursor tilt`}
          >
            <img
              src={PERSONAL.avatar}
              alt={`${PERSONAL.name} — profile picture`}
              width={120}
              height={120}
            />
            <div className="hero__avatar-sheen" aria-hidden="true" />
          </div>

          {/* Name & meta */}
          <div className="hero__info">
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
