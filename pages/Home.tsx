import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Panel from '../components/site/Panel';
import IndexRows from '../components/site/IndexRows';
import ContactPanel from '../components/site/ContactPanel';
import Clock from '../components/site/Clock';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollToId } from '../utils/scroll';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * One long page of framed screens, each numbered in its strip: the name, the
 * contents, a card per lab write-up, about, side projects and contact.
 */
const Home: React.FC = () => {
  const { c } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const items = c.projects.items;

  /* Arriving from another page through a section link in the contents. */
  React.useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const id = window.setTimeout(() => {
      scrollToId(target);
      navigate('.', { replace: true, state: null });
    }, 60);
    return () => window.clearTimeout(id);
  }, [location.state, navigate]);

  /* Hero and contents are 01 and 02; the project cards follow, then the rest. */
  const after = 3 + items.length;

  return (
    <>
      <Panel number="01" as="header" className="hero">
        <div className="panel__top">
          <p className="lbl">{c.hero.role}</p>
        </div>
        <h1 className="disp hero__name">
          Mehdi<span className="sr-only"> Oulad Khlie</span>
        </h1>
        <div className="hero__bottom">
          <p className="lbl">
            {c.hero.location}, <Clock />
          </p>
          <button type="button" className="lbl hero__scroll" onClick={() => scrollToId('index')}>
            {c.hero.scroll}
          </button>
        </div>
      </Panel>

      <Panel number="02" id="index" labelledBy="index-heading">
        <div className="panel__top">
          <h2 className="lbl" id="index-heading">
            {c.index.title}
          </h2>
        </div>
        <IndexRows />
      </Panel>

      <div className="teasers">
        {items.map((item, i) => (
            <Panel key={item.slug} number={pad(3 + i)} as="article" className="teaser">
              <div className="panel__top">
                <p className={`lbl ${item.featured ? 'lbl--accent' : ''}`}>
                  {c.projects.label(i + 1, items.length)}
                  {item.featured && ` · ${c.projects.featured}`}
                </p>
              </div>
              <p className="disp teaser__fig" aria-hidden="true">
                {item.figure}
              </p>
              <h2 className="teaser__title">
                <Link to={`/projects/${item.slug}`}>{item.title}</Link>
              </h2>
              <p className="teaser__txt">{item.result}</p>
              <span className="lbl lbl--paper teaser__cta" aria-hidden="true">
                {c.projects.read} &rarr;
              </span>
            </Panel>
        ))}
      </div>

      <Panel number={pad(after)} id="about" labelledBy="about-heading">
        <div className="panel__top">
          <h2 className="lbl" id="about-heading">
            {c.about.label}
          </h2>
        </div>
        <p className="disp about__text">{c.about.body}</p>
        <dl className="facts">
          {c.about.facts.map((fact) => (
            <div key={fact.key}>
              <dt className="lbl">{fact.key}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Panel>

      <Panel number={pad(after + 1)} id="work" labelledBy="work-heading">
        <div className="panel__top">
          <h2 className="lbl" id="work-heading">
            {c.work.label}
          </h2>
        </div>
        <p className="disp work__heading">{c.work.heading}</p>
        <ul className="work">
          {c.work.items.map((item) => (
            <li key={item.title} className="work__item">
              <div className="work__shot">
                <img
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes="(max-width: 719px) 92vw, 420px"
                  alt={item.image.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="work__text">
                <p className="lbl">{item.stack}</p>
                <h3 className="work__title">{item.title}</h3>
                <p className="work__desc">{item.description}</p>
                <div className="work__links">
                  {item.external ? (
                    <a className="lbl lbl--paper" href={item.href} target="_blank" rel="noopener noreferrer">
                      {c.work.code} <span aria-hidden="true">&#8599;</span>
                    </a>
                  ) : (
                    <Link className="lbl lbl--paper" to={item.href}>
                      {c.work.read} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                  {item.secondary && (
                    <a className="lbl" href={item.secondary.href} target="_blank" rel="noopener noreferrer">
                      {item.secondary.label} <span aria-hidden="true">&#8599;</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <ContactPanel number={pad(after + 2)} />
    </>
  );
};

export default Home;
