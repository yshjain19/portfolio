import { PERSONAL } from '../data/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <p className="footer__copy">
            © {year} Yash Jain · Built with React &amp; Vite
          </p>
          <div className="footer__links">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              id="footer-github"
              aria-label="Open GitHub profile in new tab"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
