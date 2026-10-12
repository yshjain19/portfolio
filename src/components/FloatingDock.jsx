import { useState, useEffect } from 'react';
import { Home, FileText, Layers, MessageSquare, Sun, Moon } from 'lucide-react';
import { PERSONAL } from '../data/config';

export default function FloatingDock({ dark, onToggleTheme }) {
  const [activeSection, setActiveSection] = useState('top');
  const [isRotating, setIsRotating] = useState(false);

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleThemeClick = (e) => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 600);
    onToggleTheme(e);
  };

  return (
    <nav className="floating-dock-container" aria-label="Floating Navigation & Social Links">
      <div className="floating-dock">
        {/* Left cluster: Only GitHub & LinkedIn */}
        <div className="dock-group dock-group--social">
          {/* GitHub */}
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="dock-item"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="dock-item"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>

        {/* Right cluster: Navigation Pill Dock with Theme Toggle */}
        <div className="dock-group dock-group--nav">
          {/* Home */}
          <button
            type="button"
            className={`dock-item dock-item--nav ${activeSection === 'top' ? 'dock-item--active' : ''}`}
            onClick={(e) => handleNavClick(e, 'top')}
            title="Home"
            aria-label="Scroll to top"
          >
            <Home size={16} />
            {activeSection === 'top' && <span className="dock-active-dot" />}
          </button>

          {/* Projects / Notes */}
          <button
            type="button"
            className={`dock-item dock-item--nav ${activeSection === 'projects' ? 'dock-item--active' : ''}`}
            onClick={(e) => handleNavClick(e, 'projects')}
            title="Projects &amp; Work"
            aria-label="Scroll to Projects"
          >
            <FileText size={16} />
            {activeSection === 'projects' && <span className="dock-active-dot" />}
          </button>

          {/* Skills / Stack */}
          <button
            type="button"
            className={`dock-item dock-item--nav ${activeSection === 'skills' ? 'dock-item--active' : ''}`}
            onClick={(e) => handleNavClick(e, 'skills')}
            title="Technical Skills"
            aria-label="Scroll to Skills"
          >
            <Layers size={16} />
            {activeSection === 'skills' && <span className="dock-active-dot" />}
          </button>

          {/* Contact */}
          <button
            type="button"
            className={`dock-item dock-item--nav ${activeSection === 'contact' ? 'dock-item--active' : ''}`}
            onClick={(e) => handleNavClick(e, 'contact')}
            title="Contact &amp; Connect"
            aria-label="Scroll to Contact"
          >
            <MessageSquare size={16} />
            {activeSection === 'contact' && <span className="dock-active-dot" />}
          </button>

          {/* Theme Toggle Sun / Moon */}
          <button
            type="button"
            className={`dock-item dock-item--theme ${isRotating ? 'dock-item--spinning' : ''}`}
            onClick={handleThemeClick}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun size={16} className="dock-theme-icon" /> : <Moon size={16} className="dock-theme-icon" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
