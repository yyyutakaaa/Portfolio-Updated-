import { useEffect, useState } from 'react';
import { HERO, PERSON } from '../lib/content';
import { Fade, RevealLines } from '../components/Reveal';
import { ArrowDown } from '../components/Icons';

/**
 * Echte lokale tijd — het enige stukje live data op de pagina.
 * Start op een streepje: de pagina is voorgerenderd, dus de tijd kan pas
 * kloppen zodra de browser hem zelf uitleest.
 */
function useLocalTime() {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const tick = () => setTime(format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

function format(date: Date) {
  return new Intl.DateTimeFormat('nl-BE', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: PERSON.timezone,
  }).format(date);
}

export default function Hero() {
  const time = useLocalTime();

  return (
    <section className="hero shell" id="top" data-topo="mesh" aria-labelledby="hero-title" tabIndex={-1}>
      <p className="hero__eyebrow mono">{HERO.eyebrow}</p>

      <RevealLines
        as="h1"
        id="hero-title"
        className="display display--hero"
        lines={HERO.headline}
      />

      <div className="hero__foot">
        <Fade className="hero__support" index={4}>
          <p>{HERO.support}</p>
        </Fade>

        <Fade className="hero__status" index={5}>
          <div className="statusblock">
            <div className="statusblock__head mono">
              <span>{HERO.status.label}</span>
              <span className="statusblock__live">
                <span aria-hidden="true">●</span>
                <span>
                  <span className="sr-only">Lokale tijd in {PERSON.locationShort}: </span>
                  {time} CET
                </span>
              </span>
            </div>

            <dl>
              {HERO.status.rows.map((row) => (
                <div className="statusblock__row mono" key={row.k}>
                  <dt className="statusblock__k">{row.k}</dt>
                  <dd className="statusblock__v">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Fade>
      </div>

      <Fade className="hero__hint mono" index={7}>
        <ArrowDown />
        <span>{HERO.scrollHint}</span>
      </Fade>
    </section>
  );
}
