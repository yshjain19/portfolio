import { PROJECTS } from '../data/config';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <p className="section__label">Work</p>
        <h2 className="section__title" id="projects-heading">Featured Projects</h2>
        <div className="projects__grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
