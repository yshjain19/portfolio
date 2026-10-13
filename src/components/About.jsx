import { useState, useEffect } from 'react';

const BIRTH_DATE = new Date('2006-11-19T00:00:00Z').getTime();

export default function About() {
  const [age, setAge] = useState(() => {
    return ((Date.now() - BIRTH_DATE) / (1000 * 60 * 60 * 24 * 365.2425)).toFixed(9);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(((Date.now() - BIRTH_DATE) / (1000 * 60 * 60 * 24 * 365.2425)).toFixed(9));
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <p className="section__label">About</p>
        <h2 className="section__title" id="about-heading">A bit about me</h2>
        <div className="about__body">
          <p>
            I'm a <span className="hero-age-ticker">{age}</span> year old full stack developer from India. I enjoy programming, building products, and exploring technology.
          </p>
          <p>
            I build things with JavaScript, Node.js, Express.js, MongoDB, React, HTML, CSS, Bootstrap, and REST APIs, along with other tools and technologies. I also occasionally write <a href="#projects" className="hero-text-link">blogs</a>.
          </p>
          <p>
            I'm currently building full stack projects like <a href="https://svvv-notes.onrender.com/" target="_blank" rel="noopener noreferrer" className="hero-text-link">SVVV Notes</a> and <a href="https://prestigestay.onrender.com/" target="_blank" rel="noopener noreferrer" className="hero-text-link">PrestigeStay</a>, exploring AI and developer tooling, and improving my problem-solving skills through DSA. I like building things that are fast, accessible, and well crafted.
          </p>
        </div>
      </div>
    </section>
  );
}
