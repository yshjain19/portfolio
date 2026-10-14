import { Compass, GitFork, FileCode } from 'lucide-react';
import { PERSONAL } from '../data/config';

export default function Footer({ onOpenSitemap }) {
  const currentYear = 2026;

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <img
              src="/logo.png"
              alt="Yash Jain — Official Logo"
              className="footer__logo"
              width="22"
              height="22"
              loading="lazy"
            />
            <p className="footer__copy">
              © {currentYear} Yash Jain · Full-Stack Developer &amp; Backend Engineer
            </p>
          </div>
          <div className="footer__links">
            <button
              type="button"
              className="footer__link footer__link--btn"
              onClick={onOpenSitemap}
              id="footer-sitemap"
              aria-label="Open interactive visual site map"
            >
              <Compass size={13} aria-hidden="true" />
              Site Map
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              id="footer-xml-sitemap"
              title="Official Search Engine Sitemap"
              aria-label="Open XML sitemap for search engines in new tab"
            >
              <FileCode size={13} aria-hidden="true" />
              sitemap.xml
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              id="footer-github"
              aria-label="Open GitHub profile in new tab"
            >
              <GitFork size={13} aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
