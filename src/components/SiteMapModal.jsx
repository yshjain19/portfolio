import { useEffect } from 'react';
import {
  Compass,
  X,
  ExternalLink,
  GitFork,
  FileCode,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  Terminal,
  Cpu,
  GraduationCap,
  Mail,
  Link,
} from 'lucide-react';
import { PERSONAL, PROJECTS, TECH_STACK, EDUCATION } from '../data/config';

export default function SiteMapModal({ isOpen, onClose }) {
  // Close on Escape key press & prevent background body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSectionJump = (hash) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div
      className="sitemap-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sitemap-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sitemap-modal">
        {/* Header */}
        <div className="sitemap-modal__header">
          <div className="sitemap-modal__header-left">
            <div className="sitemap-badge">
              <Compass size={16} className="sitemap-badge__icon" />
              <span>Interactive Site Map</span>
            </div>
            <h2 id="sitemap-title" className="sitemap-modal__title">
              Portfolio Directory &amp; Navigation Index
            </h2>
            <p className="sitemap-modal__sub">
              Complete architectural overview of pages, live production applications, technical skills, and crawler files.
            </p>
          </div>
          <button
            className="sitemap-close-btn"
            onClick={onClose}
            aria-label="Close Site Map"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Tree */}
        <div className="sitemap-modal__body">
          {/* Column 1: Core Page Sections */}
          <div className="sitemap-card">
            <div className="sitemap-card__header">
              <Layers size={17} className="sitemap-card__icon" />
              <h3>Page Sections</h3>
            </div>
            <p className="sitemap-card__desc">Direct on-page anchors and content sections.</p>
            <ul className="sitemap-list" role="list">
              <li>
                <button
                  type="button"
                  className="sitemap-link-btn"
                  onClick={() => handleSectionJump('#top')}
                >
                  <span className="sitemap-hash">#top</span>
                  <span className="sitemap-name">Hero &amp; Profile Overview</span>
                  <ArrowRight size={13} className="sitemap-arrow" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sitemap-link-btn"
                  onClick={() => handleSectionJump('#about')}
                >
                  <span className="sitemap-hash">#about</span>
                  <span className="sitemap-name">About Yash Jain</span>
                  <ArrowRight size={13} className="sitemap-arrow" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sitemap-link-btn"
                  onClick={() => handleSectionJump('#impact')}
                >
                  <span className="sitemap-hash">#impact</span>
                  <span className="sitemap-name">Impact &amp; Metrics (9.7K+ Downloads)</span>
                  <ArrowRight size={13} className="sitemap-arrow" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sitemap-link-btn"
                  onClick={() => handleSectionJump('#projects')}
                >
                  <span className="sitemap-hash">#projects</span>
                  <span className="sitemap-name">Featured Full-Stack Projects</span>
                  <ArrowRight size={13} className="sitemap-arrow" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sitemap-link-btn"
                  onClick={() => handleSectionJump('#skills')}
                >
                  <span className="sitemap-hash">#skills</span>
                  <span className="sitemap-name">Skills &amp; Technology Stack</span>
                  <ArrowRight size={13} className="sitemap-arrow" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sitemap-link-btn"
                  onClick={() => handleSectionJump('#github')}
                >
                  <span className="sitemap-hash">#github</span>
                  <span className="sitemap-name">Open Source &amp; GitHub Contributions</span>
                  <ArrowRight size={13} className="sitemap-arrow" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sitemap-link-btn"
                  onClick={() => handleSectionJump('#education')}
                >
                  <span className="sitemap-hash">#education</span>
                  <span className="sitemap-name">Education (B.Tech CSE '28)</span>
                  <ArrowRight size={13} className="sitemap-arrow" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sitemap-link-btn"
                  onClick={() => handleSectionJump('#contact')}
                >
                  <span className="sitemap-hash">#contact</span>
                  <span className="sitemap-name">Connect &amp; Social Links</span>
                  <ArrowRight size={13} className="sitemap-arrow" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Live Applications Directory */}
          <div className="sitemap-card">
            <div className="sitemap-card__header">
              <Sparkles size={17} className="sitemap-card__icon" />
              <h3>Live Applications</h3>
            </div>
            <p className="sitemap-card__desc">Production web systems deployed on Render.</p>
            <div className="sitemap-projects-grid">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="sitemap-proj-item">
                  <div className="sitemap-proj-item__top">
                    <span className="sitemap-proj-name">{proj.name}</span>
                    {proj.badge && <span className="sitemap-proj-badge">{proj.badge}</span>}
                  </div>
                  <p className="sitemap-proj-desc">{proj.description}</p>
                  <div className="sitemap-proj-links">
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sitemap-ext-link"
                    >
                      <ExternalLink size={12} />
                      Live Site
                    </a>
                    <a
                      href={proj.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sitemap-ext-link"
                    >
                      <GitFork size={12} />
                      Code
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Tech Stack & Architecture */}
          <div className="sitemap-card">
            <div className="sitemap-card__header">
              <Cpu size={17} className="sitemap-card__icon" />
              <h3>Technical Competencies</h3>
            </div>
            <p className="sitemap-card__desc">Core programming languages, frameworks &amp; databases.</p>
            <div className="sitemap-tech-groups">
              <div className="sitemap-tech-group">
                <span className="sitemap-tech-label">
                  <Terminal size={12} /> Languages
                </span>
                <div className="sitemap-tech-tags">
                  {TECH_STACK.languages.map((t) => (
                    <span key={t.name} className="sitemap-mini-tag">{t.name}</span>
                  ))}
                </div>
              </div>
              <div className="sitemap-tech-group">
                <span className="sitemap-tech-label">
                  <Layers size={12} /> Backend
                </span>
                <div className="sitemap-tech-tags">
                  {TECH_STACK.backend.map((t) => (
                    <span key={t.name} className="sitemap-mini-tag">{t.name}</span>
                  ))}
                </div>
              </div>
              <div className="sitemap-tech-group">
                <span className="sitemap-tech-label">
                  <Sparkles size={12} /> Frontend
                </span>
                <div className="sitemap-tech-tags">
                  {TECH_STACK.frontend.map((t) => (
                    <span key={t.name} className="sitemap-mini-tag">
                      {t.name}
                      {t.learning ? ' (learning)' : ''}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sitemap-tech-group">
                <span className="sitemap-tech-label">
                  <Database size={12} /> Databases
                </span>
                <div className="sitemap-tech-tags">
                  {TECH_STACK.database.map((t) => (
                    <span key={t.name} className="sitemap-mini-tag">{t.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Channels & Machine-Readable Meta Files */}
          <div className="sitemap-card">
            <div className="sitemap-card__header">
              <FileCode size={17} className="sitemap-card__icon" />
              <h3>SEO &amp; Verification Resources</h3>
            </div>
            <p className="sitemap-card__desc">Search engine crawler assets and verified profiles.</p>
            <ul className="sitemap-list" role="list">
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sitemap-file-link"
                >
                  <span className="sitemap-file-ext">XML</span>
                  <div className="sitemap-file-info">
                    <strong>/sitemap.xml</strong>
                    <small>Official Google/Bing XML Sitemap</small>
                  </div>
                  <ExternalLink size={13} className="sitemap-arrow" />
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sitemap-file-link"
                >
                  <span className="sitemap-file-ext">TXT</span>
                  <div className="sitemap-file-info">
                    <strong>/robots.txt</strong>
                    <small>Web crawler access rules</small>
                  </div>
                  <ExternalLink size={13} className="sitemap-arrow" />
                </a>
              </li>
              <li>
                <a
                  href="/site.webmanifest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sitemap-file-link"
                >
                  <span className="sitemap-file-ext">JSON</span>
                  <div className="sitemap-file-info">
                    <strong>/site.webmanifest</strong>
                    <small>Progressive Web App manifest</small>
                  </div>
                  <ExternalLink size={13} className="sitemap-arrow" />
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sitemap-file-link"
                >
                  <GitFork size={15} />
                  <div className="sitemap-file-info">
                    <strong>GitHub Profile</strong>
                    <small>@yshjain19</small>
                  </div>
                  <ExternalLink size={13} className="sitemap-arrow" />
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sitemap-file-link"
                >
                  <Link size={15} />
                  <div className="sitemap-file-info">
                    <strong>LinkedIn Profile</strong>
                    <small>yash-jain</small>
                  </div>
                  <ExternalLink size={13} className="sitemap-arrow" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="sitemap-file-link"
                >
                  <Mail size={15} />
                  <div className="sitemap-file-info">
                    <strong>Email Address</strong>
                    <small>{PERSONAL.email}</small>
                  </div>
                  <ArrowRight size={13} className="sitemap-arrow" />
                </a>
              </li>
              <li>
                <div className="sitemap-academic-note">
                  <GraduationCap size={14} />
                  <span>{EDUCATION.degree} — {EDUCATION.institution}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sitemap-modal__footer">
          <span className="sitemap-footer-note">
            Canonical URL: <code>https://yshjain19.github.io/</code> · Updated: 2026-10-13
          </span>
          <button className="btn btn--primary" onClick={onClose}>
            Close Site Map
          </button>
        </div>
      </div>
    </div>
  );
}
