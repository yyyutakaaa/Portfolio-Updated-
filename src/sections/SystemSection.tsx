import { useEffect, useState } from 'react';
import { SYSTEM } from '../lib/content';
import { Fade, RevealGroup } from '../components/Reveal';

interface Props {
  /** Meldt de gemarkeerde tak aan de topologielaag. */
  onHighlight: (group: string | null) => void;
}

export default function SystemSection({ onHighlight }: Props) {
  // Muis en toetsenbord worden apart bijgehouden. Focus wint van hover: anders
  // pikt een stilstaande muiscursor de markering af van wie tabt.
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const open = focused ?? hovered;

  useEffect(() => {
    onHighlight(open);
  }, [open, onHighlight]);

  const clear = (id: string, set: typeof setHovered) =>
    set((current) => (current === id ? null : current));

  return (
    <section
      className="section shell"
      id="systeem"
      data-topo="star"
      aria-labelledby="systeem-title"
      tabIndex={-1}
    >
      <div className="section__head mono">
        <span className="section__no">{SYSTEM.index}</span>
        <h2 className="section__title" id="systeem-title">
          {SYSTEM.title}
        </h2>
      </div>

      <div className="grid12 system__grid">
        <Fade className="system__intro">
          <div className="body">
            {SYSTEM.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <p className="system__note mono">{SYSTEM.note}</p>
        </Fade>

        <RevealGroup className="system__index" as="div">
          <p className="mono mono--dim" style={{ marginBottom: '0.9rem' }}>
            {SYSTEM.domainsLabel}
          </p>

          <ul data-active={open ? 'true' : 'false'} className="system__index-list">
            {SYSTEM.domains.map((domain, i) => {
              const isOpen = open === domain.id;
              return (
                <li
                  className="domain fade"
                  key={domain.id}
                  data-open={isOpen}
                  style={{ ['--i' as string]: i }}
                  onMouseEnter={() => setHovered(domain.id)}
                  onMouseLeave={() => clear(domain.id, setHovered)}
                >
                  <button
                    type="button"
                    className="domain__button"
                    aria-expanded={isOpen}
                    aria-controls={`domain-${domain.id}`}
                    /* Safari geeft een knop geen focus bij een klik; vandaar beide. */
                    onClick={() => setFocused(domain.id)}
                    onFocus={() => setFocused(domain.id)}
                    onBlur={() => clear(domain.id, setFocused)}
                  >
                    <span className="domain__no mono" aria-hidden="true">
                      {domain.no}
                    </span>
                    <span>
                      <span className="domain__name">{domain.name}</span>
                      <span className="domain__stack mono" style={{ display: 'block' }}>
                        {domain.stack}
                      </span>
                    </span>
                  </button>

                  <div className="domain__detail" id={`domain-${domain.id}`}>
                    <div>
                      <p>{domain.detail}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </RevealGroup>
      </div>
    </section>
  );
}
