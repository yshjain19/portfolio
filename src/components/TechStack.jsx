import { TECH_STACK } from '../data/config';

const GROUPS = [
  { key: 'languages', label: 'Languages' },
  { key: 'backend', label: 'Backend' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'database', label: 'Database & Storage' },
  { key: 'tools', label: 'Developer Tools' },
];

export default function TechStack() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <p className="section__label">Skills</p>
        <h2 className="section__title" id="skills-heading">Technologies I work with</h2>

        <div className="techstack__grid">
          {GROUPS.map(({ key, label }) => (
            <div key={key}>
              <p className="techstack__group-label">{label}</p>
              <div className="techstack__chips" role="list" aria-label={`${label} technologies`}>
                {TECH_STACK[key].map((tech) => (
                  <span
                    key={tech.name}
                    className={`tech-chip${tech.learning ? ' tech-chip--learning' : ''}`}
                    role="listitem"
                    title={tech.learning ? `${tech.name} — currently learning` : tech.name}
                  >
                    {tech.name}
                    {tech.learning && (
                      <span className="tech-chip__badge">learning</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
