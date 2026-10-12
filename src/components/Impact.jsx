import { IMPACT_METRICS } from '../data/config';
import { use3DTilt } from '../utils/use3DTilt';

function ImpactItem({ item }) {
  const cardRef = use3DTilt({ maxTilt: 12, perspective: 700, scale: 1.035, glare: true });

  return (
    <div ref={cardRef} className="impact-item impact-item--3d" role="article">
      <div className="impact-item__glare" aria-hidden="true" />
      <div className="impact-value">{item.value}</div>
      <div className="impact-label">{item.label}</div>
      {item.tag && <div className="impact-tag">{item.tag}</div>}
    </div>
  );
}

export default function Impact() {
  return (
    <section className="impact-section" id="impact" aria-label="Key Impact and Metrics">
      <div className="container">
        <div className="impact-grid" role="region" aria-label="Quantified achievements">
          {IMPACT_METRICS.map((item, idx) => (
            <ImpactItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
