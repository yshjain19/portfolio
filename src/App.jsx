import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Impact from './components/Impact';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import GitHubActivity from './components/GitHubActivity';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SiteMapModal from './components/SiteMapModal';
import FloatingDock from './components/FloatingDock';
import { playClickSound } from './utils/sound';

function App() {
  // Default to dark mode; respect stored choice if user toggled it
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('yj-theme');
    if (stored) return stored === 'dark';
    return true; // default: dark
  });

  const [sitemapOpen, setSitemapOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('yj-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Smooth circular wipe theme transition animation
  const handleToggleTheme = (e) => {
    playClickSound('toggle');
    const nextDark = !dark;

    // Check if View Transition API is supported and prefers-reduced-motion is false
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || isReducedMotion) {
      setDark(nextDark);
      return;
    }

    // Origin coordinates from click or default to bottom center dock position
    const x = e?.clientX ?? (window.innerWidth / 2);
    const y = e?.clientY ?? (window.innerHeight - 60);

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty('--theme-clip-x', `${x}px`);
    document.documentElement.style.setProperty('--theme-clip-y', `${y}px`);
    document.documentElement.style.setProperty('--theme-clip-radius', `${endRadius}px`);

    const transition = document.startViewTransition(() => {
      setDark(nextDark);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  // Handle #sitemap hash in URL and 'M' keyboard shortcut
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#sitemap') {
        setSitemapOpen(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);

    const handleKeyDown = (e) => {
      // If user presses 'M' and is not typing in an input
      if (
        (e.key === 'm' || e.key === 'M') &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName) &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        setSitemapOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Global click audio and ripple feedback
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const el = e.target.closest(
        'button, a, .btn, .project-link, .tag, .tech-chip, .contact__item, .hero-signature__avatar-disc, .impact-item, .sitemap-link-btn, .dock-item'
      );
      if (!el) return;

      // Audio feedback
      if (el.classList.contains('dock-item--theme') || el.classList.contains('theme-btn')) {
        playClickSound('toggle');
      } else if (el.classList.contains('hero-signature__avatar-disc')) {
        playClickSound('avatar');
      } else if (el.classList.contains('btn--primary') || el.classList.contains('project-link--primary')) {
        playClickSound('primary');
      } else {
        playClickSound('click');
      }

      // Visual click ripple on buttons and interactive elements
      if (el.matches('.btn, .project-link, .theme-btn, .navbar__link, .sitemap-link-btn, .dock-item, button')) {
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.5;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'click-ripple';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <>
      <main id="main-content">
        <Hero />
        <Impact />
        <Projects />
        <TechStack />
        <GitHubActivity />
        <Education />
        <Contact />
      </main>
      <Footer onOpenSitemap={() => setSitemapOpen(true)} />

      {/* Floating Bottom Navigation & Social Dock */}
      <FloatingDock
        dark={dark}
        onToggleTheme={handleToggleTheme}
        onOpenSitemap={() => setSitemapOpen(true)}
      />

      {/* Interactive Site Map Modal */}
      <SiteMapModal isOpen={sitemapOpen} onClose={() => setSitemapOpen(false)} />
    </>
  );
}

export default App;
