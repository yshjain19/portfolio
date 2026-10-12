import { GitFork, Link, ArrowRight } from 'lucide-react';
import { PERSONAL } from '../data/config';

const CONTACT_ITEMS = [
  {
    id: 'contact-github',
    icon: GitFork,
    label: 'GitHub',
    value: 'github.com/yshjain19',
    href: PERSONAL.github,
    isPlaceholder: false,
  },
  {
    id: 'contact-linkedin',
    icon: Link,
    label: 'LinkedIn',
    value: 'linkedin.com/in/yash-jain-6b6647320',
    href: PERSONAL.linkedin,
    isPlaceholder: false,
  },
];

export default function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <h2 className="contact__heading" id="contact-heading">Let's connect.</h2>
        <p className="contact__desc">
          I'm always interested in learning, building useful projects, and connecting
          with people who enjoy technology.
        </p>

        <div className="contact__links" role="list">
          {CONTACT_ITEMS.map(({ id, icon: Icon, label, value, href, isPlaceholder, note }) => (
            <a
              key={id}
              id={id}
              href={isPlaceholder ? undefined : href}
              target={isPlaceholder ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="contact__item"
              aria-label={
                isPlaceholder
                  ? `${label} — placeholder, update in config`
                  : `Open ${label} in new tab`
              }
              role="listitem"
              style={{ cursor: isPlaceholder ? 'default' : 'pointer' }}
              onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
            >
              <Icon className="contact__item-icon" size={16} aria-hidden="true" />
              <span className="contact__item-label">{label}</span>
              {isPlaceholder ? (
                <span className="contact__placeholder">{note}</span>
              ) : (
                <>
                  <span className="contact__item-value">{value}</span>
                  <ArrowRight
                    size={13}
                    aria-hidden="true"
                    style={{ color: 'var(--text-tertiary)' }}
                  />
                </>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
