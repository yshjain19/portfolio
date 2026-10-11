import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Impact from './components/Impact';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import GitHubActivity from './components/GitHubActivity';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { playClickSound } from './utils/sound';

function App() {
  // Default to dark mode; respect stored choice if user toggled it
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('yj-theme');
    if (stored) return stored === 'dark';
    return true; // default: dark
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('yj-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Interactive click animation + audio feedback on click
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const el = e.target.closest('button, a, .btn, .project-link, .tag, .tech-chip, .contact__item, .hero__avatar');
      if (!el) return;

      // Audio feedback
      if (el.classList.contains('btn--primary') || el.classList.contains('project-link--primary')) {
        playClickSound('primary');
      } else if (el.classList.contains('theme-btn')) {
        playClickSound('toggle');
      } else {
        playClickSound('click');
      }

      // Visual click ripple on buttons and interactive elements
      if (el.matches('.btn, .project-link, .theme-btn, .navbar__link, button')) {
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
      <Navbar dark={dark} onToggleDark={() => setDark((d) => !d)} />
      <main id="main-content">
        <Hero />
        <About />
        <Impact />
        <Projects />
        <TechStack />
        <GitHubActivity />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
