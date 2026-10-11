import { GraduationCap, MapPin } from 'lucide-react';
import { EDUCATION } from '../data/config';

export default function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-heading">
      <div className="container">
        <p className="section__label">Education</p>
        <h2 className="section__title" id="education-heading">Academic Background</h2>

        <div className="education__card" role="article">
          <GraduationCap className="education__icon" size={20} aria-hidden="true" />
          <div>
            <p className="education__degree">{EDUCATION.degree}</p>
            <p className="education__institution">{EDUCATION.institution}</p>
            <p className="education__location">
              <MapPin size={11} aria-hidden="true" />
              {EDUCATION.location}
            </p>
            {EDUCATION.year && (
              <p className="education__year">Expected {EDUCATION.year}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
