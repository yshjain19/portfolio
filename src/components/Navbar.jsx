import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { PERSONAL } from '../data/config';
import { isSoundEnabled, toggleSound } from '../utils/sound';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'GitHub', href: '#github' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ dark, onToggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="navbar" role="banner">
      <div className="container">
        <div className="navbar__inner">
          {/* Brand */}
          <a href="#top" className="navbar__brand" aria-label="Yash Jain — home">
            Yash Jain
            <span className="navbar__username">{PERSONAL.username}</span>
          </a>

          {/* Desktop nav */}
          <nav className="navbar__nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="navbar__right">
            <button
              className="theme-btn"
              onClick={() => {
                const newState = toggleSound();
                setSoundOn(newState);
              }}
              aria-label={soundOn ? 'Mute sound effects' : 'Unmute sound effects'}
              title={soundOn ? 'Sound effects enabled' : 'Sound effects muted'}
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
            <button
              className="theme-btn"
              onClick={onToggleDark}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="navbar__mobile-menu" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
