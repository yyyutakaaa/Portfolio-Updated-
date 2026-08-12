import { PERSON } from '../lib/content';
import { ArrowLeft } from '../components/Icons';

/**
 * De privacyverklaring houdt haar bestaande URL (#/visibility-spoofer-privacy),
 * omdat daar extern naar verwezen wordt. De tekst is bijgewerkt naar wat de
 * site nu werkelijk doet: geen formulier, geen analytics, geen externe fonts.
 */

const SECTIONS = [
  {
    heading: 'Wie beheert deze website',
    paragraphs: [
      `Deze website is de persoonlijke portfolio van ${PERSON.name}. Ze toont projecten, opleiding, certificeringen en contactgegevens.`,
      'Vragen over deze verklaring kun je stellen via het e-mailadres onderaan deze pagina.',
    ],
  },
  {
    heading: 'Welke gegevens de site verwerkt',
    paragraphs: [
      'De site bevat geen contactformulier, geen accounts en geen registratie. Er worden geen gegevens verzameld die je zelf invult.',
      'Contact verloopt via een gewone mailtoepassing: je klikt op het adres en je eigen mailprogramma opent. Wat je daarin schrijft, gaat rechtstreeks van jouw mailprovider naar mijn mailbox — deze website ziet dat bericht niet.',
    ],
  },
  {
    heading: 'Cookies, analytics en trackers',
    paragraphs: [
      'De site plaatst geen cookies, gebruikt geen local storage voor persoonsgegevens en heeft geen analytics-provider, advertentienetwerk of trackingpixel.',
      'De lettertypen worden vanaf dezelfde server geleverd als de site zelf. Er wordt dus niets opgehaald bij Google Fonts of een ander extern lettertypenetwerk.',
    ],
  },
  {
    heading: 'Serverlogs bij de hostingpartij',
    paragraphs: [
      'Zoals bij elke website houdt de hostingpartij technische logs bij om de site te kunnen leveren en misbruik tegen te gaan. Daarin kunnen je IP-adres, het tijdstip van je bezoek en je browsertype voorkomen.',
      'Die logs beheer ik niet zelf en gebruik ik niet om bezoekers te volgen of profielen op te bouwen.',
    ],
  },
  {
    heading: 'Externe links',
    paragraphs: [
      'Deze site linkt naar LinkedIn en GitHub. Open je zo’n link, dan geldt vanaf dat moment het privacybeleid van die dienst.',
      'Er staan geen embeds van externe diensten op deze pagina’s: geen YouTube-video’s, geen kaarten, geen social widgets. Externe partijen zien je dus pas nadat je zelf op een link klikt.',
    ],
  },
  {
    heading: 'Jouw rechten',
    paragraphs: [
      'Omdat de site zelf geen persoonsgegevens verzamelt, is er in de regel niets van jou dat ik kan inzien, corrigeren of verwijderen.',
      'Heb je me gemaild, dan kun je altijd vragen om die correspondentie te laten verwijderen. Ik houd niets langer bij dan nodig is om je vraag af te handelen.',
    ],
  },
  {
    heading: 'Wijzigingen',
    paragraphs: [
      'Verandert de site — bijvoorbeeld door een formulier of analytics toe te voegen — dan wordt deze verklaring bijgewerkt voordat die verandering live gaat.',
      'De datum bovenaan deze pagina geeft aan wanneer de tekst voor het laatst is aangepast.',
    ],
  },
];

export default function Privacy() {
  return (
    <main className="legal shell" id="main">
      <div className="grid12">
        <div className="legal__col">
          <a className="back-link mono" href="#top" onClick={() => window.scrollTo(0, 0)}>
            <ArrowLeft />
            <span>Terug naar de portfolio</span>
          </a>

          <p className="mono mono--accent">PRIVACYVERKLARING</p>
          <h1 className="display display--section" style={{ marginTop: '0.75rem' }}>
            Wat deze site
            <br />
            met je gegevens doet.
          </h1>
          <p className="mono mono--dim" style={{ marginTop: '1.25rem' }}>
            LAATST BIJGEWERKT: 12.08.2026
          </p>

          <p className="body" style={{ marginTop: '2rem' }}>
            Kort antwoord: bijna niets. Deze pagina legt uit wat er wél gebeurt wanneer je deze
            site bezoekt, en waar de grens ligt met diensten van anderen.
          </p>

          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p className="body" key={paragraph.slice(0, 28)}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section>
            <h2>Contact</h2>
            <p className="body">Vragen over deze verklaring? Stuur gerust een mail.</p>
            <p style={{ marginTop: '1rem' }}>
              <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
