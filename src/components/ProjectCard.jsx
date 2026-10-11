import { ExternalLink, GitFork } from 'lucide-react';

export default function ProjectCard({ project }) {
  const { name, description, tags, live, repo, thumbnail, thumbnailAlt } = project;

  return (
    <article
      className="project-card"
      aria-label={`Project: ${name}`}
    >
      {/* Thumbnail */}
      <a
        href={live}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card__thumbnail"
        aria-label={`Open ${name} live website in new tab`}
      >
        <div className="project-card__browser-bar" aria-hidden="true">
          <div className="browser-dots">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
          </div>
          <span className="browser-domain">
            {live ? live.replace(/^https?:\/\//, '').replace(/\/$/, '') : name.toLowerCase()}
          </span>
        </div>
        <div className="project-card__image-wrap">
          <img
            src={thumbnail}
            alt={thumbnailAlt}
            loading="lazy"
          />
        </div>
      </a>

      {/* Body */}
      <div className="project-card__body">
        <div className="project-card__header-row">
          <h3 className="project-card__name">{name}</h3>
          {project.badge && (
            <span className="project-card__badge" aria-label={`Status: ${project.badge}`}>
              {project.badge}
            </span>
          )}
        </div>
        <p className="project-card__desc">{description}</p>

        {/* Impact metrics if available */}
        {project.metrics && (
          <div className="project-card__metrics" role="region" aria-label="Project impact metrics">
            {project.metrics.map((m) => (
              <div key={m.label} className="project-metric">
                <span className="project-metric__value">{m.value}</span>
                <span className="project-metric__label">{m.label}</span>
                {m.sublabel && (
                  <span className="project-metric__sublabel">{m.sublabel}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="project-card__tags" aria-label="Technologies used">
          {tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="project-card__links">
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link project-link--primary"
            id={`proj-live-${name.toLowerCase().replace(/\s+/g, '-')}`}
            aria-label={`Open ${name} live website in new tab`}
          >
            <ExternalLink size={13} aria-hidden="true" />
            Live Website
          </a>
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            id={`proj-repo-${name.toLowerCase().replace(/\s+/g, '-')}`}
            aria-label={`Open ${name} source code on GitHub in new tab`}
          >
            <GitFork size={13} aria-hidden="true" />
            Source Code
          </a>
        </div>
      </div>
    </article>
  );
}
