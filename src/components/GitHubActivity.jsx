import { GitFork, ArrowRight } from 'lucide-react';
import { PERSONAL } from '../data/config';

export default function GitHubActivity() {
  const username = 'yshjain19';
  const graphUrl = `https://ghchart.rshah.org/${username}`;

  return (
    <section className="section" id="github" aria-labelledby="github-heading">
      <div className="container">
        <p className="section__label">Open Source</p>
        <h2 className="section__title" id="github-heading">GitHub Activity</h2>

        <a
          href={PERSONAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="github__card"
          id="github-profile-link"
          aria-label="Open GitHub profile in new tab"
        >
          <GitFork className="github__icon" size={20} aria-hidden="true" />
          <div className="github__info">
            <p className="github__handle">github.com/{username}</p>
            <p className="github__sub">View repositories and contributions</p>
          </div>
          <ArrowRight className="github__arrow" size={16} aria-hidden="true" />
        </a>

        <div className="github__graph" aria-label="GitHub contribution graph">
          <img
            src={graphUrl}
            alt={`GitHub contribution graph for ${username}`}
            loading="lazy"
            onError={(e) => {
              e.target.closest('.github__graph').style.display = 'none';
            }}
          />
        </div>
      </div>
    </section>
  );
}
