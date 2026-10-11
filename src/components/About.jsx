import { PERSONAL } from '../data/config';

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <p className="section__label">About</p>
        <h2 className="section__title" id="about-heading">A bit about me</h2>
        <div className="about__body">
          {PERSONAL.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
