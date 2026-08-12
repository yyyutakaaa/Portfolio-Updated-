import { CERTS } from '../lib/content';
import { Fade } from '../components/Reveal';

/**
 * De tijdlijn zelf wordt door de topologielaag getekend: de nodes gaan op één
 * lijn staan. Hieronder staat dezelfde informatie als tekst — dat is wat een
 * screenreader leest en wat op smalle schermen de lijn vervangt.
 */
export default function Certs() {
  return (
    <section
      className="section shell"
      id="traject"
      data-topo="timeline"
      aria-labelledby="traject-title"
      tabIndex={-1}
    >
      <div className="section__head mono">
        <span className="section__no">{CERTS.index}</span>
        <h2 className="section__title" id="traject-title">
          {CERTS.title}
        </h2>
      </div>

      <Fade>
        <p className="lede">{CERTS.lead}</p>
      </Fade>

      {/* Ruimte waarin de vaste laag zijn tijdlijn legt. */}
      <div className="timeline" data-topo-target="timeline" aria-hidden="true">
        <div className="timeline__fallback">
          <svg viewBox="0 0 320 12" role="presentation" focusable="false" width="100%" height="12">
            {CERTS.items.map((cert, i) => {
              const x = 16 + (288 / (CERTS.items.length - 1)) * i;
              const prev = 16 + (288 / (CERTS.items.length - 1)) * (i - 1);
              return (
                <g key={cert.id}>
                  {i > 0 && (
                    <line
                      x1={prev}
                      y1={6}
                      x2={x}
                      y2={6}
                      stroke={cert.state === 'done' ? 'var(--accent)' : 'var(--dim)'}
                      strokeWidth={1}
                      strokeDasharray={cert.state === 'done' ? undefined : '3 4'}
                    />
                  )}
                  <circle
                    cx={x}
                    cy={6}
                    r={cert.state === 'done' ? 4 : 3}
                    fill={cert.state === 'done' ? 'var(--accent)' : 'transparent'}
                    stroke={cert.state === 'done' ? 'var(--accent)' : 'var(--dim)'}
                    strokeWidth={1}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <ol className="certs">
        {CERTS.items.map((cert, i) => (
          <Fade as="li" className="cert" key={cert.id} index={i}>
            <span className="cert__top mono" data-state={cert.state}>
              <span className="cert__marker" aria-hidden="true" />
              <span>{cert.year}</span>
              <span aria-hidden="true">·</span>
              <span className="cert__state">{cert.stateLabel}</span>
            </span>
            <p className="cert__code">{cert.code}</p>
            <p className="cert__name">
              {cert.name} — {cert.vendor}
            </p>
            <p className="cert__note">{cert.note}</p>
          </Fade>
        ))}
      </ol>

      <div className="education">
        {CERTS.education.map((item, i) => (
          <Fade key={item.school} className="edu" index={i}>
            <p className="mono mono--dim">
              {item.period} · {item.school}
            </p>
            <p className="edu__degree">{item.degree}</p>
            <p className="edu__note">{item.note}</p>
          </Fade>
        ))}
      </div>
    </section>
  );
}
