import { CONTACT, PERSON } from '../lib/content';
import { Fade, RevealLines } from '../components/Reveal';
import { ArrowUpRight } from '../components/Icons';

/** Vast bij het renderen, zodat server en client hetzelfde jaartal tonen. */
const COPYRIGHT_YEAR = new Date().getFullYear();

export default function Contact() {
  const { colophon } = CONTACT;
  const scores = [
    { k: 'PERF', v: colophon.lighthouse.performance },
    { k: 'A11Y', v: colophon.lighthouse.accessibility },
    { k: 'BP', v: colophon.lighthouse.bestPractices },
    { k: 'SEO', v: colophon.lighthouse.seo },
  ];

  return (
    <footer
      className="contact shell"
      id="contact"
      data-topo="focus"
      aria-labelledby="contact-title"
      tabIndex={-1}
    >
      <div className="section__head mono">
        <span className="section__no">{CONTACT.index}</span>
        <h2 className="section__title" id="contact-title">
          {CONTACT.title}
        </h2>
      </div>

      <RevealLines className="display display--contact" lines={CONTACT.headline} />

      <div className="grid12">
        <Fade className="contact__lead" index={2}>
          <p className="body">{CONTACT.lead}</p>
        </Fade>
      </div>

      <Fade index={3}>
        <a
          className="contact__mail"
          href={`mailto:${PERSON.email}`}
          data-magnetic
          data-cursor-label={CONTACT.emailLabel}
        >
          {/* De laatste node van het systeem valt exact op deze stip. */}
          <span className="contact__node" data-topo-target="mail" aria-hidden="true" />
          <span>{PERSON.email}</span>
        </a>
      </Fade>

      <Fade as="nav" className="contact__links" index={4}>
        <span className="sr-only">Profielen elders</span>
        {CONTACT.links.map((link) => (
          <a
            key={link.label}
            className="contact__link mono"
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span>{link.label}</span>
            <span aria-hidden="true">/</span>
            <span>{link.handle}</span>
            <ArrowUpRight />
            <span className="sr-only">(opent in een nieuw tabblad)</span>
          </a>
        ))}
      </Fade>

      <Fade as="dl" className="colophon mono" index={5}>
        <div>
          <dt>LAATST BIJGEWERKT</dt>
          <dd>{colophon.updated}</dd>
        </div>
        <div>
          <dt>GEBOUWD MET</dt>
          <dd>{colophon.built}</dd>
        </div>
        <div>
          <dt>LETTERS</dt>
          <dd>{colophon.fonts}</dd>
        </div>
        <div>
          <dt>{colophon.lighthouseLabel}</dt>
          <dd className="colophon__scores">
            {scores.map((score) => (
              <span className="colophon__score" key={score.k}>
                {score.k} <b>{score.v}</b>
              </span>
            ))}
          </dd>
        </div>
      </Fade>

      <p className="colophon__legal mono">
        © {COPYRIGHT_YEAR} {PERSON.name} ·{' '}
        <a href="#/visibility-spoofer-privacy">Privacyverklaring</a>
      </p>
    </footer>
  );
}
