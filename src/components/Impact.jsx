import { IMPACT_METRICS } from '../data/config';

export default function Impact() {
  return (
    <section className="impact-section" aria-label="Key Impact and Metrics">
      <div className="container">
        <div className="impact-grid" role="region" aria-label="Quantified achievements">
          {IMPACT_METRICS.map((item, idx) => (
            <div key={idx} className="impact-item">
              <div className="impact-value">{item.value}</div>
              <div className="impact-label">{item.label}</div>
              {item.tag && <div className="impact-tag">{item.tag}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
